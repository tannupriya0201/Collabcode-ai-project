const Test = require("../models/Test");
const ExamAttempt = require("../models/ExamAttempt");
const { auditService } = require("../services");

/* =========================
   START EXAM (STUDENT)
========================= */
exports.startExam = async (req, res) => {
  try {
    const { testId } = req.params;

    const existingAttempt = await ExamAttempt.findOne({
      student: req.user.id,
      test: testId,
    });

    if (existingAttempt) {
      return res.status(400).json({
        message: "You have already started this test",
      });
    }

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const attempt = await ExamAttempt.create({
      student: req.user.id,
      test: testId,
    });

    // ✅ AUDIT LOG — START EXAM
    await auditService.createAuditLog({
      action: "START_EXAM",
      performedBy: req.user.id,
      targetResource: testId,
      req,
    });

    res.json({
      message: "Exam started",
      attemptId: attempt._id,
      test: {
        id: test._id,
        title: test.title,
        questions: test.questions.map((q) => ({
          question: q.question,
          options: q.options,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   SUBMIT EXAM (STUDENT)
========================= */
exports.submitExam = async (req, res) => {
  try {
    const { testId } = req.params;
    const { answers } = req.body;

    const attempt = await ExamAttempt.findOne({
      student: req.user.id,
      test: testId,
      isSubmitted: false,
    });

    if (!attempt) {
      return res.status(400).json({
        message: "No active exam found",
      });
    }

    const test = await Test.findById(testId);
    let score = 0;

    answers.forEach((ans) => {
      const correct =
        test.questions[ans.questionIndex].correctAnswer;
      if (correct === ans.selectedOption) {
        score++;
      }
    });

    attempt.answers = answers;
    attempt.score = score;
    attempt.isSubmitted = true;
    attempt.submittedAt = new Date();

    await attempt.save();

    // ✅ AUDIT LOG — SUBMIT EXAM
    await auditService.createAuditLog({
      action: "SUBMIT_EXAM",
      performedBy: req.user.id,
      targetResource: testId,
      metadata: {
        score,
        totalQuestions: test.questions.length,
      },
      req,
    });

    res.json({
      message: "Exam submitted successfully",
      score,
      totalQuestions: test.questions.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   VIEW RESULT (STUDENT)
========================= */
exports.getMyResult = async (req, res) => {
  try {
    const { testId } = req.params;

    const attempt = await ExamAttempt.findOne({
      student: req.user.id,
      test: testId,
      isSubmitted: true,
    }).populate("test", "title");

    if (!attempt) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    res.json({
      test: attempt.test.title,
      score: attempt.score,
      submittedAt: attempt.submittedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
