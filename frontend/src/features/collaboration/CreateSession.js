import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateSession() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const id = Math.random().toString(36).substring(2, 8);
    navigate(`/collab/${id}`);
  };

  const joinRoom = () => {
    if (!roomId) return;
    navigate(`/collab/${roomId}`);
  };

  return (
    <div>
      <h2>Collaboration</h2>

      <button onClick={createRoom}>Create New Session</button>

      <hr />

      <input
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
}
