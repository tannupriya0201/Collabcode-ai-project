const PERMISSIONS = require("../constants/permissions");

const permissionMiddleware = (permission) => {
  return (req, res, next) => {

    // 🔐 safety check
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const role = req.user.role;

    if (!PERMISSIONS[permission]?.includes(role)) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    next();
  };
};

module.exports = permissionMiddleware;
