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

const visitorBlock = defineNuxtRouteMiddleware((to, from) => {
  return;
});

export { visitorBlock as default };
//# sourceMappingURL=visitor-block-D6PyAUWM.mjs.map
