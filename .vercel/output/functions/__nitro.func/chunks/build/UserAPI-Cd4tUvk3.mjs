import { b as useRuntimeConfig } from './server.mjs';

const getApiUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiUrl || "http://localhost:3001/api";
};
const getAuthHeaders = () => {
  return {};
};
const UserAPI = {
  // Rutas básicas CRUD
  create(data) {
    return $fetch("/users", {
      method: "POST",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getAllUsers() {
    return $fetch("/users", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getById(id) {
    return $fetch(`/users/${id}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  update(id, data) {
    return $fetch(`/users/${id}`, {
      method: "PUT",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Eliminar usuario
  delete(userId, force = false) {
    return $fetch(`/users/${userId}`, {
      method: "DELETE",
      body: { force },
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Eliminar cuenta propia
  deleteOwnAccount(password) {
    return $fetch("/users/account/delete", {
      method: "DELETE",
      body: { password },
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas específicas
  getUserByEmail(email) {
    return $fetch(`/users/email/${email}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getCurrentUserProfile() {
    return $fetch("/users/profile/current", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  }
};

export { UserAPI as U };
//# sourceMappingURL=UserAPI-Cd4tUvk3.mjs.map
