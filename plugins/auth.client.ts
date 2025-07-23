export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  
  // Inicializar el store de usuario al cargar la aplicación
  try {
    await userStore.init()
  } catch (error) {
    console.warn('Error inicializando store de usuario:', error)
    // Silenciosamente falla para evitar bloquear la aplicación
  }
}) 