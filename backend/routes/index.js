const express = require("express");
const router = express.Router();

// 🔐 Auth & User
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

// 🛡️ Role-based routes
const adminRoutes = require("./adminRoutes");
const mentorRoutes = require("./mentorRoutes");
const studentRoutes = require("./studentRoutes");

// 🧪 Test & Audit
const testRoutes = require("./testRoutes");
const auditRoutes = require("./auditRoutes");
 
//Admin-only audit
const adminAuditRoutes = require("./adminAuditRoutes");
const healthRoutes = require("./healthRoutes");

/* =========================
   ROUTE MOUNTING
========================= */

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.use("/admin", adminRoutes);
router.use("/mentor", mentorRoutes);
router.use("/student", studentRoutes);

router.use("/test", testRoutes);

// 🔓 normal audit (if any public/limited)
router.use("/audit", auditRoutes);

// 🔒 admin-only audit
router.use("/admin/audit", adminAuditRoutes);
router.use("/health", healthRoutes);
module.exports = router;
