const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// ✅ CONTROLLER
const { getAuditLogs } = require("../controllers/auditController");

/* =========================
   AUDIT ROOT CHECK
========================= */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Audit module active",
    });
  }
);

/* =========================
   GET AUDIT LOGS (ADMIN)
========================= */
router.get(
  "/logs",
  authMiddleware,
  roleMiddleware("admin"),
  getAuditLogs
);

module.exports = router;
