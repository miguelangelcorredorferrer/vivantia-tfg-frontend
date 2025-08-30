export default defineNuxtRouteMiddleware((to, from) => {
  // Solo ejecutar en el cliente
  if (process.server) return

  const userStore = useUserStore()
  
  // Si no está en modo demo, permitir acceso
  if (!userStore.isDemoMode) {
    return
  }
  
  // Lista de rutas permitidas para visitantes (modo demo)
  const allowedRoutes = [
    '/dashboard',
    '/', // Página principal
    '/auth/login', // Para poder volver al login
    '/demo-test' // Página de prueba
  ]
  
  // Verificar si la ruta actual está permitida
  const isRouteAllowed = allowedRoutes.some(route => {
    // Manejar rutas exactas y rutas que empiecen con el patrón
    if (route === '/') {
      return to.path === '/'
    }
    return to.path.startsWith(route)
  })
  
  if (!isRouteAllowed) {
    console.log('🚫 Visitor block: Acceso bloqueado a', to.path, 'para visitante')
    
    // Mostrar notificación de acceso bloqueado solo en cliente
    if (process.client) {
      try {
        const { toast } = useToastNotifications()
        toast.warning('Esta funcionalidad no está disponible en modo demo')
      } catch (error) {
        console.warn('Toast not available:', error)
      }
    }
    
    // Redirigir al dashboard
    return navigateTo('/dashboard')
  }
  
  console.log('✅ Visitor block: Acceso permitido a', to.path, 'para visitante')
}) 