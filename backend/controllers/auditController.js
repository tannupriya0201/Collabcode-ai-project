const AuditLog = require("../models/AuditLog");
const MESSAGES = require("../constants/messages");

/* =========================
   GET AUDIT LOGS (ADMIN)
   Pagination + Filters
========================= */
const getAuditLogs = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const { action, userId, from, to } = req.query;

    const filter = {};

    if (action) filter.action = action;
    if (userId) filter.targetUser = userId;

    if (from || to) {
      filter.createdAt = {};
      if (from && !isNaN(Date.parse(from))) {
        filter.createdAt.$gte = new Date(from);
      }
      if (to && !isNaN(Date.parse(to))) {
        filter.createdAt.$lte = new Date(to);
      }
    }

    const logs = await AuditLog.find(filter)
      .populate("performedBy", "name email role")
      .populate("targetUser", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AuditLog.countDocuments(filter);

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalLogs: total,
      logs,
    });
  } catch (error) {
    console.error("AUDIT LOG ERROR 👉", error);
    res.status(500).json({
      message: MESSAGES.GENERAL.SERVER_ERROR,
    });
  }
};

module.exports = {
  getAuditLogs,
};
