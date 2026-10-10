import { useNavigate } from "react-router-dom";

const ResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="text-green-600 text-5xl mb-4">✅</div>

        <h2 className="text-2xl font-bold mb-2">
          Password Reset Successful
        </h2>

        <p className="text-gray-600 mb-6">
          Your password has been updated successfully.
          You can now login with your new password.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ResetSuccess;
