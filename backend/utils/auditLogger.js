const AuditLog = require("../models/AuditLog");

const logAudit = async ({ action, performedBy, targetUser, metadata }) => {
  try {
    await AuditLog.create({
      action,
      performedBy,
      targetUser,
      metadata,
    });
  } catch (err) {
    console.error("AUDIT WRITE FAILED:", err.message);
  }
};

module.exports = logAudit;
