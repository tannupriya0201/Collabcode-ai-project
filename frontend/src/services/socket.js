import { io } from "socket.io-client";

let socket = null;
const SOCKET_URL = "http://localhost:5000";

/* =========================
   CONNECT SOCKET (SINGLETON)
========================= */
export const connectSocket = () => {
  if (!socket) {
    const token = localStorage.getItem("token");

    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        token, // 🔐 JWT support (safe even if backend ignores)
      },
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }

  return socket;
};

/* =========================
   GET EXISTING SOCKET
========================= */
export const getSocket = () => socket;

/* =========================
   DISCONNECT SOCKET (LOGOUT)
========================= */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
