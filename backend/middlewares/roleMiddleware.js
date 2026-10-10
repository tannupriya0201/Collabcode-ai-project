const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // 🔐 SAFETY TIP (authMiddleware missing case)
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
