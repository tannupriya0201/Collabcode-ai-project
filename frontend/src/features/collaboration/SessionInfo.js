import { useEffect, useState } from "react";
import { connectSocket } from "../../services/socket";

export default function SessionInfo({ roomId }) {
  const [users, setUsers] = useState([]);
  const socket = connectSocket();

  useEffect(() => {
    socket.on("room-users", (list) => {
      setUsers(list);
    });

    socket.emit("get-room-users", { roomId });

    return () => {
      socket.off("room-users");
    };
  }, [roomId, socket]);

  return (
    <div>
      <h4>Active Users</h4>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>
    </div>
  );
}
