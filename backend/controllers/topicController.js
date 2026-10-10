/* =========================
   TOPIC CONTENT CONTROLLER
========================= */

/* =========================
   GET ALL TOPICS
========================= */
exports.getAllTopics = async (req, res) => {
  res.json([
    { topic: "JavaScript Basics", level: 1 },
    { topic: "DSA Fundamentals", level: 2 },
    { topic: "System Design", level: 3 },
  ]);
};

/* =========================
   GET TOPIC DETAILS
========================= */
exports.getTopicDetails = async (req, res) => {
  const { topic } = req.params;

  if (!topic) {
    return res.status(400).json({ message: "Topic required" });
  }

  res.json({
    topic,
    content: "Detailed explanation of topic",
  });
};

/* =========================
   ADD NEW TOPIC
========================= */
exports.addNewTopic = async (req, res) => {
  const { topic, content } = req.body;

  if (!topic || !content) {
    return res.status(400).json({ message: "Topic & content required" });
  }

  res.status(201).json({
    message: "Topic added",
    topic,
  });
};

/* =========================
   UPDATE TOPIC CONTENT
========================= */
exports.updateTopicContent = async (req, res) => {
  const { topic, content } = req.body;

  if (!topic || !content) {
    return res.status(400).json({ message: "Topic & content required" });
  }

  res.json({ message: "Topic updated" });
};

/* =========================
   DELETE TOPIC
========================= */
exports.deleteTopic = async (req, res) => {
  const { topic } = req.params;

  if (!topic) {
    return res.status(400).json({ message: "Topic required" });
  }

  res.json({ message: `Topic '${topic}' deleted` });
};
