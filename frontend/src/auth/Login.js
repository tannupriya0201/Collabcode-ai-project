import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { connectSocket } from "../services/socket";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ SAVE AUTH DATA
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("role", res.data.user.role);
     localStorage.setItem("user", JSON.stringify(res.data.user));
      // 🔌 SOCKET CONNECT
      connectSocket();

      const role = res.data.user.role;

      // ✅ ROLE BASED REDIRECT
      if (role === "admin") navigate("/admin/dashboard");
else if (role === "mentor") navigate("/mentor");
else navigate("/student");

    } catch (err) {
      const msg = err.response?.data?.message || "";

      // 🔥 CLEAR PARTIAL AUTH
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // 📧 EMAIL NOT VERIFIED CASE
      if (msg.toLowerCase().includes("verify")) {
        localStorage.setItem("unverifiedEmail", email);
        navigate("/email-not-verified");
        return;
      }

      alert(msg || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>

      <p>
        New user? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default Login;
