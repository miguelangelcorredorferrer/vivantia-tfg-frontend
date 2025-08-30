import { ref, mergeProps, unref, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { U as UserAPI } from './UserAPI-Cd4tUvk3.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { n as navigateTo } from './server.mjs';
import 'pinia';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'vue-router';
import '@iconify/vue';

const _sfc_main$5 = {
  __name: "UserInfo",
  __ssrInlineRender: true,
  props: {
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800 rounded-lg p-6 border border-gray-700" }, _attrs))}><div class="flex items-center space-x-4 mb-6"><div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center"><span class="text-white font-bold text-2xl">${ssrInterpolate(((_b = (_a = __props.userName) == null ? void 0 : _a.charAt(0)) == null ? void 0 : _b.toUpperCase()) || "U")}</span></div><div><h2 class="text-xl font-semibold text-white">${ssrInterpolate(__props.userName)}</h2><p class="text-gray-400">${ssrInterpolate(__props.userEmail)}</p><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Cuenta verificada </span></div></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Profile/UserInfo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "NameEditor",
  __ssrInlineRender: true,
  props: {
    currentName: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["save-name", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isEditing = ref(false);
    const nameForm = reactive({
      name: props.currentName || ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800 rounded-lg p-6 border border-gray-700" }, _attrs))}><h3 class="text-lg font-semibold text-white mb-4">Nombre de perfil</h3>`);
      if (!isEditing.value) {
        _push(`<div class="flex items-center justify-between"><div><p class="text-white font-medium">${ssrInterpolate(__props.currentName)}</p><p class="text-gray-400 text-sm">Este es tu nombre de visualizaci\xF3n en la aplicaci\xF3n</p></div><button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"> Cambiar nombre </button></div>`);
      } else {
        _push(`<div class="space-y-4"><div><label class="block text-sm font-medium text-white mb-2">Nuevo nombre</label><input${ssrRenderAttr("value", nameForm.name)} type="text" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tu nuevo nombre"></div><div class="flex space-x-3"><button${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors">${ssrInterpolate(__props.isLoading ? "Guardando..." : "Guardar")}</button><button class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"> Cancelar </button></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Profile/NameEditor.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "PasswordEditor",
  __ssrInlineRender: true,
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["save-password", "cancel"],
  setup(__props, { emit: __emit }) {
    const isEditing = ref(false);
    const passwordForm = reactive({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800 rounded-lg p-6 border border-gray-700" }, _attrs))}><h3 class="text-lg font-semibold text-white mb-4">Contrase\xF1a</h3>`);
      if (!isEditing.value) {
        _push(`<div class="flex items-center justify-between"><div><p class="text-white font-medium">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</p><p class="text-gray-400 text-sm">\xDAltima actualizaci\xF3n hace tiempo</p></div><button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"> Cambiar contrase\xF1a </button></div>`);
      } else {
        _push(`<div class="space-y-4"><div><label class="block text-sm font-medium text-white mb-2">Contrase\xF1a actual</label><input${ssrRenderAttr("value", passwordForm.currentPassword)} type="password" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tu contrase\xF1a actual"></div><div><label class="block text-sm font-medium text-white mb-2">Nueva contrase\xF1a</label><input${ssrRenderAttr("value", passwordForm.newPassword)} type="password" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tu nueva contrase\xF1a"></div><div><label class="block text-sm font-medium text-white mb-2">Confirmar nueva contrase\xF1a</label><input${ssrRenderAttr("value", passwordForm.confirmPassword)} type="password" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirma tu nueva contrase\xF1a"></div><div class="flex space-x-3"><button${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors">${ssrInterpolate(__props.isLoading ? "Guardando..." : "Actualizar contrase\xF1a")}</button><button class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"> Cancelar </button></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Profile/PasswordEditor.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "AccountActions",
  __ssrInlineRender: true,
  emits: ["logout", "confirm-delete"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800 rounded-lg p-6 border border-gray-700" }, _attrs))}><h3 class="text-lg font-semibold text-white mb-4">Acciones de cuenta</h3><div class="space-y-4"><div class="flex items-center justify-between p-4 bg-gray-700 rounded-lg"><div><p class="text-white font-medium">Cerrar sesi\xF3n</p><p class="text-gray-400 text-sm">Salir de tu cuenta en este dispositivo</p></div><button class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"> Cerrar sesi\xF3n </button></div><div class="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg"><div><p class="text-red-400 font-medium">Eliminar cuenta</p><p class="text-gray-400 text-sm">Esta acci\xF3n es irreversible y eliminar\xE1 todos tus datos</p></div><button class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"> Eliminar cuenta </button></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Profile/AccountActions.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DeleteAccountModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["delete-account", "cancel"],
  setup(__props, { emit: __emit }) {
    const deleteForm = reactive({
      confirmText: "",
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" }, _attrs))}><div class="bg-gray-800 rounded-lg p-6 w-full max-w-md"><div class="text-center mb-6"><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h3 class="text-lg font-semibold text-white mb-2">\xBFEliminar cuenta?</h3><p class="text-gray-400 text-sm">Esta acci\xF3n es irreversible. Todos tus datos, dispositivos y configuraciones se perder\xE1n permanentemente.</p></div><div class="space-y-4"><div><label class="block text-sm font-medium text-white mb-2"> Escribe &quot;ELIMINAR&quot; para confirmar </label><input${ssrRenderAttr("value", deleteForm.confirmText)} type="text" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="ELIMINAR"></div><div><label class="block text-sm font-medium text-white mb-2">Confirma tu contrase\xF1a</label><input${ssrRenderAttr("value", deleteForm.password)} type="password" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Tu contrase\xF1a actual"></div></div><div class="flex space-x-3 mt-6"><button${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors">${ssrInterpolate(__props.isLoading ? "Eliminando..." : "Eliminar definitivamente")}</button><button class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"> Cancelar </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Profile/DeleteAccountModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "perfil",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const { showToast } = useToastNotifications();
    const showDeleteConfirm = ref(false);
    const isLoading = ref(false);
    const handleSaveName = async (newName) => {
      if (!newName.trim()) {
        showToast("El nombre no puede estar vac\xEDo", "error");
        return;
      }
      isLoading.value = true;
      try {
        console.log("Cambiar nombre a:", newName);
        showToast("Nombre actualizado exitosamente", "success");
      } catch (error) {
        console.error("Error actualizando nombre:", error);
        showToast(error.message || "Error al actualizar nombre", "error");
      } finally {
        isLoading.value = false;
      }
    };
    const handleSavePassword = async (passwordData) => {
      if (!passwordData.currentPassword || !passwordData.newPassword) {
        showToast("Todos los campos son obligatorios", "error");
        return;
      }
      if (passwordData.newPassword.length < 6) {
        showToast("La nueva contrase\xF1a debe tener al menos 6 caracteres", "error");
        return;
      }
      isLoading.value = true;
      try {
        await userStore.changePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        });
        showToast("Contrase\xF1a actualizada exitosamente", "success");
      } catch (error) {
        console.error("Error actualizando contrase\xF1a:", error);
        showToast(error.message || "Error al actualizar contrase\xF1a", "error");
      } finally {
        isLoading.value = false;
      }
    };
    const handleLogout = async () => {
      await userStore.logout();
      navigateTo("/auth/login");
    };
    const handleConfirmDelete = () => {
      showDeleteConfirm.value = true;
    };
    const handleCancelDelete = () => {
      showDeleteConfirm.value = false;
    };
    const handleDeleteAccount = async (deleteData) => {
      if (deleteData.confirmText !== "ELIMINAR") {
        showToast('Debes escribir "ELIMINAR" para confirmar', "error");
        return;
      }
      if (!deleteData.password) {
        showToast("Debes introducir tu contrase\xF1a", "error");
        return;
      }
      isLoading.value = true;
      try {
        const response = await UserAPI.deleteOwnAccount(deleteData.password);
        if (response.success) {
          showDeleteConfirm.value = false;
          showToast("Cuenta eliminada exitosamente", "success");
          userStore.logout();
          if (false) ;
          setTimeout(async () => {
            await navigateTo("/auth/register", { replace: true });
          }, 1500);
        } else {
          showToast(response.message || "Error al eliminar cuenta", "error");
        }
      } catch (error) {
        console.error("Error eliminando cuenta:", error);
        if (error.status === 401) {
          showToast("Contrase\xF1a incorrecta", "error");
        } else if (error.status === 404) {
          showToast("Usuario no encontrado", "error");
        } else {
          showToast(error.message || "Error al eliminar cuenta", "error");
        }
      } finally {
        isLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="mb-8"><h1 class="text-3xl font-bold text-white">Perfil de Usuario</h1><p class="text-gray-400 mt-2">Gestiona tu cuenta y configuraci\xF3n personal</p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        "user-name": unref(userStore).userName,
        "user-email": unref(userStore).userEmail
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        "current-name": unref(userStore).userName,
        "is-loading": isLoading.value,
        onSaveName: handleSaveName,
        onCancel: () => {
        }
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        "is-loading": isLoading.value,
        onSavePassword: handleSavePassword,
        onCancel: () => {
        }
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        onLogout: handleLogout,
        onConfirmDelete: handleConfirmDelete
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        show: showDeleteConfirm.value,
        "is-loading": isLoading.value,
        onDeleteAccount: handleDeleteAccount,
        onCancel: handleCancelDelete
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/perfil.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=perfil-BnYCjCLe.mjs.map
