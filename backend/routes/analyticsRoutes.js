const router = require("express").Router();

router.get("/room/:roomId", (req, res) => {
  const roomAnalytics = Object.values(analytics || {}).filter(
    (a) => a.roomId === req.params.roomId
  );

  res.json({ roomAnalytics });
});
router.get("/room/:roomId", (req, res) => {
  res.json({
    timeSpent: 0,
    edits: 0,
    mentorActions: 0,
  });
});
module.exports = router;
