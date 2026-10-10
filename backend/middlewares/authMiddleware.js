const jwt = require("jsonwebtoken");
const MESSAGES = require("../constants/messages");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: MESSAGES.AUTH.TOKEN_MISSING,
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const User = require("../models/User");
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: MESSAGES.AUTH.USER_NOT_FOUND,
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked by admin",
      });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: MESSAGES.AUTH.TOKEN_INVALID,
    });
  }
};

module.exports = authMiddleware;
