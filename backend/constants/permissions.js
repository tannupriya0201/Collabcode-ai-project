/**
 * Permission → allowed roles mapping
 * Used by permissionMiddleware
 */
const PERMISSIONS = {
  VIEW_AUDIT: ["admin"],

  MANAGE_USERS: ["admin"],
  BLOCK_USER: ["admin"],
  CHANGE_ROLE: ["admin"],

  VIEW_PROFILE: ["admin", "mentor", "student"],
  UPDATE_PROFILE: ["admin", "mentor", "student"],

  ACCESS_ADMIN_DASHBOARD: ["admin"],
  ACCESS_MENTOR_DASHBOARD: ["mentor"],
  ACCESS_STUDENT_DASHBOARD: ["student"],
};

module.exports = PERMISSIONS;
