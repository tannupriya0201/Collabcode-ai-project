const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { aiLimiter } = require("../middlewares/rateLimit");

const ai = require("../controllers/aiTutorController");

router.post("/ask", auth, aiLimiter, ai.askTutor);
router.get("/suggest", auth, aiLimiter, ai.aiSuggestNextMove);

module.exports = router;
