const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// =======================
// MENTOR DASHBOARD
// =======================
router.get(
  "/mentor-data",
  authMiddleware,
  roleMiddleware("mentor"),
  (req, res) => {
    res.json({
      message: "Mentor dashboard API working",
      user: req.user,
    });
  }
);

// =======================
// MENTOR: FORCE LOGOUT (STUDENT ONLY)
// =======================
router.post(
  "/users/:id/force-logout",
  authMiddleware,
  roleMiddleware("mentor"),
  async (req, res) => {
    try {
      const targetUser = await User.findById(req.params.id);

      if (!targetUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // 🔐 Mentor rule: ONLY student
      if (targetUser.role !== "student") {
        return res.status(403).json({
          message: "Mentor can logout only students",
        });
      }

      targetUser.refreshToken = null;
      await targetUser.save();

      res.json({
        message: "Student force logged out by mentor",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
