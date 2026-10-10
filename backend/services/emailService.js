const sendEmail = require("../utils/sendEmail");

const sendVerificationEmail = async ({ to, verifyUrl }) => {
  return sendEmail({
    to,
    subject: "Verify your email",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
  });
};

const sendResetPasswordEmail = async ({ to, resetUrl }) => {
  return sendEmail({
    to,
    subject: "Reset your password",
    html: `
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};
