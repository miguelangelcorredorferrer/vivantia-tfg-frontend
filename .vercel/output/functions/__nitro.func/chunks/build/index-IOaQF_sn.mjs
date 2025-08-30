import { mergeProps, unref, ref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAdminStore } from './admin-B92VYRsh.mjs';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { _ as _sfc_main$3 } from './DeleteConfirmModal-w-LSssTG.mjs';
import 'pinia';
import './UserAPI-Cd4tUvk3.mjs';
import './server.mjs';
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
import './CropAPI-Cg4msNVy.mjs';
import './DeviceAPI-r0WuORwH.mjs';

const _sfc_main$2 = {
  __name: "UsersFilter",
  __ssrInlineRender: true,
  props: {
    nameFilter: {
      type: String,
      default: ""
    },
    emailFilter: {
      type: String,
      default: ""
    }
  },
  emits: ["filter-change", "clear-filters"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localNameFilter = ref(props.nameFilter);
    const localEmailFilter = ref(props.emailFilter);
    watch(localNameFilter, (newValue) => {
      emit("filter-change", { name: newValue, email: localEmailFilter.value });
    });
    watch(localEmailFilter, (newValue) => {
      emit("filter-change", { name: localNameFilter.value, email: newValue });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800/50 border border-gray-600/30 rounded-lg p-6 mb-6" }, _attrs))}><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-white">Filtros de B\xFAsqueda</h3><button class="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"> Limpiar Filtros </button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="name-filter" class="block text-sm font-medium text-gray-300 mb-2"> Buscar por nombre </label><input id="name-filter"${ssrRenderAttr("value", localNameFilter.value)} type="text" placeholder="Escribe el nombre del usuario..." class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label for="email-filter" class="block text-sm font-medium text-gray-300 mb-2"> Buscar por email </label><input id="email-filter"${ssrRenderAttr("value", localEmailFilter.value)} type="email" placeholder="Escribe el email del usuario..." class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Admin/Users/UsersFilter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "UsersTable",
  __ssrInlineRender: true,
  props: {
    users: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["delete-user"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { toast } = useToastNotifications();
    const showDeleteModal = ref(false);
    const userToDelete = ref(null);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getRoleBadgeClass = (role) => {
      switch (role) {
        case "admin":
          return "bg-red-500/20 text-red-400 border-red-500/30";
        case "usuario":
          return "bg-blue-500/20 text-blue-400 border-blue-500/30";
        case "visitante":
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        default:
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      }
    };
    const getRoleLabel = (role) => {
      switch (role) {
        case "admin":
          return "Administrador";
        case "usuario":
          return "Usuario";
        case "visitante":
          return "Visitante";
        default:
          return role;
      }
    };
    const getVerificationStatus = (verified) => {
      return verified ? {
        label: "Verificado",
        class: "bg-green-500/20 text-green-400 border-green-500/30"
      } : {
        label: "No verificado",
        class: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      };
    };
    const confirmDelete = async () => {
      try {
        await emit("delete-user", userToDelete.value.id);
        toast.success("Usuario eliminado exitosamente");
      } catch (error) {
        toast.error("Error al eliminar usuario");
      } finally {
        showDeleteModal.value = false;
        userToDelete.value = null;
      }
    };
    const cancelDelete = () => {
      showDeleteModal.value = false;
      userToDelete.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[--><div class="bg-gray-800/50 border border-gray-600/30 rounded-lg overflow-hidden"><div class="px-6 py-4 border-b border-gray-600/30"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-white">Usuarios Disponibles</h3><p class="text-sm text-gray-400 mt-1">${ssrInterpolate(__props.users.length)} usuario${ssrInterpolate(__props.users.length !== 1 ? "s" : "")} encontrado${ssrInterpolate(__props.users.length !== 1 ? "s" : "")}</p></div><button class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> A\xF1adir Usuario </button></div></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-700/50"><tr><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Nombre </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Email </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Fecha de Creaci\xF3n </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Estado </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Rol </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Acciones </th></tr></thead><tbody class="divide-y divide-gray-600/30">`);
      if (__props.isLoading) {
        _push(`<tr><td colspan="6" class="px-6 py-8 text-center"><div class="flex items-center justify-center space-x-2"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div><span class="text-gray-400">Cargando usuarios...</span></div></td></tr>`);
      } else if (__props.users.length === 0) {
        _push(`<tr><td colspan="6" class="px-6 py-8 text-center"><div class="text-gray-400"><svg class="w-12 h-12 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg><p class="text-lg font-medium">No se encontraron usuarios</p><p class="text-sm">Intenta ajustar los filtros de b\xFAsqueda</p></div></td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(__props.users, (user) => {
          _push(`<tr class="hover:bg-gray-700/30 transition-colors"><td class="px-6 py-4 whitespace-nowrap text-center"><div class="flex flex-col items-center"><div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2"><span class="text-white text-sm font-semibold">${ssrInterpolate(user.name.charAt(0).toUpperCase())}</span></div><div class="text-center"><div class="text-sm font-medium text-white">${ssrInterpolate(user.name)}</div><div class="text-xs text-gray-400">ID: ${ssrInterpolate(user.id)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-white">${ssrInterpolate(user.email)}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-gray-300">${ssrInterpolate(formatDate(user.created_at))}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><span class="${ssrRenderClass([getVerificationStatus(user.verified).class, "inline-flex px-2 py-1 text-xs font-semibold rounded-full border"])}">${ssrInterpolate(getVerificationStatus(user.verified).label)}</span></td><td class="px-6 py-4 whitespace-nowrap text-center"><span class="${ssrRenderClass([getRoleBadgeClass(user.role), "inline-flex px-2 py-1 text-xs font-semibold rounded-full border"])}">${ssrInterpolate(getRoleLabel(user.role))}</span></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="flex items-center justify-center space-x-2"><button class="inline-flex items-center px-2 py-1 text-yellow-400 border border-yellow-400 rounded-md hover:bg-yellow-400/10 transition-colors" title="Editar usuario"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg><span class="text-xs font-medium">Editar</span></button><button class="inline-flex items-center px-2 py-1 text-red-400 border border-red-400 rounded-md hover:bg-red-400/10 transition-colors"${ssrIncludeBooleanAttr(user.role === "admin") ? " disabled" : ""}${ssrRenderAttr("title", user.role === "admin" ? "No se puede eliminar un administrador" : "Eliminar usuario")}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg><span class="text-xs font-medium">Eliminar</span></button></div></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "is-open": unref(showDeleteModal),
        title: "Eliminar Usuario",
        message: "\xBFEst\xE1s seguro de que quieres eliminar este usuario?",
        "item-name": (_a = unref(userToDelete)) == null ? void 0 : _a.name,
        "item-type": "usuario",
        onConfirm: confirmDelete,
        onCancel: cancelDelete
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Admin/Users/UsersTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const adminStore = useAdminStore();
    const { toast } = useToastNotifications();
    const handleFilterChange = (filters) => {
      adminStore.updateFilters(filters.name, filters.email);
    };
    const handleClearFilters = () => {
      adminStore.clearFilters();
    };
    const handleDeleteUser = async (userId) => {
      try {
        await adminStore.deleteUser(userId);
      } catch (error) {
        toast.error("Error al eliminar usuario");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="mb-8"><div class="flex items-center space-x-3 mb-2"><div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg></div><div><h1 class="text-3xl font-bold text-white">Panel de Administraci\xF3n</h1><p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p></div></div><div class="mt-4"><h2 class="text-xl font-semibold text-white">Gesti\xF3n de Usuarios</h2><p class="text-gray-400 mt-1">Administraci\xF3n y control de usuarios del sistema</p></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"><div class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-6"><div class="flex items-center"><div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg></div><div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(adminStore).totalUsers)}</p><p class="text-sm text-blue-300">Total de Usuarios</p></div></div></div><div class="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-6"><div class="flex items-center"><div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(adminStore).filteredUsersCount)}</p><p class="text-sm text-green-300">Usuarios Filtrados</p></div></div></div><div class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-6"><div class="flex items-center"><div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg></div><div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(adminStore).users.filter((u) => u.role === "admin").length)}</p><p class="text-sm text-purple-300">Administradores</p></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "name-filter": unref(adminStore).nameFilter,
        "email-filter": unref(adminStore).emailFilter,
        onFilterChange: handleFilterChange,
        onClearFilters: handleClearFilters
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        users: unref(adminStore).filteredUsers,
        "is-loading": unref(adminStore).isLoading,
        onDeleteUser: handleDeleteUser
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/usuarios/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-IOaQF_sn.mjs.map
