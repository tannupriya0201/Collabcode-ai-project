const { Server } = require("socket.io");

// ✅ existing socket modules
const examSocket = require("./examSocket");
const collaborationSocket = require("./collaboration");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  // ✅ SOCKET AUTH (AFTER io INIT)
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized socket"));
    }

    // ⚠️ future: JWT verify here
    next();
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    // 🔴 EXISTING (DO NOT TOUCH)
    examSocket(io, socket);

    // 🟢 COLLABORATION
    collaborationSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
};

module.exports = { initSocket, getIO };
