const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// ✅ VALIDATOR
const { validateTestCreate } = require("../validators");

// ✅ CONTROLLER
const {
  createTest,
  deleteTest,
  getAllTests,
  getMyTests,
  getTestById,
  updateTest,
} = require("../controllers/testController");

/* =========================
   CREATE TEST
   (ADMIN + MENTOR)
========================= */
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin", "mentor"),
  validateTestCreate,
  createTest
);

/* =========================
   GET MY TESTS (MENTOR)
========================= */
router.get(
  "/my-tests",
  authMiddleware,
  roleMiddleware("mentor"),
  getMyTests
);

/* =========================
   GET ALL TESTS (ADMIN)
========================= */
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("admin"),
  getAllTests
);

/* =========================
   GET TEST BY ID
========================= */
router.get(
  "/:id",
  authMiddleware,
  getTestById
);

/* =========================
   UPDATE TEST
========================= */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "mentor"),
  updateTest
);

/* =========================
   DELETE TEST
========================= */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "mentor"),
  deleteTest
);

module.exports = router;
