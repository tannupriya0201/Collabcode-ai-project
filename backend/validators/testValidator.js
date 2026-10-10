const validateTestCreate = (req, res, next) => {
  const { title, questions } = req.body;

  // 🔴 Title required
  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Test title is required",
    });
  }

  // 🔴 Questions must exist
  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({
      message: "At least one question is required",
    });
  }

  // 🔴 Each question validation
  for (const q of questions) {
    if (
      !q.question ||
      typeof q.question !== "string" ||
      !Array.isArray(q.options) ||
      q.options.length < 2
    ) {
      return res.status(400).json({
        message:
          "Each question must have text and at least 2 options",
      });
    }
  }

  next();
};

module.exports = {
  validateTestCreate,
};
