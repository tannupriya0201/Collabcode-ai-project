import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sent) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
      setSent(true);
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={sent}
        />

        <button
          disabled={loading || sent}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Sending..." : sent ? "Link Sent" : "Send Reset Link"}
        </button>

        {message && (
          <p className="text-center text-sm mt-3 text-green-600">
            {message}
          </p>
        )}

        <p className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-purple-600 text-sm hover:underline"
          >
            ← Back to Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
