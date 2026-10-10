const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const MESSAGES = require("../constants/messages");
const {
  validateRegister,
  validateLogin,
} = require("../validators");

// ✅ SERVICES
const { authService, auditService } = require("../services");

const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

/* =========================
   VERIFY EMAIL API
========================= */
router.get("/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;

    if (!token || token.length < 20) {
      return res.status(400).json({
        message: MESSAGES.AUTH.TOKEN_INVALID,
      });
    }

    const user = await User.findOne({
      emailVerifyToken: token,
      emailVerifyTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: MESSAGES.AUTH.TOKEN_INVALID,
      });
    }

    user.isEmailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyTokenExpires = undefined;

    await user.save();

    res.json({
      message: MESSAGES.AUTH.EMAIL_VERIFIED,
    });
  } catch (error) {
    res.status(500).json({
      message: MESSAGES.GENERAL.SERVER_ERROR,
    });
  }
});

/* =========================
   🔁 RESEND VERIFICATION EMAIL
========================= */
router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res
        .status(400)
        .json({ message: "Email already verified" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.emailVerifyToken = token;
    user.emailVerifyTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    // ✅ CORRECT LINK (BACKEND)
    const verifyLink = `${process.env.BACKEND_URL}/api/auth/verify-email/${token}`;

    await sendEmail(
      user.email,
      "Verify your email",
      `
        <h3>Email Verification</h3>
        <p>Click below to verify your email:</p>
        <a href="${verifyLink}">${verifyLink}</a>
      `
    );

    res.json({ message: "Verification email resent" });
  } catch (err) {
    res.status(500).json({
      message: MESSAGES.GENERAL.SERVER_ERROR,
    });
  }
});

/* =========================
   REGISTER
========================= */
router.post("/register", validateRegister, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const { user, emailToken } =
      await authService.registerUser({
        name,
        email,
        password,
        role,
      });

    console.log(
      "VERIFY EMAIL:",
      `http://localhost:5000/api/auth/verify-email/${emailToken}`
    );

    res.status(201).json({
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level,
      },
    });
  } catch (err) {
    if (err.message === "USER_EXISTS") {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    res.status(500).json({
      message: MESSAGES.GENERAL.SERVER_ERROR,
    });
  }
});

/* =========================
   LOGIN
========================= */
router.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser({
      email,
      password,
    });

    if (!result) {
      return res.status(400).json({
        message: MESSAGES.AUTH.INVALID_CREDENTIALS,
      });
    }

    const { user, accessToken, refreshToken } = result;

    await auditService.createAuditLog({
      action: "LOGIN",
      performedBy: user._id,
      req,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level,
      },
    });
  } catch (err) {
    if (err.message === "ACCOUNT_BLOCKED") {
      return res.status(403).json({
        message: MESSAGES.AUTH.ACCOUNT_BLOCKED,
      });
    }

    if (err.message === "EMAIL_NOT_VERIFIED") {
      return res.status(403).json({
        message: MESSAGES.AUTH.EMAIL_NOT_VERIFIED,
      });
    }

    res.status(500).json({
      message: MESSAGES.GENERAL.SERVER_ERROR,
    });
  }
});

/* =========================
   REFRESH TOKEN
========================= */
router.post("/refresh-token", async (req, res) => {
  const token = await authService.refreshAccessToken(
    req.cookies.refreshToken
  );

  if (!token) return res.sendStatus(403);

  res.json({ accessToken: token });
});

/* =========================
   LOGOUT
========================= */
router.post("/logout", authMiddleware, async (req, res) => {
  await authService.logoutUser(req.cookies.refreshToken);

  await auditService.createAuditLog({
    action: "LOGOUT",
    performedBy: req.user.id,
    req,
  });

  res.clearCookie("refreshToken");

  res.json({
    message: MESSAGES.AUTH.LOGOUT_SUCCESS,
  });
});

module.exports = router;
