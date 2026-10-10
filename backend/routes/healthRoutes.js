const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    service: "CollabCode AI Backend",
  });
});

module.exports = router;
