const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

/* =========================
   STUDENT DASHBOARD DATA
========================= */
router.get(
  "/student-data",
  authMiddleware,
  roleMiddleware("student"),
  (req, res) => {
    res.json({
      message: "Student dashboard API working",
      user: req.user,
    });
  }
);

/* =========================
   STUDENT LEARNING (DUMMY API)
   👉 SAFE / PLANNED
========================= */
router.get(
  "/learning",
  authMiddleware,
  roleMiddleware("student"),
  (req, res) => {
    res.json({
      joinedRooms: ["room101", "room202"],
      xp: 120,
      level: 2,
    });
  }
);

module.exports = router;
