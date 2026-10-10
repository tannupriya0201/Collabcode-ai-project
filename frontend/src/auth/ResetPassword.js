import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (success) return;

    setLoading(true);
    setError("");

    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setSuccess(true);

      // ⏳ short delay then redirect
      setTimeout(() => {
        navigate("/reset-success");
      }, 1200);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New password (min 6 chars)"
          className="border rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={success}
        />

        {error && (
          <p className="text-red-600 text-sm mb-2 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-sm mb-2 text-center">
            Password updated successfully
          </p>
        )}

        <button
          disabled={loading || success}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Resetting..." : success ? "Done" : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
