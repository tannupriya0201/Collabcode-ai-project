const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const MESSAGES = require("../constants/messages");

const { validateProfileUpdate } = require("../validators");

// ✅ SERVICE LAYER
const { userService } = require("../services");

/* =========================
   GET OWN PROFILE
========================= */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: MESSAGES.USER.NOT_FOUND,
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: MESSAGES.GENERAL.SERVER_ERROR,
    });
  }
});

/* =========================
   UPDATE OWN PROFILE
========================= */
router.put("/me", authMiddleware, validateProfileUpdate, async (req, res) => {
  try {
    const { name } = req.body;

    // 🔒 keep same validation (old behavior)
    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const user = await userService.updateProfile(
      req.user.id,
      { name }
    );

    res.json({
      message: MESSAGES.USER.PROFILE_UPDATED,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: MESSAGES.GENERAL.SERVER_ERROR,
    });
  }
});

module.exports = router;
