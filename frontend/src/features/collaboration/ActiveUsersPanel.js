import { useEffect, useState } from "react";
import { connectSocket } from "../../services/socket";

export default function ActiveUsersPanel({ roomId }) {
  const socket = connectSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!roomId) return;

    // ✅ listen for active users
    socket.on("room:users", (list) => {
      setUsers(list);
    });

    // 🔁 IMPORTANT: re-request users when panel mounts
    socket.emit("room:join", {
      roomId,
      user: {
        username: localStorage.getItem("role") || "User",
      },
    });

    return () => {
      socket.off("room:users");
    };
  }, [socket, roomId]);

  return (
    <div
      style={{
        width: 200,
        borderLeft: "1px solid #ddd",
        padding: 10,
      }}
    >
      <h4>👥 Active Users</h4>

      {users.length === 0 && <p>No users</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li
            key={u.socketId}
            style={{
              padding: "4px 0",
              fontSize: 13,
            }}
          >
            🟢 {u.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
