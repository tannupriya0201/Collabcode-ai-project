const User = require("../models/User");

const getUserById = async (userId) => {
  return User.findById(userId).select("-password -refreshToken");
};

const updateProfile = async (userId, data) => {
  return User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  }).select("-password -refreshToken");
};

module.exports = {
  getUserById,
  updateProfile,
};
