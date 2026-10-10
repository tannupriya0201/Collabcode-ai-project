const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const {
  createRoom,
  joinRoom,
} = require("../controllers/roomController");

// Create room
router.post("/create", auth, createRoom);

// Join room
router.post("/join/:roomId", auth, joinRoom);

module.exports = router;
