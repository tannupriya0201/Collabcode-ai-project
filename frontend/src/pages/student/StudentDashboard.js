import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { disconnectSocket } from "../../services/socket";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [learning, setLearning] = useState(null);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/student/student-data").then((res) => {
      setUser(res.data.user);
    });

    api.get("/student/learning").then((res) => {
      setLearning(res.data);
    });
  }, []);

  const handleJoinRoom = (id) => {
    const finalRoom = id || roomId;
    if (!finalRoom.trim()) return alert("Enter Room ID");
    navigate(`/collaboration/${finalRoom}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    disconnectSocket();
    navigate("/login");
  };

  if (!user || !learning) return <p>Loading...</p>;

  const xpPercent = Math.min((learning.xp / 200) * 100, 100);

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>Student Dashboard</h1>

      <p>
        <b>User ID:</b> {user.id}
      </p>
      <p>
        <b>Role:</b> {user.role}
      </p>

      {/* 🎮 XP BAR */}
      <h3>XP Progress</h3>
      <div style={{ background: "#ddd", height: 20 }}>
        <div
          style={{
            width: `${xpPercent}%`,
            background: "#4caf50",
            height: "100%",
          }}
        />
      </div>
      <p>
        XP: {learning.xp} | Level: {learning.level}
      </p>

      {/* 📊 ANALYTICS LINK */}
      <button
        onClick={() => navigate("/student/analytics")}
        style={{ marginBottom: 20 }}
      >
        View Analytics
      </button>

      <hr />

      {/* 🔑 JOIN ROOM */}
      <h3>Join Collaboration Room</h3>
      <input
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <br />
      <br />
      <button onClick={() => handleJoinRoom()}>Join Room</button>

      <hr />

      {/* 📚 JOINED ROOMS */}
      <h3>Joined Rooms</h3>
      {learning.joinedRooms.length === 0 ? (
        <p>No rooms yet</p>
      ) : (
        <ul>
          {learning.joinedRooms.map((r) => (
            <li key={r}>
              <button onClick={() => handleJoinRoom(r)}>
                Open {r}
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
