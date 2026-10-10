/**
 * Centralized API messages
 * Keeps responses consistent across backend
 */

const MESSAGES = {
  AUTH: {
    REGISTER_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logged out successfully",

    INVALID_CREDENTIALS: "Invalid credentials",
    TOKEN_MISSING: "No token provided",
    TOKEN_INVALID: "Invalid or expired token",

    EMAIL_NOT_VERIFIED: "Please verify your email before login",
    EMAIL_VERIFIED: "Email verified successfully",
    EMAIL_ALREADY_VERIFIED: "Email already verified",
    VERIFICATION_SENT: "Verification email sent",

    ACCOUNT_BLOCKED: "Your account has been blocked by admin",
  },

  USER: {
    NOT_FOUND: "User not found",
    PROFILE_UPDATED: "Profile updated successfully",
  },

  PASSWORD: {
    RESET_LINK_SENT: "Password reset link sent",
    RESET_SUCCESS: "Password reset successful",
    RESET_TOKEN_INVALID: "Invalid or expired reset token",
  },

  GENERAL: {
    SERVER_ERROR: "Server error",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access denied",
    ROUTE_NOT_FOUND: "API route not found",
  },
};

module.exports = MESSAGES;
