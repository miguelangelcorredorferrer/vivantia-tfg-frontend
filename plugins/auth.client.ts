export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  
  // Solo en el cliente
  if (process.client) {
    const savedToken = localStorage.getItem('AUTH_TOKEN')
    
    if (savedToken && !userStore.user) {
      console.log('🔄 Restaurando sesión...')
      
      // Establecer token en el store
      ;(userStore.token as any) = savedToken
      
      try {
        // Obtener datos del usuario
        await userStore.getCurrentUser()
        console.log('✅ Sesión restaurada:', (userStore.user as any)?.name)
      } catch (error) {
        console.error('❌ Token inválido, limpiando:', error)
        userStore.logout()
      }
    }
  }
}) 