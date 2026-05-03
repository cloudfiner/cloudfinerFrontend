import api from "@/lib/api";

// USERS
export const getUsers = () => api.get("/api/auth/admin/users");
export const deleteUser = (id) => api.delete(`/api/auth/users/${id}`);
export const activateUser = (id) => api.put(`/api/auth/users/${id}/activate`);

// RULES
export const getRules = () => api.get("/api/admin/rules");
export const createRule = (data) => api.post("/api/admin/rules", data);
export const updateRule = (id, data) => api.put(`/api/admin/rules/${id}`, data);
export const deleteRule = (id) => api.delete(`/api/admin/rules/${id}`);

// TEMPLATES
export const getTemplates = () => api.get("/api/admin/templates");
export const deleteTemplate = (id) => api.delete(`/api/admin/templates/${id}`);