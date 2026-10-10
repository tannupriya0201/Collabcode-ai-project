const CodeSnapshot = require("../models/CodeSnapshot");
const Room = require("../models/Room");

/* =========================
   SAVE SNAPSHOT
========================= */
exports.saveSnapshot = async (req, res) => {
  const { roomId, code, language } = req.body;

  if (!roomId || typeof code !== "string") {
    return res.status(400).json({ message: "Invalid payload" });
  }

  // Save snapshot
  const snap = await CodeSnapshot.create({
    roomId,
    code,
    language,
    savedBy: req.user?._id,
  });

  // Keep latest code on Room for resume
  await Room.findOneAndUpdate(
    { roomId },
    { code, language },
    { new: true }
  );

  res.status(201).json({ message: "Snapshot saved", snapId: snap._id });
};

/* =========================
   GET LATEST SNAPSHOT
========================= */
exports.getLatestSnapshot = async (req, res) => {
  const { roomId } = req.params;

  const latest = await CodeSnapshot.findOne({ roomId })
    .sort({ createdAt: -1 })
    .lean();

  if (!latest) {
    return res.json({ code: "", language: "javascript" });
  }

  res.json({
    code: latest.code,
    language: latest.language || "javascript",
  });
};
