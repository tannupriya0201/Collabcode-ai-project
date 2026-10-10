const mongoose = require("mongoose");

const learningProgressSchema = new mongoose.Schema(
  {
    /* =========================
       CORE FIELDS
    ========================= */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    topic: {
      type: String,
      required: true,
      index: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    /* =========================
       TIME & ANALYTICS
    ========================= */
    completionTime: {
      type: Number, // minutes
      default: null,
    },

    progressRate: {
      type: Number, // 0 → 1
      default: 0,
    },

    /* =========================
       FEEDBACK & CHALLENGES
    ========================= */
    feedback: {
      type: String,
      default: null,
    },

    challengeSolution: {
      type: String,
      default: null,
    },

    /* =========================
       BADGES & ACHIEVEMENTS
    ========================= */
    badges: [
      {
        name: String,
        awardedAt: Date,
      },
    ],

    achievements: [
      {
        title: String,
        unlockedAt: Date,
      },
    ],

    /* =========================
       GOALS & RECOMMENDATIONS
    ========================= */
    goals: {
      daily: { type: Number, default: 1 },
      weekly: { type: Number, default: 5 },
      monthly: { type: Number, default: 20 },
    },

    recommendations: [String],

    /* =========================
       NOTIFICATIONS
    ========================= */
    notifications: [
      {
        message: String,
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    /* =========================
       FLEXIBLE METADATA
    ========================= */
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true, // createdAt & updatedAt (USED in trends, over-time)
  }
);

/* =========================
   INDEXES
========================= */

// prevent duplicate topic per user
learningProgressSchema.index({ user: 1, topic: 1 }, { unique: true });

// fast analytics
learningProgressSchema.index({ topic: 1, completed: 1 });
learningProgressSchema.index({ createdAt: 1 });

module.exports = mongoose.model("LearningProgress", learningProgressSchema);
