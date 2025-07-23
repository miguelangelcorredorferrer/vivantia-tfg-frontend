export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  
  // Si el usuario está autenticado y verificado, redirigir al dashboard
  if (userStore.isAuthenticated && userStore.user?.emailVerified) {
    return navigateTo('/dashboard')
  }
}) 