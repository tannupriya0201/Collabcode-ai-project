import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/auth/verify-email/${token}`);
        alert("Email verified successfully");
        navigate("/login");
      } catch (err) {
        alert("Invalid or expired verification link");
      }
    };

    verify();
  }, [token, navigate]);

  return <p>Verifying email...</p>;
}

export default VerifyEmail;
