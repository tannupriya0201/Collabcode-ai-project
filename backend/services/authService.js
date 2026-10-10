const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token");

/* =========================
   REGISTER SERVICE
========================= */
const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("USER_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const emailToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "student",
    isEmailVerified: false,
    emailVerifyToken: emailToken,
    emailVerifyTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
  });

  return { user, emailToken };
};

/* =========================
   LOGIN SERVICE
========================= */
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) return null;

  if (user.isBlocked) throw new Error("ACCOUNT_BLOCKED");
  if (!user.isEmailVerified) throw new Error("EMAIL_NOT_VERIFIED");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  user.lastLoginAt = new Date();
  await user.save();

  return { user, accessToken, refreshToken };
};

/* =========================
   REFRESH TOKEN
========================= */
const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) return null;

  const user = await User.findOne({ refreshToken });
  if (!user) return null;

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const MAX_DAYS = 7;
  const MAX_TIME = MAX_DAYS * 24 * 60 * 60 * 1000;

  if (Date.now() - new Date(user.lastLoginAt).getTime() > MAX_TIME) {
    return null;
  }

  return generateAccessToken(user);
};

/* =========================
   LOGOUT
========================= */
const logoutUser = async (refreshToken) => {
  if (!refreshToken) return;
  await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: null }
  );
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
