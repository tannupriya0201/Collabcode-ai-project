import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestList from "./TestList";
import { disconnectSocket } from "../../services/socket";

export default function MentorDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Source of truth
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    disconnectSocket();
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Mentor Dashboard</h1>

      <p><b>User ID:</b> {user.id || user._id}</p>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      {/* ✅ HEADING ONLY HERE */}
      <h2>My Tests</h2>
      <TestList />
      <button onClick={() => navigate("/mentor/create-test")}>
  ➕ Create Test
</button>
<button
  onClick={() => navigate(`/mentor/edit-test/${test._id}`)}
>
  Edit
</button>

    </div>
  );
}
