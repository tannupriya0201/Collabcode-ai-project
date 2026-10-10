const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // 🔐 IMPORTANT
    },

    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      default: "student",
    },

    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },

    isActive: { type: Boolean, default: true },

    refreshToken: { type: String, default: null },

    lastLoginAt: { type: Date, default: Date.now },

    isBlocked: { type: Boolean, default: false },

    // 📧 EMAIL VERIFICATION
    isEmailVerified: { type: Boolean, default: false },
    emailVerifyToken: String,
    emailVerifyTokenExpires: Date,

    // 🔑 RESET PASSWORD
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
