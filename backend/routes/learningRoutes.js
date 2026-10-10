const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");

const learning = require("../controllers/learningController");

router.post("/complete", auth, learning.completeTopic);
router.get("/progress", auth, learning.getLearningProgress);
router.delete("/progress/reset", auth, learning.resetLearningProgress);

router.get("/level-xp", auth, learning.getUserLevelXP);
router.post("/level-xp/reset", auth, learning.resetUserLevelXP);

router.get("/leaderboard", auth, learning.getLeaderboard);
router.get("/rank", auth, learning.getUserRank);

router.get("/summary", auth, learning.getProgressSummary);
router.get("/progress-over-time", auth, learning.getUserProgressOverTime);

router.get("/history", auth, learning.getUserProgressHistory);
router.delete("/history", auth, learning.clearUserProgressHistory);

router.get("/badges", auth, learning.getTopicProgressBadges);
router.get("/achievements", auth, learning.getUserProgressAchievements);

router.get("/goals", auth, learning.getUserProgressGoals);
router.put("/goals", auth, learning.updateUserProgressGoals);

module.exports = router;
