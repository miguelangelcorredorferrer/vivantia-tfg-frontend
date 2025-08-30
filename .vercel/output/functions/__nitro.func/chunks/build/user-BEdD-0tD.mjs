import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { b as useRuntimeConfig } from './server.mjs';

const getApiUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiUrl || "http://localhost:3001/api";
};
const getAuthHeaders = () => {
  return {};
};
const AuthAPI = {
  register(data) {
    return $fetch("/auth/register", {
      method: "POST",
      body: data,
      baseURL: getApiUrl()
    });
  },
  login(data) {
    return $fetch("/auth/login", {
      method: "POST",
      body: data,
      baseURL: getApiUrl()
    });
  },
  forgotPassword(data) {
    return $fetch("/auth/forgot-password", {
      method: "POST",
      body: data,
      baseURL: getApiUrl()
    });
  },
  verifyPasswordResetToken(token) {
    return $fetch(`/auth/verify-token/${token}`, {
      method: "GET",
      baseURL: getApiUrl()
    });
  },
  updatePassword(token, data) {
    return $fetch(`/auth/update-password/${token}`, {
      method: "PUT",
      body: data,
      baseURL: getApiUrl()
    });
  },
  changePassword(data) {
    return $fetch("/auth/change-password", {
      method: "PUT",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  verifyAccount(token) {
    return $fetch(`/auth/verify/${token}`, {
      method: "GET",
      baseURL: getApiUrl()
    });
  },
  getUser() {
    return $fetch("/auth/user", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getAdmin() {
    return $fetch("/auth/admin", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  logout() {
    return $fetch("/auth/logout", {
      method: "POST",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  }
};
const demoData = {
  user: {
    id: "demo-user",
    name: "Usuario Demo",
    email: "demo@vivantia.com",
    role: "visitante",
    verified: false,
    isDemo: true
  },
  device: {
    id: "demo-device-1",
    deviceName: "Arduino IoT Demo",
    enddeviceId: "DEMO001",
    appEui: "1234567890ABCDEF",
    devEui: "FEDCBA0987654321",
    appKey: "1234567890ABCDEF1234567890ABCDEF",
    isActiveCommunication: true,
    ttnRegion: "eu1",
    ttnAppId: "demo-vivantia-app",
    ttnAccessKey: "DEMO_ACCESS_KEY_1234567890",
    createdAt: "2024-01-15T10:30:00Z"
  },
  crop: {
    id: "demo-crop-1",
    name: "Tomates Cherry Demo",
    description: "Cultivo de demostraci\xF3n para el sistema de riego autom\xE1tico",
    category: "Hortalizas",
    growth_days: 75,
    soil_humidity_min: 40,
    soil_humidity_max: 80,
    air_humidity_min: 50,
    air_humidity_max: 85,
    temperature_max: 28,
    session: "Primavera",
    selected: true,
    createdAt: "2024-01-10T08:00:00Z"
  },
  sensorData: {
    current: {
      soilHumidity: 68.3,
      temperature: 19.5,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    },
    // Datos históricos para gráficas
    history: generateDemoHistory()
  }
};
function generateDemoHistory() {
  const data = [];
  const now = /* @__PURE__ */ new Date();
  for (let i = 0; i < 32; i++) {
    const minutes = 14 + Math.floor(i / 2);
    const seconds = i % 2 * 30;
    const timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, minutes, seconds);
    const baseTemperature = 19.5;
    const temperatureVariation = Math.sin(i * 0.2) * 2 + Math.random() * 1 - 0.5;
    const temperature = Math.max(18, Math.min(22, baseTemperature + temperatureVariation));
    const baseSoilHumidity = 68.3;
    const soilHumidityVariation = Math.sin(i * 0.3) * 3 + Math.random() * 1 - 0.5;
    const soilHumidity = Math.max(65, Math.min(72, baseSoilHumidity + soilHumidityVariation));
    const baseAirHumidity = 75;
    const airHumidityVariation = Math.sin(i * 0.25) * 4 + Math.random() * 1 - 0.5;
    const airHumidity = Math.max(70, Math.min(80, baseAirHumidity + airHumidityVariation));
    data.push({
      time: timestamp.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      soilHumidity: parseFloat(soilHumidity.toFixed(1)),
      airHumidity: parseFloat(airHumidity.toFixed(1)),
      temperature: parseFloat(temperature.toFixed(1))
    });
  }
  return data;
}
const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const token = ref(null);
  const isLoading = ref(false);
  const isDemoMode = ref(false);
  const isAuthenticated = computed(() => {
    {
      return false;
    }
  });
  const userName = computed(() => {
    var _a;
    if (isDemoMode.value) {
      return demoData.user.name;
    }
    return ((_a = user.value) == null ? void 0 : _a.name) || "";
  });
  const userEmail = computed(() => {
    var _a;
    if (isDemoMode.value) {
      return demoData.user.email;
    }
    return ((_a = user.value) == null ? void 0 : _a.email) || "";
  });
  const isEmailVerified = computed(() => {
    var _a;
    if (isDemoMode.value) {
      return false;
    }
    return ((_a = user.value) == null ? void 0 : _a.emailVerified) || false;
  });
  const isAdmin = computed(() => {
    var _a;
    if (isDemoMode.value) {
      return false;
    }
    return ((_a = user.value) == null ? void 0 : _a.role) === "admin";
  });
  const login = async (credentials) => {
    try {
      isLoading.value = true;
      console.log("\u{1F504} Store: Realizando petici\xF3n de login...");
      const data = await AuthAPI.login(credentials);
      console.log("\u2705 Store: Login API exitoso:", data);
      token.value = data.token;
      if (false) ;
      console.log("\u2705 Store: Token guardado");
      console.log("\u{1F504} Store: Obteniendo datos del usuario...");
      await getCurrentUser();
      console.log("\u2705 Store: Datos del usuario obtenidos:", user.value);
      return { success: true, data };
    } catch (error) {
      console.error("\u274C Store: Error en login:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const register = async (userData) => {
    try {
      isLoading.value = true;
      const data = await AuthAPI.register(userData);
      return { success: true, ...data };
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const getCurrentUser = async () => {
    var _a;
    try {
      if (!token.value) {
        console.log("\u26A0\uFE0F Store: No hay token, saltando getCurrentUser");
        return;
      }
      console.log("\u{1F504} Store: Llamando a AuthAPI.getUser...");
      const data = await AuthAPI.getUser();
      console.log("\u2705 Store: AuthAPI.getUser exitoso:", data);
      user.value = data.user || data;
      console.log("\u2705 Store: Usuario asignado:", user.value);
      return { success: true, data };
    } catch (error) {
      console.error("\u274C Store: Error obteniendo usuario:", error);
      console.error("\u274C Store: Error details:", (_a = error.response) == null ? void 0 : _a.data);
      logout();
      throw error;
    }
  };
  const logout = async () => {
    try {
      if (!isDemoMode.value && token.value) {
        await AuthAPI.logout();
      }
    } catch (error) {
      console.warn("Error al llamar endpoint de logout:", error);
    } finally {
      user.value = null;
      token.value = null;
      isDemoMode.value = false;
    }
  };
  const forgotPassword = async (email) => {
    try {
      isLoading.value = true;
      const data = await AuthAPI.forgotPassword({ email });
      return { success: true, ...data };
    } catch (error) {
      console.error("Error en forgot password:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const verifyPasswordResetToken = async (token2) => {
    try {
      const data = await AuthAPI.verifyPasswordResetToken(token2);
      return { success: true, ...data };
    } catch (error) {
      console.error("Error verificando token:", error);
      throw error;
    }
  };
  const updatePassword = async (token2, password) => {
    try {
      isLoading.value = true;
      const data = await AuthAPI.updatePassword(token2, { password });
      return { success: true, ...data };
    } catch (error) {
      console.error("Error actualizando password:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const verifyAccount = async (token2) => {
    try {
      const data = await AuthAPI.verifyAccount(token2);
      return { success: true, ...data };
    } catch (error) {
      console.error("Error verificando cuenta:", error);
      throw error;
    }
  };
  const changePassword = async (passwordData) => {
    try {
      isLoading.value = true;
      const data = await AuthAPI.changePassword(passwordData);
      return { success: true, ...data };
    } catch (error) {
      console.error("Error cambiando password:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const enterDemoMode = () => {
    console.log("\u{1F3AD} Store: Activando modo demo");
    console.log("\u{1F50D} Store: Estado antes del demo:", {
      isDemoMode: isDemoMode.value,
      user: user.value,
      token: token.value
    });
    isDemoMode.value = true;
    user.value = { ...demoData.user };
    token.value = null;
    console.log("\u{1F50D} Store: Estado despu\xE9s del demo:", {
      isDemoMode: isDemoMode.value,
      user: user.value,
      token: token.value,
      isAuthenticated: isAuthenticated.value
    });
    console.log("\u2705 Store: Modo demo activado");
  };
  const exitDemoMode = () => {
    console.log("\u{1F3AD} Store: Saliendo del modo demo");
    isDemoMode.value = false;
    user.value = null;
    console.log("\u2705 Store: Modo demo desactivado");
  };
  const init = async () => {
    if (token.value && false) ;
  };
  return {
    // Estado
    user,
    token,
    isLoading,
    isDemoMode,
    // Getters
    isAuthenticated,
    userName,
    userEmail,
    isEmailVerified,
    isAdmin,
    // Actions
    login,
    register,
    getCurrentUser,
    logout,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword,
    verifyAccount,
    changePassword,
    enterDemoMode,
    exitDemoMode,
    init
  };
});

export { demoData as d, useUserStore as u };
//# sourceMappingURL=user-BEdD-0tD.mjs.map
