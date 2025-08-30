import { b as useRuntimeConfig } from './server.mjs';

const getApiUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiUrl || "http://localhost:3001/api";
};
const getAuthHeaders = () => {
  return {};
};
const CropAPI = {
  // Rutas básicas CRUD
  create(data) {
    return $fetch("/crops", {
      method: "POST",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getAll() {
    return $fetch("/crops", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getAllWithUsers() {
    return $fetch("/crops/with-users", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getCategories() {
    return $fetch("/crops/categories", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getById(id) {
    return $fetch(`/crops/${id}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  update(id, data) {
    return $fetch(`/crops/${id}`, {
      method: "PUT",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  delete(id) {
    return $fetch(`/crops/${id}`, {
      method: "DELETE",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas por usuario
  getCropByUserId(userId) {
    return $fetch(`/crops/user/${userId}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getAllCropsByUserId(userId) {
    return $fetch(`/crops/user/${userId}/all`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getSelectedCropByUserId(userId) {
    return $fetch(`/crops/user/${userId}/selected`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas de acciones
  selectCrop(id) {
    return $fetch(`/crops/${id}/select`, {
      method: "PUT",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  deselectCrop(id) {
    return $fetch(`/crops/${id}/deselect`, {
      method: "PUT",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  }
};

export { CropAPI as C };
//# sourceMappingURL=CropAPI-Cg4msNVy.mjs.map
