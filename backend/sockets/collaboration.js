const rooms = {};
const CodeSnapshot = require("../models/CodeSnapshot");
const Room = require("../models/Room");

/* =====================
   EMIT ACTIVE USERS
===================== */
const emitRoomUsers = (io, roomId, users) => {
  io.to(roomId).emit(
    "room:users",
    users.map((u) => ({
      username: u.username,
      socketId: u.socketId,
    }))
  );
};

module.exports = (io, socket) => {

  /* =====================
     CREATE ROOM
  ===================== */
  socket.on("room:create", ({ roomId, user }) => {
    if (!roomId || !user) return;

    if (!rooms[roomId]) {
      rooms[roomId] = {
        users: [],
        code: "",
        language: "javascript",
      };
    }

    const exists = rooms[roomId].users.find(
      (u) => u.socketId === socket.id
    );
    if (!exists) {
      rooms[roomId].users.push({
        ...user,
        socketId: socket.id,
      });
    }

    socket.join(roomId);
    socket.emit("room:joined", rooms[roomId]);
    emitRoomUsers(io, roomId, rooms[roomId].users);
  });

  /* =====================
     JOIN ROOM
  ===================== */
  socket.on("room:join", ({ roomId, user }) => {
    if (!rooms[roomId]) return;

    const exists = rooms[roomId].users.find(
      (u) => u.socketId === socket.id
    );
    if (!exists) {
      rooms[roomId].users.push({
        ...user,
        socketId: socket.id,
      });
    }

    socket.join(roomId);
    socket.emit("code:update", rooms[roomId].code);
    socket.emit("room:joined", rooms[roomId]);
    emitRoomUsers(io, roomId, rooms[roomId].users);
  });

  /* =====================
     CODE CHANGE + AUTOSAVE
  ===================== */
  socket.on("code:change", async ({ roomId, code, language, userId }) => {
    if (!rooms[roomId]) return;

    rooms[roomId].code = code;
    socket.to(roomId).emit("code:update", code);

    try {
      await CodeSnapshot.create({
        roomId,
        code,
        language: language || rooms[roomId].language,
        savedBy: userId,
      });

      await Room.findOneAndUpdate(
        { roomId },
        { code, language: language || rooms[roomId].language }
      );
    } catch (e) {}
  });

  /* =====================
     CURSOR MOVE
  ===================== */
  socket.on("cursor:move", ({ roomId, x, y, username }) => {
    if (!roomId) return;

    socket.to(roomId).emit("cursor:update", {
      socketId: socket.id,
      x,
      y,
      username,
    });
  });

  /* =====================
     TYPING INDICATOR
  ===================== */
  socket.on("typing", ({ roomId, username, isTyping }) => {
    if (!roomId) return;

    socket.to(roomId).emit("typing:update", {
      username,
      isTyping,
    });
  });

  /* =====================
     MENTOR CONTROL
  ===================== */
  socket.on("mentor:control", ({ roomId, line }) => {
    socket.to(roomId).emit("mentor:control", {
      line,
      lock: true,
    });

    setTimeout(() => {
      socket.to(roomId).emit("mentor:control", {
        lock: false,
      });
    }, 5000);
  });

  /* =====================
     🎮 XP ADD (FINAL)
  ===================== */
  socket.on("xp:add", ({ roomId, amount }) => {
    if (!amount) return;

    io.to(roomId).emit("xp:update", amount);
  });

  /* =====================
     DISCONNECT
  ===================== */
  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      rooms[roomId].users = rooms[roomId].users.filter(
        (u) => u.socketId !== socket.id
      );

      if (rooms[roomId].users.length === 0) {
        delete rooms[roomId];
      } else {
        emitRoomUsers(io, roomId, rooms[roomId].users);
      }
    }
  });
};
