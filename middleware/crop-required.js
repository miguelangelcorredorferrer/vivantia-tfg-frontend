/**
 * Middleware para verificar que el usuario tenga un cultivo seleccionado
 * antes de acceder a las páginas de modos de riego
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('🔒 Middleware crop-required ejecutándose...')
  
  // Solo ejecutar en el cliente
  if (process.server) return
  
  const { $pinia } = useNuxtApp()
  const userStore = useUserStore($pinia)
  const cropStore = useCropStore($pinia)
  
  try {
    // Verificar que el usuario esté autenticado
    if (!userStore.user || !userStore.user.id) {
      console.warn('⚠️ Usuario no autenticado en crop-required middleware')
      return navigateTo('/auth/login')
    }
    
    // Intentar cargar el cultivo seleccionado si no está cargado
    if (!cropStore.currentCrop) {
      console.log('🔄 Cargando cultivo seleccionado en middleware...')
      try {
        await cropStore.fetchSelectedCrop(userStore.user.id)
      } catch (error) {
        console.log('📝 No hay cultivo seleccionado para este usuario')
      }
    }
    
    // Verificar que hay un cultivo seleccionado
    if (!cropStore.currentCrop || !cropStore.currentCrop.id || !cropStore.currentCrop.selected) {
      console.warn('⚠️ No hay cultivo seleccionado, redirigiendo a cultivos')
      
      // Usar useToastNotifications para mostrar el mensaje
      const { toast } = useToastNotifications()
      toast.warning('Debes seleccionar un cultivo antes de acceder a los modos de riego')
      
      return navigateTo('/cultivos')
    }
    
    console.log('✅ Cultivo seleccionado verificado:', cropStore.currentCrop.name)
    
  } catch (error) {
    console.error('❌ Error en middleware crop-required:', error)
    return navigateTo('/cultivos')
  }
})