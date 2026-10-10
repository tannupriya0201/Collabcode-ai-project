const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        "LOGIN",
        "LOGOUT",
        "ROLE_CHANGE",
        "BLOCK_USER",
        "UNBLOCK_USER",
      ],
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    roleBefore: String,
    roleAfter: String,

    ipAddress: String,
    userAgent: String,

    meta: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
