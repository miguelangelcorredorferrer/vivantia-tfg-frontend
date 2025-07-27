export default defineNuxtRouteMiddleware(async (to, from) => {
  // Solo ejecutar en el cliente para evitar problemas de SSR
  if (!process.client) {
    return
  }
  
  const userStore = useUserStore()
  
  console.log('🔄 Middleware auth: Verificando acceso a:', to.path)
  
  // Verificar si está en modo demo PRIMERO
  if (userStore.isDemoMode) {
    console.log('🎭 Middleware auth: Modo demo activo, permitiendo acceso')
    return
  }
  
  const savedToken = localStorage.getItem('AUTH_TOKEN')
  const demoMode = localStorage.getItem('DEMO_MODE')
  
  // Si hay modo demo guardado en localStorage, activarlo
  if (demoMode === 'true') {
    console.log('🎭 Middleware auth: Activando modo demo desde localStorage')
    userStore.enterDemoMode()
    return
  }
  
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
  
  // Solo verificar si NO hay token en absoluto (ni en store ni en localStorage) Y no está en modo demo  
  if (!userStore.token && !savedToken && !userStore.isDemoMode) {
    console.log('❌ Middleware auth: No hay token, redirigiendo al login')
    return navigateTo('/auth/login')
  }
  
  // Si hay token pero aún no hay usuario (inicializándose), permitir acceso temporalmente
  if (userStore.token && !userStore.user) {
    console.log('⏳ Middleware auth: Token existe, usuario inicializándose...')
    return // Permitir acceso mientras se inicializa
  }
  
  // Si el usuario está autenticado pero no verificado (excluyendo modo demo)
  if (userStore.user && !userStore.user.verified && !userStore.isDemoMode) {
    console.log('❌ Middleware auth: Cuenta no verificada')
    return navigateTo('/auth/verify-email')
  }
  
  // Si no está autenticado después de la inicialización (excluyendo modo demo)
  if (!userStore.isAuthenticated && !userStore.isDemoMode) {
    console.log('❌ Middleware auth: Usuario no autenticado')
    return navigateTo('/auth/login')
  }
  
  console.log('✅ Middleware auth: Acceso permitido')
}) 