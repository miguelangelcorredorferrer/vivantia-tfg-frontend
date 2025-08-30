import { h as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import 'vue';
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
import 'pinia';
import 'vue-router';
import '@iconify/vue';
import 'vue/server-renderer';

const _public = defineNuxtRouteMiddleware((to, from) => {
  var _a;
  const userStore = useUserStore();
  if (userStore.isAuthenticated && ((_a = userStore.user) == null ? void 0 : _a.emailVerified)) {
    return navigateTo("/dashboard");
  }
});

export { _public as default };
//# sourceMappingURL=public-RjgfCwVf.mjs.map
