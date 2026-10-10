module.exports = function addXP(user, earnedXP) {
  user.xp += earnedXP;

  // simple level-up rule
  if (user.xp >= user.level * 100) {
    user.level += 1;
  }
};
