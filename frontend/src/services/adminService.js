import api from "../api/axios";

/* =========================
   ✅ ACTIVE BACKEND APIS
========================= */

// get all users (optional role filter)
export const getUsers = (role) => {
  return api.get("/admin/users", {
    params: role ? { role } : {},
  });
};

// get single user
export const getUserById = (id) => {
  return api.get(`/admin/users/${id}`);
};

// change user role
export const updateUserRole = ({ userId, role }) => {
  return api.patch(`/admin/users/${userId}/role`, { role });
};

// block user
export const blockUserByAdmin = (id) => {
  return api.patch(`/admin/users/${id}/block`);
};

// unblock user
export const unblockUserByAdmin = (id) => {
  return api.patch(`/admin/users/${id}/unblock`);
};

// audit logs (admin only)
export const getAuditLogs = (params) => {
  return api.get("/admin/audit-logs", { params });
};

/* =========================
   🧪 FUTURE / MOCK APIS
   (Backend not implemented yet)
========================= */

// system reports
export const getSystemReports = () => {
  return api.get("/admin/reports");
};

// platform analytics
export const getPlatformAnalytics = () => {
  return api.get("/admin/analytics");
};

// announcements
export const createAnnouncement = (data) => {
  return api.post("/admin/announcements", data);
};

// settings
export const updateSystemSettings = (data) => {
  return api.put("/admin/settings", data);
};
export const getSystemSettings = () => {
  return api.get("/admin/settings");
};

// data exports
export const exportUserData = (userId) => {
  return api.get(`/admin/users/${userId}/export`);
};
export const exportSystemData = () => {
  return api.get("/admin/system/export");
};
// scheduled maintenance
export const scheduleMaintenance = (data) => {
  return api.post("/admin/maintenance/schedule", data);
};
export const getMaintenanceSchedules = () => {
  return api.get("/admin/maintenance/schedules");
};
export const cancelMaintenance = (scheduleId) => {
  return api.delete(`/admin/maintenance/schedules/${scheduleId}`);
};
// content moderation
export const getReportedContent = () => {
  return api.get("/admin/moderation/reports");
};
export const takeModerationAction = (reportId, action) => {
  return api.post(`/admin/moderation/reports/${reportId}/action`, { action });
};
export const getModerationHistory = () => {
  return api.get("/admin/moderation/history");
};
// backup management
export const createBackup = () => {
  return api.post("/admin/backups");
};
export const getBackups = () => {
  return api.get("/admin/backups");
};
export const restoreBackup = (backupId) => {
  return api.post(`/admin/backups/${backupId}/restore`);
};
export const deleteBackup = (backupId) => {
  return api.delete(`/admin/backups/${backupId}`);
};
// role-based access control (RBAC)
export const getRolesAndPermissions = () => {
  return api.get("/admin/rbac/roles");
};
export const createRole = (data) => {
  return api.post("/admin/rbac/roles", data);
};
export const updateRolePermissions = (roleId, data) => {
  return api.put(`/admin/rbac/roles/${roleId}/permissions`, data);
} ;
export const deleteRole = (roleId) => {
  return api.delete(`/admin/rbac/roles/${roleId}`);
};
// notification management
export const sendSystemNotification = (data) => {
  return api.post("/admin/notifications", data);
};
export const getSentNotifications = () => {
  return api.get("/admin/notifications");
};
export const deleteNotification = (notificationId) => {
  return api.delete(`/admin/notifications/${notificationId}`);
};
// audit log filtering
export const filterAuditLogs = (filters) => {
  return api.get("/admin/audit-logs", { params: filters });
};
// user activity monitoring
export const getUserActivity = (userId) => {
  return api.get(`/admin/users/${userId}/activity`);
};
export const getAllUserActivities = () => {
  return api.get("/admin/users/activities");
};
// system health checks
export const getSystemHealth = () => {
  return api.get("/admin/system/health");
};
export const runHealthCheck = () => {
  return api.post("/admin/system/health/check");
};
// feature toggles
export const getFeatureToggles = () => {
  return api.get("/admin/features/toggles");
};
export const updateFeatureToggle = (featureId, data) => {
  return api.put(`/admin/features/toggles/${featureId}`, data);
};
export const createFeatureToggle = (data) => {
  return api.post("/admin/features/toggles", data);
};
export const deleteFeatureToggle = (featureId) => {
  return api.delete(`/admin/features/toggles/${featureId}`);
};
// API usage monitoring
export const getApiUsageStats = () => {
  return api.get("/admin/api/usage");
};  
export const getApiUsageByUser = (userId) => {
  return api.get(`/admin/api/usage/users/${userId}`);
};