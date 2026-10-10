const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const MESSAGES = require("../constants/messages");
const AuditLog = require("../models/AuditLog");

// ✅ AUDIT SERVICE
const { auditService } = require("../services");

// Existing controllers (UNCHANGED)
const {
  changeUserRole,
  getUsersByRole,
  blockUser,
  unblockUser,
} = require("../controllers/adminController");

// =======================
// ADMIN: DASHBOARD DATA
// =======================
router.get(
  "/admin-data",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Admin dashboard API working",
      user: req.user,
    });
  }
);

// =======================
// ADMIN: GET ALL USERS
// =======================
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { role } = req.query;

      let filter = {};
      if (role) filter.role = role;

      const users = await User.find(filter).select(
        "-password -refreshToken"
      );

      res.json(users);
    } catch {
      res.status(500).json({
        message: MESSAGES.GENERAL.SERVER_ERROR,
      });
    }
  }
);

// =======================
// ADMIN: GET USER BY ID
// =======================
router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select(
        "-password -refreshToken"
      );

      if (!user) {
        return res.status(404).json({
          message: MESSAGES.USER.NOT_FOUND,
        });
      }

      res.json(user);
    } catch {
      res.status(500).json({
        message: MESSAGES.GENERAL.SERVER_ERROR,
      });
    }
  }
);

// =======================
// ADMIN: FORCE LOGOUT
// =======================
router.post(
  "/users/:id/force-logout",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const targetUser = await User.findById(req.params.id);

      if (!targetUser) {
        return res.status(404).json({
          message: MESSAGES.USER.NOT_FOUND,
        });
      }

      if (targetUser.role === "admin") {
        return res.status(403).json({
          message: "Admin cannot force logout another admin",
        });
      }

      targetUser.refreshToken = null;
      await targetUser.save();

      res.json({
        message: "User force logged out by admin",
      });
    } catch {
      res.status(500).json({
        message: MESSAGES.GENERAL.SERVER_ERROR,
      });
    }
  }
);

// =======================
// ADMIN: CHANGE USER ROLE
// =======================
router.put(
  "/users/change-role",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res, next) => {
    try {
      const { userId, newRole } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: MESSAGES.USER.NOT_FOUND,
        });
      }

      const oldRole = user.role;

      // 👉 existing controller logic
      await changeUserRole(req, res);

      // ✅ ROLE CHANGE AUDIT
      await auditService.createAuditLog({
        action: "ROLE_CHANGE",
        performedBy: req.user.id,
        targetUser: user._id,
        roleBefore: oldRole,
        roleAfter: newRole,
        req,
      });
    } catch (err) {
      next(err);
    }
  }
);

// =======================
// ADMIN: BLOCK USER
// =======================
router.put(
  "/users/:id/block",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: MESSAGES.USER.NOT_FOUND,
        });
      }

      await blockUser(req, res);

      // ✅ BLOCK AUDIT
      await auditService.createAuditLog({
        action: "BLOCK_USER",
        performedBy: req.user.id,
        targetUser: user._id,
        req,
      });
    } catch (err) {
      next(err);
    }
  }
);

// =======================
// ADMIN: UNBLOCK USER
// =======================
router.put(
  "/users/:id/unblock",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: MESSAGES.USER.NOT_FOUND,
        });
      }

      await unblockUser(req, res);

      // ✅ UNBLOCK AUDIT
      await auditService.createAuditLog({
        action: "UNBLOCK_USER",
        performedBy: req.user.id,
        targetUser: user._id,
        req,
      });
    } catch (err) {
      next(err);
    }
  }
);

// =======================
// ADMIN: GET AUDIT LOGS
// =======================
router.get(
  "/auditlogs",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const logs = await AuditLog.find()
  .populate("performedBy", "email")
  .sort({ createdAt: -1 })
        .limit(100);

      // ✅ DISABLE CACHE
      res.set("Cache-Control", "no-store");

      res.json(logs);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch audit logs",
      });
    }
  }
);


module.exports = router;
