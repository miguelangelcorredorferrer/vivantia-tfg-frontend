import { h as defineNuxtRouteMiddleware } from './server.mjs';
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

const adminRedirect = defineNuxtRouteMiddleware(async (to, from) => {
  return;
});

export { adminRedirect as default };
//# sourceMappingURL=admin-redirect-DpGLCYtx.mjs.map
