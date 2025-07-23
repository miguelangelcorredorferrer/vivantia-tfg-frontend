export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  
  console.log('🔄 Middleware auth: Verificando acceso a:', to.path)
  console.log('🔍 Middleware auth: Token:', !!userStore.token)
  console.log('🔍 Middleware auth: Usuario:', userStore.user)
  console.log('🔍 Middleware auth: isAuthenticated:', userStore.isAuthenticated)
  
  // Esperar a que el store esté inicializado
  if (process.client && !userStore.token && !localStorage.getItem('AUTH_TOKEN')) {
    console.log('❌ Middleware auth: No hay token, redirigiendo al login')
    return navigateTo('/auth/login')
  }
  
  // Si el usuario no está autenticado, redirigir al login
  if (!userStore.isAuthenticated) {
    console.log('❌ Middleware auth: Usuario no autenticado, redirigiendo al login')
    return navigateTo('/auth/login')
  }
  
  // Si el usuario está autenticado pero no tiene cuenta verificada
  if (userStore.user && !userStore.user.verified) {
    console.log('❌ Middleware auth: Cuenta no verificada, redirigiendo a verificación')
    return navigateTo('/auth/verify-email')
  }
  
  console.log('✅ Middleware auth: Acceso permitido a:', to.path)
  
  // Si el usuario está en páginas de auth pero ya está autenticado, redirigir al dashboard
  if (to.path.startsWith('/auth/') && userStore.isAuthenticated && userStore.user?.verified) {
    console.log('🔄 Middleware auth: Usuario autenticado en página de auth, redirigiendo al dashboard')
    return navigateTo('/dashboard')
  }
}) 