const AuditLog = require("../models/AuditLog");

const createAuditLog = async ({
  action,
  performedBy,
  targetUser = null,
  roleBefore = null,
  roleAfter = null,
  req,
}) => {
  try {
    await AuditLog.create({
      action,
      performedBy,
      targetUser,
      roleBefore,
      roleAfter,
      ipAddress: req?.ip || null,
      userAgent: req?.headers?.["user-agent"] || null,
    });
  } catch (err) {
    console.error("AUDIT CREATE ERROR 👉", err);
  }
};

module.exports = {
  createAuditLog,
};
