import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userRole = localStorage.getItem("role");

  // ❌ no token or corrupted auth
  if (!token || token === "undefined" || token === "null" || !user) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // 🔐 role mismatch
  if (role && role !== userRole) {
    // 🔁 redirect to correct dashboard (NO CLEAR)
    if (userRole === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (userRole === "mentor") {
      return <Navigate to="/mentor" replace />;
    }

    if (userRole === "student") {
      return <Navigate to="/student" replace />;
    }

    // fallback
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // ✅ allowed
  return children;
}

export default ProtectedRoute;
