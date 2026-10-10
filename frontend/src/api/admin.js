
import api from "./axios";

// 🔐 GET AUDIT LOGS (ADMIN ONLY)
export const getAuditLogs = (params = {}) => {
  return api.get("/audit/logs", { params });
};

// USERS
export const fetchUsers = (role) => {
  if (role) {
    return api.get(`/admin/users?role=${role}`);
  }
  return api.get("/admin/users");
};

export const fetchUserById = (id) => {
  return api.get(`/admin/users/${id}`);
};

// ROLE
export const changeUserRole = (data) => {
  return api.put("/admin/users/change-role", data);
};

// BLOCK / UNBLOCK
export const blockUser = (id) => {
  return api.put(`/admin/users/${id}/block`);
};

export const unblockUser = (id) => {
  return api.put(`/admin/users/${id}/unblock`);
};
