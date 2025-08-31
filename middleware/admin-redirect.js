export default defineNuxtRouteMiddleware(async (to, from) => {
  // Solo ejecutar en el cliente
  if (process.server) return

  const userStore = useUserStore()
  
  // Solo aplicar si estamos intentando acceder al dashboard
  if (to.path !== '/dashboard') return
  
  // Si está en modo demo, no redirigir
  if (userStore.isDemoMode) {
    console.log('🎭 Admin redirect: Modo demo activo, no redirigir')
    return
  }
  
  // Si el usuario está autenticado y es admin, redirigir a gestión de usuarios
  if (userStore.isAuthenticated && userStore.isAdmin) {
    console.log('🔄 Admin redirect: Redirigiendo admin del dashboard a gestión de usuarios')
    return navigateTo('/admin/usuarios')
  }
}) 