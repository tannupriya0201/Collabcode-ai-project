const Test = require("../models/Test");
const { auditService } = require("../services");

/* =========================
   CREATE TEST (MENTOR / ADMIN)
========================= */
exports.createTest = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const test = await Test.create({
      title,
      description,
      questions,
      createdBy: req.user.id,
      createdByRole: req.user.role, // ✅ added (safe)
    });

    // ✅ AUDIT LOG
    await auditService.createAuditLog({
      action: "CREATE_TEST",
      performedBy: req.user.id,
      targetResource: test._id,
      req,
    });

    res.status(201).json({
      message: "Test created successfully",
      test,
    });
  } catch (error) {
    console.error("Create test error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET TESTS BY MENTOR
========================= */
exports.getMyTests = async (req, res) => {
  try {
    const tests = await Test.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL TESTS (ADMIN)
========================= */
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email role");

    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET TEST BY ID
========================= */
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.json(test);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE TEST (MENTOR / ADMIN)
========================= */
exports.updateTest = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // 🔐 Ownership check (mentor only)
    if (
      req.user.role === "mentor" &&
      test.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not allowed to update this test",
      });
    }

    test.title = title || test.title;
    test.description = description || test.description;
    test.questions = questions || test.questions;

    await test.save();

    res.json({
      message: "Test updated successfully",
      test,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE TEST (MENTOR / ADMIN)
========================= */
exports.deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // 🔐 Ownership check
    if (
      req.user.role === "mentor" &&
      test.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete this test",
      });
    }

    await Test.findByIdAndDelete(req.params.id);

    // ✅ AUDIT LOG
    await auditService.createAuditLog({
      action: "DELETE_TEST",
      performedBy: req.user.id,
      targetResource: test._id,
      req,
    });

    res.json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
