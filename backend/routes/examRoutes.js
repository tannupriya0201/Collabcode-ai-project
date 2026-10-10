const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  startExam,
  submitExam,
  getMyResult,
} = require("../controllers/examController");

/* =========================
   START EXAM (STUDENT)
========================= */
router.post(
  "/start/:testId",
  authMiddleware,
  roleMiddleware("student"),
  startExam
);

/* =========================
   SUBMIT EXAM
========================= */
router.post(
  "/submit/:testId",
  authMiddleware,
  roleMiddleware("student"),
  submitExam
);

/* =========================
   VIEW RESULT
========================= */
router.get(
  "/result/:testId",
  authMiddleware,
  roleMiddleware("student"),
  getMyResult
);

module.exports = router;
