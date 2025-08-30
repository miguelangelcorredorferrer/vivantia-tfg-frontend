 export default defineNuxtRouteMiddleware((to) => {
  // Interceptar peticiones a builds/meta
  if (to.path.startsWith('/_nuxt/builds/meta/')) {
    // Redirigir a la página principal en lugar de mostrar 404
    return navigateTo('/')
  }
}) 