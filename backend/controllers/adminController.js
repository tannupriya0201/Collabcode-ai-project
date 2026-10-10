const User = require("../models/User");
const { auditService } = require("../services");

// ADMIN: change user role
exports.changeUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!["student", "mentor"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Allowed roles: student, mentor",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    // ✅ AUDIT: ROLE CHANGE
    await auditService.createAuditLog({
      action: "ROLE_CHANGE",
      performedBy: req.user.id,
      targetUser: user._id,
      roleBefore: oldRole,
      roleAfter: role,
      req,
    });

    res.json({
      message: "User role updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Change role error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ADMIN: get users (all or role-wise)
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    let filter = {};

    if (role) {
      filter.role = role;
    }

    const users = await User.find(filter).select(
      "-password -refreshToken"
    );

    res.json(users);
  } catch (error) {
    console.error("Get users by role error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ADMIN: block user

exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot block admin" });
    }

    user.isBlocked = true;
    await user.save();

    // ✅ AUDIT: BLOCK USER
    await auditService.createAuditLog({
      action: "BLOCK_USER",
      performedBy: req.user.id,
      targetUser: user._id,
      req,
    });

    res.json({ message: "User blocked successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


// ADMIN: unblock user
exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = false;
    await user.save();

    // ✅ AUDIT: UNBLOCK USER
    await auditService.createAuditLog({
      action: "UNBLOCK_USER",
      performedBy: req.user.id,
      targetUser: user._id,
      req,
    });

    res.json({ message: "User unblocked successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
