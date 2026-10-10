const LearningProgress = require("../models/LearningProgress");
const User = require("../models/User");
const logAudit = require("../utils/auditLogger");

/* =========================
   INTERNAL GAME HELPERS
========================= */
const XP_PER_TOPIC = 20;
const LEVEL_XP = 100;

function calculateLevel(xp) {
  return Math.floor(xp / LEVEL_XP) + 1;
}

/* =========================
   COMPLETE TOPIC (CORE GAME LOOP)
========================= */
exports.completeTopic = async (req, res) => {
  const userId = req.user._id;
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ message: "Topic is required" });
  }

  let progress = await LearningProgress.findOne({ user: userId, topic });

  if (!progress) {
    progress = await LearningProgress.create({
      user: userId,
      topic,
      completed: true,
      completionTime: Date.now(),
    });
  } else if (!progress.completed) {
    progress.completed = true;
    await progress.save();
  }

  const user = await User.findById(userId);
  user.xp += XP_PER_TOPIC;
  user.level = calculateLevel(user.xp);
  await user.save();

  // ✅ AUDIT FIRST
  await logAudit({
    action: "TOPIC_COMPLETED",
    performedBy: userId,
    targetUser: userId,
    metadata: { topic },
  });

  // ✅ THEN RESPONSE
  res.json({
    message: "Topic completed",
    xp: user.xp,
    level: user.level,
  });
};

/* =========================
   GET LEARNING PROGRESS
========================= */
exports.getLearningProgress = async (req, res) => {
  const data = await LearningProgress.find({ user: req.user._id });
  res.json(data);
};

/* =========================
   RESET LEARNING PROGRESS
========================= */
exports.resetLearningProgress = async (req, res) => {
  await LearningProgress.deleteMany({ user: req.user._id });
  res.json({ message: "Learning progress reset" });
};

/* =========================
   LEVEL & XP
========================= */
exports.getUserLevelXP = async (req, res) => {
  const user = await User.findById(req.user._id).select("level xp");
  res.json(user);
};

exports.resetUserLevelXP = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { xp: 0, level: 1 });
  res.json({ message: "Level & XP reset" });
};

/* =========================
   LEADERBOARD & RANK
========================= */
exports.getLeaderboard = async (req, res) => {
  const users = await User.find()
    .sort({ xp: -1 })
    .limit(10)
    .select("username level xp");
  res.json(users);
};

exports.getUserRank = async (req, res) => {
  const user = await User.findById(req.user._id);
  const rank =
    (await User.countDocuments({ xp: { $gt: user.xp } })) + 1;
  res.json({ rank });
};

/* =========================
   ANALYTICS / STATS
========================= */
exports.getProgressSummary = async (req, res) => {
  const completed = await LearningProgress.countDocuments({
    user: req.user._id,
    completed: true,
  });

  res.json({
    completedTopics: completed,
    xp: req.user.xp,
    level: req.user.level,
  });
};

exports.getUserProgressOverTime = async (req, res) => {
  const data = await LearningProgress.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        completed: { $sum: { $cond: ["$completed", 1, 0] } },
      },
    },
  ]);
  res.json(data);
};

/* =========================
   HISTORY
========================= */
exports.getUserProgressHistory = async (req, res) => {
  const history = await LearningProgress.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(history);
};

exports.clearUserProgressHistory = async (req, res) => {
  await LearningProgress.deleteMany({ user: req.user._id });
  res.json({ message: "History cleared" });
};

/* =========================
   GAMIFICATION EXTRAS (MOCK, AI-DRIVEN)
========================= */
exports.getUserProgressAchievements = async (req, res) => {
  res.json([{ title: "First Win", unlocked: true }]);
};

exports.getTopicProgressBadges = async (req, res) => {
  res.json([{ badge: "Consistency Star" }]);
};

exports.getUserProgressGoals = async (req, res) => {
  res.json({ daily: 1, weekly: 5, monthly: 20 });
};

exports.updateUserProgressGoals = async (req, res) => {
  res.json({ message: "Goals updated" });
};
