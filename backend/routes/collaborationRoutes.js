const router = require("express").Router();
const CodeSnapshot = require("../models/CodeSnapshot");
const auth = require("../middlewares/authMiddleware");

router.get("/history/:roomId", auth, async (req, res) => {
  const snapshots = await CodeSnapshot.find({
    roomId: req.params.roomId,
  })
    .sort({ createdAt: -1 })
    .limit(20);

  res.json({ snapshots });
});
router.get("/playback/:roomId", async (req, res) => {
  const snapshots = await CodeSnapshot.find({
    roomId: req.params.roomId,
  }).sort({ createdAt: 1 }); // OLDEST → NEWEST

  res.json({ snapshots });
});
// CODE HISTORY
router.get("/history/:roomId", (req, res) => {
  res.json({
    snapshots: [],
  });
});

// PLAYBACK
router.get("/playback/:roomId", (req, res) => {
  res.json({
    events: [],
  });
});

module.exports = router;
