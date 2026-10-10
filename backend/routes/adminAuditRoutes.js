
const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const audit = require("../controllers/auditController");

router.get("/", auth, role("admin"), audit.getAuditLogs);

module.exports = router;
