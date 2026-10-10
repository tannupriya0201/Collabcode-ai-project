import { useEffect, useState } from "react";
import { connectSocket } from "../../services/socket";

export default function TypingIndicator({ roomId }) {
  const socket = connectSocket();
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    socket.on("typing:update", ({ username, isTyping }) => {
      setTypingUsers((prev) => {
        if (isTyping && !prev.includes(username)) {
          return [...prev, username];
        }
        if (!isTyping) {
          return prev.filter((u) => u !== username);
        }
        return prev;
      });
    });

    return () => {
      socket.off("typing:update");
    };
  }, [socket]);

  if (typingUsers.length === 0) return null;

  return (
    <div style={{ marginTop: 8, fontSize: 12, color: "#555" }}>
      ✍️ {typingUsers.join(", ")} typing...
    </div>
  );
}
