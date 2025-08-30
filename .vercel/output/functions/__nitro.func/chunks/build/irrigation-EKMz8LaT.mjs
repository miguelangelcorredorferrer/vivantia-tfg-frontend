import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { b as useRuntimeConfig } from './server.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { u as useCropStore } from './crop-CoogIRpZ.mjs';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';

const getApiUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiUrl || "http://localhost:3001/api";
};
const getAuthHeaders = () => {
  return {};
};
const IrrigationAPI = {
  // Rutas básicas de configuración de riego
  createIrrigationConfig(data) {
    return $fetch("/irrigation", {
      method: "POST",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getIrrigationConfigById(id) {
    return $fetch(`/irrigation/${id}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  deleteIrrigationConfig(id) {
    return $fetch(`/irrigation/${id}`, {
      method: "DELETE",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas por usuario
  getActiveIrrigationConfigsByUser(userId) {
    return $fetch(`/irrigation/user/${userId}/active`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getIrrigationConfigsByUser(userId) {
    return $fetch(`/irrigation/user/${userId}/all`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getIrrigationConfigsByUserAndType(userId, modeType) {
    return $fetch(`/irrigation/user/${userId}/type/${modeType}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas de acciones
  activateIrrigationConfig(id) {
    return $fetch(`/irrigation/${id}/activate`, {
      method: "PUT",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  deactivateIrrigationConfig(id) {
    return $fetch(`/irrigation/${id}/deactivate`, {
      method: "PUT",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  updateLastIrrigation(id, data) {
    return $fetch(`/irrigation/${id}/update-last-irrigation`, {
      method: "PUT",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas de configuración específica
  getSpecificConfig(id) {
    return $fetch(`/irrigation/${id}/specific-config`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas para configuraciones manuales (ahora integradas en irrigation_configs)
  updateManualConfig(id, data) {
    return $fetch(`/irrigation/manual/${id}`, {
      method: "PUT",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas para configuraciones automáticas
  createAutomaticConfig(data) {
    return $fetch("/irrigation/automatic", {
      method: "POST",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // ===== FUNCIONES ESPECÍFICAS PARA MODO AUTOMÁTICO =====
  // Crear configuración automática simplificada (sin duración)
  createSimpleAutomaticConfig(data) {
    return $fetch("/irrigation/automatic/simple", {
      method: "POST",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Obtener estado del modo automático
  async getAutomaticConfigStatus(userId) {
    try {
      return await $fetch(`/irrigation/automatic/status/${userId}`, {
        method: "GET",
        baseURL: getApiUrl(),
        headers: getAuthHeaders()
      });
    } catch (error) {
      if (error.status === 404 || error.statusCode === 404) {
        return {
          success: false,
          message: "No hay configuraci\xF3n autom\xE1tica activa",
          data: null,
          isNotFound: true
        };
      }
      throw error;
    }
  },
  // Cancelar configuración automática
  async cancelAutomaticConfig(userId) {
    try {
      return await $fetch(`/irrigation/automatic/cancel/${userId}`, {
        method: "DELETE",
        baseURL: getApiUrl(),
        headers: getAuthHeaders()
      });
    } catch (error) {
      if (error.status === 404 || error.statusCode === 404) {
        return {
          success: false,
          message: "No hay configuraci\xF3n autom\xE1tica activa para cancelar",
          data: null,
          isNotFound: true
        };
      }
      throw error;
    }
  },
  // Evaluar riego automático
  async evaluateAutomaticIrrigation(userId) {
    return await $fetch(`/irrigation/automatic/evaluate/${userId}`, {
      method: "POST",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // ===== FUNCIONES PARA MODO PROGRAMADO =====
  // Rutas para configuraciones programadas
  createProgrammedConfig(data) {
    return $fetch("/irrigation/programmed", {
      method: "POST",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  cancelProgrammedConfig(irrigationConfigId) {
    return $fetch(`/irrigation/programmed/${irrigationConfigId}/cancel`, {
      method: "DELETE",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  deleteProgrammedSettings(irrigationConfigId) {
    return $fetch(`/irrigation/programmed/${irrigationConfigId}/settings`, {
      method: "DELETE",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  cancelProgrammedIrrigation(irrigationConfigId) {
    return $fetch(`/irrigation/programmed/${irrigationConfigId}/cancel-irrigation`, {
      method: "DELETE",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  updateNextExecution(id, data) {
    return $fetch(`/irrigation/programmed/${id}/next-execution`, {
      method: "PUT",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Alertas de riego
  createIrrigationStartedAlert(userId, mode, cropName, durationMinutes) {
    return $fetch("/irrigation/alerts/started", {
      method: "POST",
      body: { user_id: userId, mode, crop_name: cropName, duration_minutes: durationMinutes },
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  createIrrigationEndedAlert(userId, mode, cropName, wasCompleted = true) {
    return $fetch("/irrigation/alerts/ended", {
      method: "POST",
      body: { user_id: userId, mode, crop_name: cropName, was_completed: wasCompleted },
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  createIrrigationCancelledAlert(userId, mode, cropName) {
    return $fetch("/irrigation/alerts/cancelled", {
      method: "POST",
      body: { user_id: userId, mode, crop_name: cropName },
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  createIrrigationPausedAlert(userId, mode, cropName) {
    return $fetch("/irrigation/alerts/paused", {
      method: "POST",
      body: { user_id: userId, mode, crop_name: cropName },
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  createIrrigationResumedAlert(userId, mode, cropName) {
    return $fetch("/irrigation/alerts/resumed", {
      method: "POST",
      body: { user_id: userId, mode, crop_name: cropName },
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  updateProgrammedExecution(id, data) {
    return $fetch(`/irrigation/programmed/${id}/execution`, {
      method: "PUT",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas para activaciones de bomba
  createPumpActivation(data) {
    return $fetch("/irrigation/pump-activation", {
      method: "POST",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getActivePumpActivation(irrigationConfigId) {
    return $fetch(`/irrigation/pump-activation/config/${irrigationConfigId}/active`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getLatestPumpActivationByConfig(irrigationConfigId) {
    return $fetch(`/irrigation/pump-activation/config/${irrigationConfigId}/latest`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  updatePumpActivationStatus(id, data) {
    return $fetch(`/irrigation/pump-activation/${id}/status`, {
      method: "PUT",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  pausePumpActivation(id) {
    return $fetch(`/irrigation/pump-activation/${id}/pause`, {
      method: "PUT",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  resumePumpActivation(id) {
    return $fetch(`/irrigation/pump-activation/${id}/resume`, {
      method: "PUT",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  completePumpActivation(id) {
    return $fetch(`/irrigation/pump-activation/${id}/complete`, {
      method: "PUT",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getPumpActivationsByUser(userId, limit = 10) {
    return $fetch(`/irrigation/pump-activation/user/${userId}/history?limit=${limit}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Obtener última fecha de riego del usuario
  getLastIrrigationDate(userId) {
    return $fetch(`/irrigation/user/${userId}/last-irrigation`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Evaluar automáticamente después de insertar datos
  evaluateAutomaticIrrigation(userId) {
    return $fetch(`/irrigation/automatic/evaluate/${userId}`, {
      method: "POST",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Activar/desactivar bomba automática (método simple)
  toggleAutomaticPump(userId, action) {
    return $fetch(`/irrigation/automatic/toggle/${userId}`, {
      method: "POST",
      body: { action },
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  }
};
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const useIrrigationStore = defineStore("irrigation", () => {
  const activeMode = ref(null);
  const irrigationConfig = ref(null);
  const specificConfig = ref(null);
  const activePumpActivation = ref(null);
  const lastCompletedConfig = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  let statusInterval = null;
  let countdownInterval = null;
  const userStore = useUserStore();
  const cropStore = useCropStore();
  const { irrigationCompleted } = useToastNotifications();
  const hasActiveMode = computed(() => activeMode.value !== null);
  const isManualActive = computed(() => activeMode.value === "manual");
  const isAutomaticActive = computed(() => activeMode.value === "automatic");
  const isProgrammedActive = computed(() => activeMode.value === "programmed");
  const isWatering = computed(() => {
    var _a;
    return ((_a = activePumpActivation.value) == null ? void 0 : _a.status) === "active";
  });
  const isPaused = computed(() => {
    var _a;
    return ((_a = activePumpActivation.value) == null ? void 0 : _a.status) === "paused";
  });
  const isCompleted = computed(() => {
    var _a;
    return ((_a = activePumpActivation.value) == null ? void 0 : _a.status) === "completed";
  });
  const isProgrammedWaiting = computed(() => {
    var _a;
    return ((_a = activePumpActivation.value) == null ? void 0 : _a.status) === "programmed";
  });
  const timeUntilNextExecution = ref(null);
  const nextExecutionFormatted = computed(() => {
    var _a;
    if (!((_a = specificConfig.value) == null ? void 0 : _a.next_execution)) return null;
    try {
      const nextDate = new Date(specificConfig.value.next_execution);
      return nextDate.toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (err) {
      console.error("Error formateando next_execution:", err);
      return null;
    }
  });
  const autoCompletionTriggered = ref(false);
  const disableTimeBasedCompletion = ref(false);
  const remainingTime = computed(() => {
    if (!activePumpActivation.value || !isWatering.value) {
      return null;
    }
    if (activeMode.value === "automatic") {
      return "Autom\xE1tico (basado en sensores)";
    }
    const durationMinutes = parseFloat(activePumpActivation.value.duration_minutes) || 0;
    if (durationMinutes === 0) {
      console.log("\u26A0\uFE0F [SAFEGUARD] duration_minutes = 0 detectado, probablemente modo autom\xE1tico");
      return "Autom\xE1tico (basado en sensores)";
    }
    if (!activeMode.value) {
      console.log("\u26A0\uFE0F [SAFEGUARD] activeMode no definido, saltando c\xE1lculo de tiempo");
      return "Cargando...";
    }
    const startTime = new Date(activePumpActivation.value.started_at);
    const now = /* @__PURE__ */ new Date();
    const elapsedSeconds = Math.floor((now - startTime) / 1e3);
    const totalSeconds = durationMinutes * 60;
    const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);
    if (remainingSeconds <= 0 && activePumpActivation.value.status === "active" && !autoCompletionTriggered.value && !disableTimeBasedCompletion.value && activeMode.value !== "automatic" && activeMode.value !== void 0 && durationMinutes > 0) {
      const runningTimeMinutes = (now - startTime) / (1e3 * 60);
      if (runningTimeMinutes < 0.5) {
        console.log("\u26A0\uFE0F [SAFEGUARD] Riego muy reciente, saltando auto-completado:", runningTimeMinutes.toFixed(2), "min");
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }
      console.log("\u{1F6A8} TIEMPO AGOTADO - Auto-completando riego (ID:", activePumpActivation.value.id, ")");
      console.log("\u{1F50D} [DEBUG] Contexto auto-completado:", {
        activeMode: activeMode.value,
        durationMinutes,
        remainingSeconds,
        status: activePumpActivation.value.status,
        autoCompletionTriggered: autoCompletionTriggered.value
      });
      autoCompletionTriggered.value = true;
      const activationId = activePumpActivation.value.id;
      completeIrrigation().then(() => {
        console.log("\u2705 Auto-completado ejecutado exitosamente para ID:", activationId);
      }).catch((error2) => {
        console.error("\u274C Error en auto-completado:", error2);
      });
    }
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  });
  let timeUpdateInterval = null;
  const startTimeUpdates = () => {
    if (timeUpdateInterval) clearInterval(timeUpdateInterval);
    if (activeMode.value === "automatic") {
      console.log("\u2139\uFE0F Modo autom\xE1tico detectado - NO iniciando updates de tiempo");
      return;
    }
    timeUpdateInterval = setInterval();
  };
  const stopTimeUpdates = () => {
    if (timeUpdateInterval) {
      clearInterval(timeUpdateInterval);
      timeUpdateInterval = null;
    }
  };
  watch(() => {
    var _a;
    return (_a = activePumpActivation.value) == null ? void 0 : _a.id;
  }, (newId, oldId) => {
    if (newId !== oldId && newId !== void 0 && oldId !== void 0) {
      console.log("\u{1F504} Nueva activaci\xF3n detectada - reiniciando autoCompletionTriggered");
      autoCompletionTriggered.value = false;
    } else if (newId !== oldId) {
      console.log("\u2139\uFE0F [SKIP] Cambio de activaci\xF3n ignorado (carga inicial o similar):", { newId, oldId });
    }
  });
  watch(() => {
    var _a;
    return (_a = activePumpActivation.value) == null ? void 0 : _a.status;
  }, (newStatus, oldStatus) => {
    var _a;
    if (oldStatus === "active" && newStatus === "completed") {
      console.log("\u{1F389} Riego completado detectado por watcher");
      const cropName = ((_a = cropStore.selectedCrop) == null ? void 0 : _a.name) || "Cultivo";
      irrigationCompleted(activeMode.value, cropName);
    }
  });
  const lastIrrigation = computed(() => {
    var _a, _b;
    if ((_a = irrigationConfig.value) == null ? void 0 : _a.last_irrigation_at) {
      const lastDate = new Date(irrigationConfig.value.last_irrigation_at);
      const now = /* @__PURE__ */ new Date();
      const diffHours = Math.floor((now - lastDate) / (1e3 * 60 * 60));
      if (diffHours < 1) {
        return "Hace menos de 1 hora";
      } else if (diffHours < 24) {
        return `Hace ${diffHours} horas`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `Hace ${diffDays} d\xEDas`;
      }
    }
    if ((_b = lastCompletedConfig.value) == null ? void 0 : _b.last_irrigation_at) {
      const lastDate = new Date(lastCompletedConfig.value.last_irrigation_at);
      const now = /* @__PURE__ */ new Date();
      const diffHours = Math.floor((now - lastDate) / (1e3 * 60 * 60));
      if (diffHours < 1) {
        return "Hace menos de 1 hora";
      } else if (diffHours < 24) {
        return `Hace ${diffHours} horas`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `Hace ${diffDays} d\xEDas`;
      }
    }
    return "Nunca";
  });
  const canAccessMode = computed(() => (mode) => {
    return !hasActiveMode.value || activeMode.value === mode;
  });
  const canAccessManualMode = computed(() => {
    return !hasActiveMode.value || activeMode.value === "manual";
  });
  const canAccessAutomaticMode = computed(() => {
    return !hasActiveMode.value || activeMode.value === "automatic";
  });
  const canAccessProgrammedMode = computed(() => {
    return !hasActiveMode.value || activeMode.value === "programmed";
  });
  const findManualConfigByUserAndCrop = async (userId, cropId) => {
    try {
      console.log("\u{1F50D} Buscando configuraci\xF3n manual para usuario:", userId, "cultivo:", cropId);
      const response = await IrrigationAPI.getIrrigationConfigsByUserAndType(userId, "manual");
      if (response.success && response.data.length > 0) {
        const existingConfig = response.data.find((config) => config.crop_id === cropId);
        if (existingConfig) {
          console.log("\u2705 Configuraci\xF3n manual encontrada:", existingConfig.id);
          return existingConfig;
        }
      }
      console.log("\u274C No se encontr\xF3 configuraci\xF3n manual existente");
      return null;
    } catch (err) {
      console.error("Error buscando configuraci\xF3n manual:", err);
      return null;
    }
  };
  const loadLastCompletedConfiguration = async () => {
    var _a;
    try {
      if (!((_a = userStore.user) == null ? void 0 : _a.id)) return;
      const response = await IrrigationAPI.getIrrigationConfigsByUserAndType(userStore.user.id, "manual");
      if (response.success && response.data.length > 0) {
        const configsWithLastIrrigation = response.data.filter((config) => config.last_irrigation_at);
        if (configsWithLastIrrigation.length > 0) {
          const latestConfig = configsWithLastIrrigation.reduce((latest, current) => {
            return new Date(current.last_irrigation_at) > new Date(latest.last_irrigation_at) ? current : latest;
          });
          lastCompletedConfig.value = latestConfig;
          console.log("\u2705 \xDAltima configuraci\xF3n completada cargada:", latestConfig.last_irrigation_at);
        }
      }
    } catch (err) {
      console.error("Error loading last completed configuration:", err);
    }
  };
  const loadActiveConfiguration = async () => {
    var _a;
    try {
      isLoading.value = true;
      error.value = null;
      if (!((_a = userStore.user) == null ? void 0 : _a.id)) {
        throw new Error("Usuario no autenticado");
      }
      await loadLastCompletedConfiguration();
      const response = await IrrigationAPI.getActiveIrrigationConfigsByUser(userStore.user.id);
      let foundActiveConfig = false;
      if (response.success && response.data.length > 0) {
        const config = response.data[0];
        irrigationConfig.value = config;
        activeMode.value = config.mode_type;
        if (config.mode_type === "automatic") {
          disableTimeBasedCompletion.value = true;
        } else {
          disableTimeBasedCompletion.value = false;
        }
        foundActiveConfig = true;
        await loadSpecificConfiguration(config.id);
        await loadActivePumpActivation(config.id);
      }
      if (!foundActiveConfig) {
        console.log("\u{1F50D} No hay configuraci\xF3n activa, buscando configuraciones autom\xE1ticas preparadas o programadas pendientes...");
        try {
          const automaticStatusResponse = await IrrigationAPI.getAutomaticConfigStatus(userStore.user.id);
          if (automaticStatusResponse.success && automaticStatusResponse.data) {
            console.log("\u{1F916} Configuraci\xF3n autom\xE1tica preparada encontrada:", automaticStatusResponse.data);
            const automaticConfig = {
              id: automaticStatusResponse.data.config_id,
              mode_type: "automatic",
              is_active: automaticStatusResponse.data.is_active,
              crop_id: automaticStatusResponse.data.crop_id,
              user_id: userStore.user.id
            };
            irrigationConfig.value = automaticConfig;
            activeMode.value = "automatic";
            disableTimeBasedCompletion.value = true;
            foundActiveConfig = true;
            console.log("\u2705 Configuraci\xF3n autom\xE1tica preparada cargada en store - otros modos bloqueados");
          }
        } catch (automaticError) {
          console.log("\u2139\uFE0F No hay configuraci\xF3n autom\xE1tica preparada:", automaticError.message);
        }
        if (!foundActiveConfig) {
          try {
            const allConfigsResponse = await IrrigationAPI.getIrrigationConfigsByUser(userStore.user.id);
            if (allConfigsResponse.success && allConfigsResponse.data.length > 0) {
              console.log(`\u{1F50D} Encontradas ${allConfigsResponse.data.length} configuraciones para revisar`);
              for (const config of allConfigsResponse.data) {
                try {
                  const latestActivationResponse = await IrrigationAPI.getLatestPumpActivationByConfig(config.id);
                  if (latestActivationResponse.success && latestActivationResponse.data) {
                    const latestActivation = latestActivationResponse.data;
                    console.log(`\u{1F50D} Config ${config.id} - \xDAltima activaci\xF3n:`, latestActivation.status);
                    if (latestActivation.status === "programmed") {
                      console.log("\u2705 Encontrada configuraci\xF3n con activaci\xF3n programada pendiente:", {
                        configId: config.id,
                        modeType: config.mode_type,
                        activationStatus: latestActivation.status
                      });
                      irrigationConfig.value = config;
                      activeMode.value = config.mode_type;
                      activePumpActivation.value = latestActivation;
                      foundActiveConfig = true;
                      await loadSpecificConfiguration(config.id);
                      console.log("\u2705 Estado restaurado para configuraci\xF3n programada");
                      break;
                    }
                  }
                } catch (activationError) {
                  console.error(`Error obteniendo activaci\xF3n para config ${config.id}:`, activationError);
                }
              }
            }
          } catch (programmedError) {
            console.error("Error buscando configuraciones programadas:", programmedError);
          }
        }
      }
      if (!foundActiveConfig) {
        resetState();
      }
    } catch (err) {
      error.value = err.message;
      console.error("Error loading active configuration:", err);
    } finally {
      isLoading.value = false;
    }
  };
  const loadSpecificConfiguration = async (irrigationConfigId) => {
    var _a;
    try {
      const response = await IrrigationAPI.getSpecificConfig(irrigationConfigId);
      if (response.success) {
        specificConfig.value = response.data;
        if (activeMode.value === "programmed" && ((_a = specificConfig.value) == null ? void 0 : _a.next_execution)) {
          startNextExecutionCountdown();
        }
      }
    } catch (err) {
      console.error("Error loading specific configuration:", err);
    }
  };
  const loadActivePumpActivation = async (irrigationConfigId) => {
    try {
      const response = await IrrigationAPI.getActivePumpActivation(irrigationConfigId);
      if (response.success) {
        activePumpActivation.value = response.data;
        if (response.data.status === "active") {
          startStatusMonitoring();
        }
      }
    } catch (err) {
      activePumpActivation.value = null;
    }
  };
  const startManualIrrigation = async (config) => {
    var _a, _b;
    try {
      isLoading.value = true;
      error.value = null;
      console.log("\u{1F504} Iniciando riego manual con configuraci\xF3n:", config);
      if (!((_a = userStore.user) == null ? void 0 : _a.id)) {
        throw new Error("Usuario no autenticado");
      }
      if (!((_b = cropStore.currentCrop) == null ? void 0 : _b.id)) {
        throw new Error("No hay cultivo seleccionado");
      }
      const userId = userStore.user.id;
      const cropId = cropStore.currentCrop.id;
      console.log("\u{1F50D} Buscando configuraci\xF3n manual existente para usuario:", userId, "cultivo:", cropId);
      const existingConfigsResponse = await IrrigationAPI.getIrrigationConfigsByUserAndType(userId, "manual");
      let irrigationConfigId = null;
      if (existingConfigsResponse.success && existingConfigsResponse.data.length > 0) {
        const existingConfig = existingConfigsResponse.data.find((config2) => config2.crop_id === cropId);
        if (existingConfig) {
          console.log("\u2705 Configuraci\xF3n manual existente encontrada:", existingConfig.id);
          irrigationConfigId = existingConfig.id;
          console.log("\u2705 Usando configuraci\xF3n existente (integrada)");
        }
      }
      if (irrigationConfigId) {
        console.log("\u{1F504} Actualizando configuraci\xF3n manual existente");
        const updateResponse = await IrrigationAPI.updateManualConfig(irrigationConfigId, {
          duration_minutes: config.duration_minutes
        });
        if (!updateResponse.success) {
          throw new Error("Error actualizando configuraci\xF3n manual");
        }
        console.log("\u2705 Configuraci\xF3n manual actualizada");
      } else {
        console.log("\u{1F504} Creando nueva configuraci\xF3n manual");
        const irrigationResponse = await IrrigationAPI.createIrrigationConfig({
          user_id: userId,
          crop_id: cropId,
          mode_type: "manual",
          duration_minutes: config.duration_minutes,
          is_active: true
        });
        if (!irrigationResponse.success) {
          throw new Error("Error creando configuraci\xF3n de riego");
        }
        irrigationConfigId = irrigationResponse.data.id;
        console.log("\u2705 Nueva configuraci\xF3n de riego manual creada:", irrigationConfigId);
      }
      console.log("\u{1F504} Activando configuraci\xF3n de riego");
      const activateResponse = await IrrigationAPI.activateIrrigationConfig(irrigationConfigId);
      if (!activateResponse.success) {
        throw new Error("Error activando configuraci\xF3n de riego");
      }
      console.log("\u2705 Configuraci\xF3n de riego activada");
      console.log("\u{1F504} Creando activaci\xF3n de bomba");
      const pumpResponse = await IrrigationAPI.createPumpActivation({
        irrigation_config_id: irrigationConfigId,
        duration_minutes: config.duration_minutes,
        status: "active"
      });
      if (!pumpResponse.success) {
        throw new Error("Error creando activaci\xF3n de bomba");
      }
      console.log("\u2705 Activaci\xF3n de bomba creada:", pumpResponse.data.id);
      await loadActiveConfiguration();
      disableTimeBasedCompletion.value = false;
      startStatusMonitoring();
      autoCompletionTriggered.value = false;
      startTimeUpdates();
      console.log("\u2705 Riego manual iniciado exitosamente");
      return true;
    } catch (err) {
      error.value = err.message;
      console.error("\u274C Error en startManualIrrigation:", err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const startProgrammedIrrigation = async (config) => {
    try {
      isLoading.value = true;
      error.value = null;
      console.log("\u{1F680} Iniciando configuraci\xF3n de riego programado:", config);
      if (!config.user_id || !config.crop_id) {
        throw new Error("Usuario y cultivo son obligatorios");
      }
      const response = await IrrigationAPI.createProgrammedConfig(config);
      if (response.success) {
        console.log("\u2705 Configuraci\xF3n programada creada:", response.data);
        irrigationConfig.value = response.data.irrigationConfig;
        specificConfig.value = response.data.programmedConfig;
        activePumpActivation.value = response.data.pumpActivation;
        activeMode.value = "programmed";
        disableTimeBasedCompletion.value = false;
        const scheduledTime = new Date(config.start_datetime);
        const now = /* @__PURE__ */ new Date();
        const timeUntilActivation = scheduledTime - now;
        console.log("\u{1F50D} DEBUG: Comparaci\xF3n de fechas", {
          scheduledTime: scheduledTime.toISOString(),
          scheduledTimeLocal: scheduledTime.toLocaleString(),
          now: now.toISOString(),
          nowLocal: now.toLocaleString(),
          timeUntilActivation,
          timeUntilActivationMinutes: Math.round(timeUntilActivation / 1e3 / 60),
          config
        });
        if (timeUntilActivation > 0) {
          console.log(`\u23F0 Riego programado para: ${scheduledTime.toLocaleString()}`);
          console.log(`\u23F3 Tiempo hasta activaci\xF3n: ${Math.round(timeUntilActivation / 1e3 / 60)} minutos`);
          startProgrammedCountdown(timeUntilActivation);
        } else {
          console.log("\u26A0\uFE0F La fecha programada ya pas\xF3", {
            scheduledTime: scheduledTime.toLocaleString(),
            now: now.toLocaleString(),
            difference: timeUntilActivation
          });
        }
        console.log("\u2705 Estado local actualizado - NO llamando loadActiveConfiguration para evitar conflictos");
        return true;
      } else {
        throw new Error(response.message || "Error al crear configuraci\xF3n programada");
      }
    } catch (err) {
      error.value = err.message;
      console.error("\u274C Error iniciando riego programado:", err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const startProgrammedCountdown = (millisecondsUntilActivation) => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    countdownInterval = setInterval();
  };
  const startNextExecutionCountdown = () => {
    var _a;
    if (!((_a = specificConfig.value) == null ? void 0 : _a.next_execution)) {
      timeUntilNextExecution.value = null;
      return;
    }
    const updateNextCountdown = () => {
      var _a2;
      if (!((_a2 = specificConfig.value) == null ? void 0 : _a2.next_execution)) {
        timeUntilNextExecution.value = null;
        return;
      }
      const now = /* @__PURE__ */ new Date();
      const nextDate = new Date(specificConfig.value.next_execution);
      const timeLeft = nextDate - now;
      if (timeLeft <= 0) {
        timeUntilNextExecution.value = "Programado para activarse pronto";
      } else {
        const days = Math.floor(timeLeft / (1e3 * 60 * 60 * 24));
        const hours = Math.floor(timeLeft % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
        const minutes = Math.floor(timeLeft % (1e3 * 60 * 60) / (1e3 * 60));
        if (days > 0) {
          timeUntilNextExecution.value = `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
          timeUntilNextExecution.value = `${hours}h ${minutes}m`;
        } else {
          timeUntilNextExecution.value = `${minutes}m`;
        }
      }
    };
    updateNextCountdown();
    setInterval();
  };
  const updateLastExecution = async () => {
    var _a;
    try {
      console.log("\u{1F4DD} Actualizando traza de ejecuci\xF3n...");
      if (!((_a = specificConfig.value) == null ? void 0 : _a.id)) {
        console.log("\u274C No hay specificConfig para actualizar traza");
        return;
      }
      const now = /* @__PURE__ */ new Date();
      const updateData = {
        last_execution: now.toISOString()
      };
      const nextExecution = calculateNextExecution();
      if (nextExecution) {
        updateData.next_execution = nextExecution.toISOString();
        console.log(`\u{1F4C5} Pr\xF3xima ejecuci\xF3n calculada: ${nextExecution.toLocaleString()}`);
        const timeUntilNext = nextExecution - now;
        if (timeUntilNext > 0) {
          console.log("\u23F0 Programando pr\xF3ximo riego...");
          startProgrammedCountdown(timeUntilNext);
          startNextExecutionCountdown();
        }
      } else {
        updateData.next_execution = null;
        console.log("\u{1F51A} No hay m\xE1s ejecuciones programadas");
      }
      await IrrigationAPI.updateProgrammedExecution(specificConfig.value.id, updateData);
      console.log("\u2705 Traza actualizada en BD");
    } catch (err) {
      console.error("\u274C Error actualizando traza:", err);
    }
  };
  const calculateNextExecution = () => {
    if (!specificConfig.value) return null;
    const { frequency_type, custom_days, start_datetime } = specificConfig.value;
    const now = /* @__PURE__ */ new Date();
    const originalDate = new Date(start_datetime);
    switch (frequency_type) {
      case "once":
        return null;
      case "daily":
        const nextDaily = new Date(originalDate);
        nextDaily.setDate(nextDaily.getDate() + 1);
        return nextDaily;
      case "custom":
        if (!custom_days || custom_days.length === 0) return null;
        const currentDay = now.getDay() === 0 ? 7 : now.getDay();
        const remainingDays = custom_days.filter((day) => day !== currentDay);
        if (remainingDays.length === 0) {
          return null;
        }
        const nextDay = Math.min(...remainingDays);
        const daysUntilNext = nextDay > currentDay ? nextDay - currentDay : 7 - currentDay + nextDay;
        const nextCustom = new Date(originalDate);
        nextCustom.setDate(nextCustom.getDate() + daysUntilNext);
        updateCustomDaysArray(remainingDays);
        return nextCustom;
      default:
        return null;
    }
  };
  const updateCustomDaysArray = async (newCustomDays) => {
    var _a;
    try {
      if (!((_a = specificConfig.value) == null ? void 0 : _a.id)) return;
      specificConfig.value.custom_days = newCustomDays;
      console.log("\u{1F4C5} D\xEDas restantes:", newCustomDays);
    } catch (err) {
      console.error("\u274C Error actualizando custom_days:", err);
    }
  };
  const pauseIrrigation = async () => {
    var _a;
    try {
      if (!((_a = activePumpActivation.value) == null ? void 0 : _a.id)) {
        throw new Error("No hay riego activo para pausar");
      }
      const response = await IrrigationAPI.pausePumpActivation(activePumpActivation.value.id);
      if (response.success) {
        activePumpActivation.value = response.data;
        stopStatusMonitoring();
        console.log("\u2705 Riego pausado - la alerta se crear\xE1 autom\xE1ticamente en el backend");
        return true;
      }
    } catch (err) {
      error.value = err.message;
      return false;
    }
  };
  const resumeIrrigation = async () => {
    var _a;
    try {
      if (!((_a = activePumpActivation.value) == null ? void 0 : _a.id)) {
        throw new Error("No hay riego pausado para reanudar");
      }
      const response = await IrrigationAPI.resumePumpActivation(activePumpActivation.value.id);
      if (response.success) {
        activePumpActivation.value = response.data;
        startStatusMonitoring();
        console.log("\u2705 Riego reanudado - la alerta se crear\xE1 autom\xE1ticamente en el backend");
        return true;
      }
    } catch (err) {
      error.value = err.message;
      return false;
    }
  };
  const completeIrrigation = async () => {
    var _a, _b, _c, _d;
    try {
      if (!((_a = activePumpActivation.value) == null ? void 0 : _a.id)) {
        console.log("\u274C No hay activaci\xF3n de bomba activa para completar");
        return false;
      }
      console.log("\u{1F504} Completando riego...", {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        stack: new Error().stack
      });
      if (activePumpActivation.value.status === "completed") {
        console.log("\u26A0\uFE0F El riego ya est\xE1 completado, ignorando llamada duplicada");
        return true;
      }
      stopTimeUpdates();
      autoCompletionTriggered.value = false;
      const response = await IrrigationAPI.updatePumpActivationStatus(activePumpActivation.value.id, {
        status: "completed",
        ended_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (!response.success) {
        throw new Error("Error completando riego");
      }
      if ((_b = irrigationConfig.value) == null ? void 0 : _b.id) {
        await IrrigationAPI.updateLastIrrigation(irrigationConfig.value.id);
      }
      if (activeMode.value === "manual" && ((_c = irrigationConfig.value) == null ? void 0 : _c.id)) {
        console.log("\u{1F504} Desactivando configuraci\xF3n manual (riego completado)");
        const deactivateResponse = await IrrigationAPI.deactivateIrrigationConfig(irrigationConfig.value.id);
        if (!deactivateResponse.success) {
          console.error("\u274C Error desactivando configuraci\xF3n manual");
        } else {
          console.log("\u2705 Configuraci\xF3n manual desactivada");
        }
      } else if (activeMode.value === "programmed") {
        console.log("\u{1F504} Procesando finalizaci\xF3n de riego programado...");
        if ((_d = irrigationConfig.value) == null ? void 0 : _d.id) {
          await IrrigationAPI.deactivateIrrigationConfig(irrigationConfig.value.id);
          console.log("\u2705 Configuraci\xF3n programada desactivada temporalmente");
        }
        await updateLastExecution();
        console.log("\u2705 Pr\xF3xima ejecuci\xF3n programada");
      }
      console.log("\u2705 Riego completado - la alerta se crear\xE1 autom\xE1ticamente en el backend");
      resetState();
      stopStatusMonitoring();
      await loadActiveConfiguration();
      console.log("\u2705 Riego completado exitosamente");
      return true;
    } catch (err) {
      error.value = err.message;
      console.error("\u274C Error en completeIrrigation:", err);
      return false;
    }
  };
  const cancelActiveMode = async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
      isLoading.value = true;
      console.log("\u{1F504} Iniciando cancelaci\xF3n de modo activo...", activeMode.value);
      if (activeMode.value === "programmed") {
        console.log("\u{1F504} Cancelando modo programado...");
        if (countdownInterval) {
          clearInterval(countdownInterval);
          countdownInterval = null;
          console.log("\u2705 Countdown detenido");
        }
        const isActiveIrrigation = ((_a = activePumpActivation.value) == null ? void 0 : _a.status) === "active" || ((_b = activePumpActivation.value) == null ? void 0 : _b.status) === "paused";
        if (isActiveIrrigation) {
          console.log("\u{1F504} Cancelando SOLO riego activo (mantener configuraci\xF3n)");
          const response = await IrrigationAPI.cancelProgrammedIrrigation(irrigationConfig.value.id);
          if (!response.success) {
            throw new Error("Error al cancelar riego programado");
          }
          console.log("\u2705 Riego programado cancelado - la alerta se crear\xE1 autom\xE1ticamente en el backend");
          console.log("\u2705 Riego programado cancelado (configuraci\xF3n mantenida)");
        } else {
          console.log("\u{1F504} Cancelando configuraci\xF3n programada (SIN eliminar tupla)");
          if ((_c = irrigationConfig.value) == null ? void 0 : _c.id) {
            console.log("\u{1F504} Eliminando configuraci\xF3n programada espec\xEDfica");
            const deleteResponse = await IrrigationAPI.deleteProgrammedSettings(irrigationConfig.value.id);
            if (!deleteResponse.success) {
              throw new Error("Error al eliminar configuraci\xF3n programada");
            }
            console.log("\u2705 Configuraci\xF3n programada eliminada");
          }
          if ((_d = irrigationConfig.value) == null ? void 0 : _d.id) {
            console.log("\u{1F504} Desactivando configuraci\xF3n de riego");
            const response = await IrrigationAPI.deactivateIrrigationConfig(irrigationConfig.value.id);
            if (!response.success) {
              throw new Error("Error al desactivar configuraci\xF3n programada");
            }
            console.log("\u2705 Configuraci\xF3n programada desactivada (tupla irrigation_configs conservada)");
          }
        }
      } else {
        if (((_e = activePumpActivation.value) == null ? void 0 : _e.id) && (activePumpActivation.value.status === "active" || activePumpActivation.value.status === "paused")) {
          console.log("\u{1F504} Cancelando activaci\xF3n de bomba:", activePumpActivation.value.id);
          const pumpResponse = await IrrigationAPI.updatePumpActivationStatus(activePumpActivation.value.id, {
            status: "cancelled"
          });
          if (!pumpResponse.success) {
            throw new Error("Error cancelando activaci\xF3n de bomba");
          }
          console.log("\u2705 Activaci\xF3n de bomba cancelada");
          console.log("\u2705 Riego cancelado - la alerta se crear\xE1 autom\xE1ticamente en el backend");
          if ((_f = irrigationConfig.value) == null ? void 0 : _f.id) {
            console.log("\u{1F504} Actualizando last_irrigation_at (riego cancelado)");
            try {
              await IrrigationAPI.updateLastIrrigation(irrigationConfig.value.id);
              console.log("\u2705 last_irrigation_at actualizado");
            } catch (err) {
              console.error("\u274C Error actualizando last_irrigation_at:", err);
            }
          }
        }
        if ((_g = irrigationConfig.value) == null ? void 0 : _g.id) {
          console.log("\u{1F504} Desactivando configuraci\xF3n de riego:", irrigationConfig.value.id);
          const configResponse = await IrrigationAPI.deactivateIrrigationConfig(irrigationConfig.value.id);
          if (!configResponse.success) {
            throw new Error("Error desactivando configuraci\xF3n de riego");
          }
          console.log("\u2705 Configuraci\xF3n de riego desactivada");
        }
      }
      resetState();
      stopStatusMonitoring();
      await new Promise((resolve) => setTimeout(resolve, 300));
      await loadActiveConfiguration();
      if (activeMode.value !== null) {
        console.warn("\u26A0\uFE0F El estado no se limpi\xF3 correctamente, forzando limpieza manual");
        resetState();
      }
      console.log("\u2705 Modo activo cancelado exitosamente");
      return true;
    } catch (err) {
      error.value = err.message;
      console.error("\u274C Error en cancelActiveMode:", err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const startStatusMonitoring = () => {
    stopStatusMonitoring();
    statusInterval = setInterval();
  };
  const stopStatusMonitoring = () => {
    if (statusInterval) {
      clearInterval(statusInterval);
      statusInterval = null;
    }
  };
  const getModeDescription = () => {
    if (!activeMode.value || !specificConfig.value) return "";
    switch (activeMode.value) {
      case "manual":
        const duration = specificConfig.value.duration_minutes;
        const totalMinutes = Math.floor(duration || 0);
        const totalSeconds = Math.round((duration - totalMinutes) * 60);
        return `Duraci\xF3n: ${totalMinutes}min ${totalSeconds}seg`;
      case "programmed":
        if (specificConfig.value.start_datetime) {
          const scheduledDate = new Date(specificConfig.value.start_datetime);
          const now = /* @__PURE__ */ new Date();
          if (isWatering.value) {
            return `Duraci\xF3n: ${specificConfig.value.duration_minutes}min`;
          } else {
            const timeUntilActivation = scheduledDate - now;
            if (timeUntilActivation > 0) {
              const days = Math.floor(timeUntilActivation / (1e3 * 60 * 60 * 24));
              const hours = Math.floor(timeUntilActivation % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
              const minutes = Math.floor(timeUntilActivation % (1e3 * 60 * 60) / (1e3 * 60));
              if (days > 0) {
                return `Activa en ${days}d ${hours}h ${minutes}m`;
              } else if (hours > 0) {
                return `Activa en ${hours}h ${minutes}m`;
              } else {
                return `Activa en ${minutes}m`;
              }
            } else {
              return "Activ\xE1ndose...";
            }
          }
        }
        return "Programado para ejecutarse autom\xE1ticamente";
      case "automatic":
        return "Monitoreando sensores autom\xE1ticamente";
      default:
        return "";
    }
  };
  const resetState = () => {
    activeMode.value = null;
    irrigationConfig.value = null;
    specificConfig.value = null;
    activePumpActivation.value = null;
    lastCompletedConfig.value = null;
    error.value = null;
    autoCompletionTriggered.value = false;
    disableTimeBasedCompletion.value = false;
  };
  const cleanup = () => {
    stopStatusMonitoring();
    resetState();
  };
  return {
    // Estado
    activeMode,
    irrigationConfig,
    specificConfig,
    activePumpActivation,
    lastCompletedConfig,
    isLoading,
    error,
    // Computeds
    hasActiveMode,
    isManualActive,
    isAutomaticActive,
    isProgrammedActive,
    isWatering,
    isPaused,
    isCompleted,
    isProgrammedWaiting,
    remainingTime,
    lastIrrigation,
    canAccessMode,
    canAccessManualMode,
    canAccessAutomaticMode,
    canAccessProgrammedMode,
    timeUntilNextExecution,
    nextExecutionFormatted,
    // Actions
    loadActiveConfiguration,
    startManualIrrigation,
    startProgrammedIrrigation,
    pauseIrrigation,
    resumeIrrigation,
    completeIrrigation,
    cancelActiveMode,
    findManualConfigByUserAndCrop,
    getModeDescription,
    startTimeUpdates,
    stopTimeUpdates,
    cleanup
  };
});

export { IrrigationAPI as I, setInterval as s, useIrrigationStore as u };
//# sourceMappingURL=irrigation-EKMz8LaT.mjs.map
