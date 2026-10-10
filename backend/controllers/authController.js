const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { authService } = require("../services");

/* =========================
   REGISTER
========================= */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const { user, emailToken } =
      await authService.registerUser({
        name,
        email,
        password,
        role,
      });

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

    await sendEmail({
      to: email,
      subject: "Verify your email - CollabCode AI",
      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify your email:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>Valid for 24 hours</p>
      `,
    });

    res.status(201).json({
      message: "Registration successful. Please verify your email.",
    });
  } catch (err) {
    if (err.message === "USER_EXISTS") {
      return res.status(400).json({
        message: "User already exists",
      });
    }


    res.status(500).json({ message: err.message });
  }
};

/* =========================
   LOGIN
========================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser({
      email,
      password,
    });

    if (!result) {
      return res.status(401).json({
        message: "Invalid credentials",

      });
    }


    const { user, accessToken } = result;

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    if (err.message === "ACCOUNT_BLOCKED") {
      return res.status(403).json({
        message: "Your account has been blocked by admin",
      });
    }

    if (err.message === "EMAIL_NOT_VERIFIED") {
      return res.status(403).json({
        message: "Please verify your email before login",
      });
    }

    res.status(500).json({ message: err.message });
  }
};

/* =========================
   RESEND EMAIL VERIFICATION
========================= */
exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const User = require("../models/User");
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.json({ message: "Email already verified" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.emailVerifyToken = token;
    user.emailVerifyTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

    await sendEmail({
      to: email,
      subject: "Resend email verification - CollabCode AI",
      html: `
        <h2>Email Verification</h2>
        <a href="${verifyUrl}">${verifyUrl}</a>
      `,
    });

    res.json({ message: "Verification email sent again" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   FORGOT PASSWORD
========================= */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const User = require("../models/User");

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail({
      to: email,
      subject: "Reset Password - CollabCode AI",
      html: `
        <h2>Reset Password</h2>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    });

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   RESET PASSWORD
========================= */
exports.resetPassword = async (req, res) => {
  try {
    const User = require("../models/User");

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    user.password = await require("bcryptjs").hash(
      req.body.password,
      10
    );
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
