import { useEffect, useState } from "react";
import { connectSocket } from "../../services/socket";

/* =========================
   UTILS
========================= */
const colorFromString = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

const getInitials = (name = "U") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
  return (
    (parts[0][0] || "").toUpperCase() +
    (parts[1][0] || "").toUpperCase()
  );
};

export default function LiveCursor({ roomId }) {
  const socket = connectSocket();
  const [cursors, setCursors] = useState({});

  useEffect(() => {
    const username = localStorage.getItem("role") || "User";

    const handleMove = (e) => {
      socket.emit("cursor:move", {
        roomId,
        x: e.clientX,
        y: e.clientY,
        username,
      });
    };

    window.addEventListener("mousemove", handleMove);

    socket.on("cursor:update", (data) => {
      setCursors((prev) => ({
        ...prev,
        [data.socketId]: {
          ...data,
          color: colorFromString(data.username || data.socketId),
          initials: getInitials(data.username),
        },
      }));
    });

    socket.on("cursor:remove", ({ socketId }) => {
      setCursors((prev) => {
        const copy = { ...prev };
        delete copy[socketId];
        return copy;
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      socket.off("cursor:update");
      socket.off("cursor:remove");
    };
  }, [roomId, socket]);

  return (
    <>
      {Object.values(cursors).map((cursor) => (
        <div
          key={cursor.socketId}
          style={{
            position: "fixed",
            left: cursor.x,
            top: cursor.y,
            pointerEvents: "none",
            zIndex: 9999,
            transform: "translate(6px, 6px)",
          }}
        >
          {/* AVATAR */}
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: cursor.color,
              color: "#fff",
              fontSize: 11,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 6px ${cursor.color}`,
            }}
          >
            {cursor.initials}
          </div>

          {/* USERNAME */}
          <div
            style={{
              marginTop: 4,
              fontSize: 10,
              background: "#111",
              color: "#fff",
              padding: "2px 6px",
              borderRadius: 6,
              whiteSpace: "nowrap",
            }}
          >
            {cursor.username}
          </div>
        </div>
      ))}
    </>
  );
}
