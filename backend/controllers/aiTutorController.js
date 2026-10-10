const LearningProgress = require("../models/LearningProgress");

/* =========================
   ASK AI TUTOR (BRAIN)
========================= */
exports.askTutor = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question required" });
  }

  res.json({
    answer: "Break problem into steps and optimize logic.",
  });
};

/* =========================
   AI → LEARNING BRIDGE
========================= */
exports.aiSuggestNextMove = async (req, res) => {
  const completed = await LearningProgress.countDocuments({
    user: req.user._id,
    completed: true,
  });

  let suggestion = "Start Basics";
  if (completed > 5) suggestion = "Try Advanced DSA";
  if (completed > 10) suggestion = "System Design";

  res.json({
    nextTopic: suggestion,
    motivation: "You're leveling up fast 🚀",
    difficulty: completed < 5 ? "easy" : "medium",
  });
};
