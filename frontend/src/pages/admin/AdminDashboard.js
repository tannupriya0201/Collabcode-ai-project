import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/axios";
import UsersList from "./UsersList";

import {
  getUsers,
  updateUserRole,
  blockUserByAdmin,
  unblockUserByAdmin,
} from "../../services/adminService";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");

  const navigate = useNavigate();

  /* =========================
     LOAD ADMIN INFO
  ========================= */
  useEffect(() => {
    api.get("/admin/admin-data")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  /* =========================
     LOAD USERS (ROLE FILTER)
  ========================= */
  useEffect(() => {
    loadUsers(filterRole);
  }, [filterRole]);

  const loadUsers = async (role) => {
    const res =
      role === "all"
        ? await getUsers()
        : await getUsers(role);

    setUsers(res.data);
  };

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <p>
        <b>Role:</b> {user.role}
      </p>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      {/* 🔍 AUDIT LOGS */}
      <Link to="/admin/audit-logs">
        🔍 View Audit Logs
      </Link>

      <hr />

      <h2>Filter Users</h2>

      <button onClick={() => setFilterRole("all")}>All</button>
      <button onClick={() => setFilterRole("student")}>Students</button>
      <button onClick={() => setFilterRole("mentor")}>Mentors</button>

      <h2>All Users</h2>

      <UsersList
        users={users}
        onRoleChange={updateUserRole}
        onBlock={blockUserByAdmin}
        onUnblock={unblockUserByAdmin}
      />
    </div>
  );
}
