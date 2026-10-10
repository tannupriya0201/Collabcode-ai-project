const rateLimit = require("express-rate-limit");

exports.aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: {
    success: false,
    message: "Too many AI requests, slow down",
  },
});
