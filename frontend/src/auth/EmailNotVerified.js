import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function EmailNotVerified() {
  const navigate = useNavigate();
  const email = localStorage.getItem("unverifiedEmail");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ HARD GUARD
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const resendVerification = async () => {
    if (!email) {
      setMessage("Email not found. Please login again.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/resend-verification", {
        email,
      });

      setMessage(res.data?.message || "Verification email sent");

    } catch (err) {
      if (err.response) {
        setMessage(
          err.response.data?.message ||
          `Server error (${err.response.status})`
        );
      } else {
        setMessage("Server not reachable. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Email Not Verified</h2>

      <p>
        Your email <b>{email}</b> is not verified.
        <br />
        Please verify your email to continue.
      </p>

      <button onClick={resendVerification} disabled={loading}>
        {loading ? "Sending..." : "Resend Verification Email"}
      </button>

      {message && (
        <p style={{ marginTop: 10, color: "red" }}>
          {message}
        </p>
      )}

      <p style={{ marginTop: 20 }}>
        <button onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </p>
    </div>
  );
}

export default EmailNotVerified;
