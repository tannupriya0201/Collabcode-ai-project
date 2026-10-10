const validateProfileUpdate = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      message: "Valid name is required",
    });
  }

  next();
};

module.exports = {
  validateProfileUpdate,
};
