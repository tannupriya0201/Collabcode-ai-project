const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const {
  saveSnapshot,
  getLatestSnapshot,
} = require("../controllers/codeSnapshotController");

// Save snapshot (manual or autosave trigger)
router.post("/save", auth, saveSnapshot);

// Load latest snapshot for a room
router.get("/latest/:roomId", auth, getLatestSnapshot);

module.exports = router;
