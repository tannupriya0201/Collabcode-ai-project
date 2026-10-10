const mongoose = require("mongoose");

const codeSnapshotSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, index: true },
    code: { type: String, required: true },
    language: { type: String, default: "javascript" },
    savedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CodeSnapshot", codeSnapshotSchema);
