export default defineNuxtRouteMiddleware(async (to, from) => {
  // Solo ejecutar en el cliente
  if (process.server) return

  const userStore = useUserStore()
  
  // Esperar a que el store esté inicializado
  if (!userStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }

  // Verificar si el usuario es admin usando el store
  if (!userStore.isAdmin) {
    console.log('❌ Admin middleware: Usuario sin permisos de admin')
    return navigateTo('/dashboard')
  }
  
  console.log('✅ Admin middleware: Acceso autorizado para admin')
}) 