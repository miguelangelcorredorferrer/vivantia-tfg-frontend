export default defineNuxtRouteMiddleware(async (to, from) => {
  // Solo ejecutar en el cliente para evitar problemas de SSR
  if (!process.client) {
    return
  }
  
  const userStore = useUserStore()
  
  console.log('🔄 Middleware auth: Verificando acceso a:', to.path)
  
  const savedToken = localStorage.getItem('AUTH_TOKEN')
  console.log('🔍 Middleware auth: localStorage token =', !!savedToken)
  console.log('🔍 Middleware auth: userStore.token =', !!userStore.token)
  console.log('🔍 Middleware auth: userStore.user =', !!userStore.user)
  
  // SIEMPRE inicializar si hay token guardado pero no en store
  if (savedToken && !userStore.token) {
    console.log('🔄 Middleware auth: Inicializando store con token guardado...')
    userStore.token = savedToken
    
    try {
      await userStore.getCurrentUser()
      console.log('✅ Middleware auth: Usuario inicializado:', userStore.user?.name)
    } catch (error) {
      console.error('❌ Middleware auth: Error inicializando usuario:', error)
      userStore.logout()
      // Después de limpiar token inválido, salir del middleware
      return navigateTo('/auth/login')
    }
  }
  
  // Si hay token en store pero no hay usuario, intentar obtenerlo
  if (userStore.token && !userStore.user) {
    console.log('🔄 Middleware auth: Token en store pero sin usuario, obteniendo datos...')
    try {
      await userStore.getCurrentUser()
      console.log('✅ Middleware auth: Usuario obtenido:', userStore.user?.name)
    } catch (error) {
      console.error('❌ Middleware auth: Error obteniendo usuario:', error)
      userStore.logout()
      return navigateTo('/auth/login')
    }
  }
  
  // Solo verificar si NO hay token en absoluto (ni en store ni en localStorage)  
  if (!userStore.token && !savedToken) {
    console.log('❌ Middleware auth: No hay token, redirigiendo al login')
    return navigateTo('/auth/login')
  }
  
  // Si hay token pero aún no hay usuario (inicializándose), permitir acceso temporalmente
  if (userStore.token && !userStore.user) {
    console.log('⏳ Middleware auth: Token existe, usuario inicializándose...')
    return // Permitir acceso mientras se inicializa
  }
  
  // Si el usuario está autenticado pero no verificado
  if (userStore.user && !userStore.user.verified) {
    console.log('❌ Middleware auth: Cuenta no verificada')
    return navigateTo('/auth/verify-email')
  }
  
  // Si no está autenticado después de la inicialización
  if (!userStore.isAuthenticated) {
    console.log('❌ Middleware auth: Usuario no autenticado')
    return navigateTo('/auth/login')
  }
  
  console.log('✅ Middleware auth: Acceso permitido')
}) 