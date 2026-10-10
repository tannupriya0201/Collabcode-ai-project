const Room = require("../models/Room");

/* =========================
   CREATE ROOM
========================= */
exports.createRoom = async (req, res) => {
  const { roomId, language } = req.body;

  const exists = await Room.findOne({ roomId });
  if (exists) {
    return res.status(400).json({ message: "Room already exists" });
  }

  const room = await Room.create({
    roomId,
    createdBy: req.user._id,
    language: language || "javascript",
    members: [req.user._id],
  });

  res.status(201).json({
    message: "Room created successfully",
    room,
  });
};

/* =========================
   JOIN ROOM
========================= */
exports.joinRoom = async (req, res) => {
  const { roomId } = req.params;

  const room = await Room.findOne({ roomId });
  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  if (!room.members.includes(req.user._id)) {
    room.members.push(req.user._id);
    await room.save();
  }

  res.json({
    message: "Joined room successfully",
    room,
  });
};
