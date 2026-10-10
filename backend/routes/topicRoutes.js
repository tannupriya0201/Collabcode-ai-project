const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const topic = require("../controllers/topicController");

router.get("/", auth, topic.getAllTopics);
router.get("/:topic", auth, topic.getTopicDetails);

router.post("/", auth, role("admin"), topic.addNewTopic);
router.put("/", auth, role("admin"), topic.updateTopicContent);
router.delete("/:topic", auth, role("admin"), topic.deleteTopic);

module.exports = router;
