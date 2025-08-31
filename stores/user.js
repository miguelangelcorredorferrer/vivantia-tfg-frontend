import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import AuthAPI from '../api/AuthAPI'
import { demoData } from '~/utils/demoData'

export const useUserStore = defineStore('user', () => {
  // Estado existente
  const user = ref(null)
  const token = ref(null)
  const isLoading = ref(false)
  
  // Nuevo estado para modo demo
  const isDemoMode = ref(false)
  
  // Inicializar token solo en el cliente para evitar problemas de hidratación
  if (process.client) {
    token.value = localStorage.getItem('AUTH_TOKEN')
    // Verificar si hay modo demo guardado
    const savedDemoMode = localStorage.getItem('DEMO_MODE')
    if (savedDemoMode === 'true') {
      isDemoMode.value = true
      user.value = { ...demoData.user }
    }
    console.log('🔄 Store: Token inicializado desde localStorage:', !!token.value)
    console.log('🔄 Store: Modo demo inicializado:', isDemoMode.value)
  }

  // Getters (computed) - extendidos para modo demo
  const isAuthenticated = computed(() => {
    // En el servidor, siempre devolver false para evitar problemas de hidratación
    if (!process.client) {
      return false
    }
    
    // En modo demo, consideramos al usuario como "autenticado"
    if (isDemoMode.value) {
      return true
    }
    
    const result = !!token.value && !!user.value
    // Solo mostrar logs en desarrollo para reducir ruido
    if (process.dev) {
      console.log('🔍 Store: isAuthenticated computed ->', result, { token: !!token.value, user: !!user.value })
    }
    return result
  })
  
  const userName = computed(() => {
    if (isDemoMode.value) {
      return demoData.user.name
    }
    return user.value?.name || ''
  })
  
  const userEmail = computed(() => {
    if (isDemoMode.value) {
      return demoData.user.email
    }
    return user.value?.email || ''
  })
  
  const isEmailVerified = computed(() => {
    if (isDemoMode.value) {
      return false // Demo user no está verificado
    }
    return user.value?.emailVerified || false
  })
  
  const isAdmin = computed(() => {
    if (isDemoMode.value) {
      return false // Demo user nunca es admin
    }
    return user.value?.role === 'admin'
  })

  // Actions
  const login = async (credentials) => {
    try {
      isLoading.value = true
      console.log('🔄 Store: Realizando petición de login...')
      const data = await AuthAPI.login(credentials)
      console.log('✅ Store: Login API exitoso:', data)
      
      token.value = data.token
      if (process.client) {
        localStorage.setItem('AUTH_TOKEN', data.token)
      }
      console.log('✅ Store: Token guardado')
      
      // Obtener datos del usuario después del login
      console.log('🔄 Store: Obteniendo datos del usuario...')
      await getCurrentUser()
      console.log('✅ Store: Datos del usuario obtenidos:', user.value)
      
      return { success: true, data }
    } catch (error) {
      console.error('❌ Store: Error en login:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    try {
      isLoading.value = true
      const data = await AuthAPI.register(userData)
      return { success: true, ...data }
    } catch (error) {
      console.error('Error en registro:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const getCurrentUser = async () => {
    try {
      if (!token.value) {
        console.log('⚠️ Store: No hay token, saltando getCurrentUser')
        return
      }
      
      console.log('🔄 Store: Llamando a AuthAPI.getUser...')
      const data = await AuthAPI.getUser()
      console.log('✅ Store: AuthAPI.getUser exitoso:', data)
      
      user.value = data.user || data
      console.log('✅ Store: Usuario asignado:', user.value)
      return { success: true, data }
    } catch (error) {
      console.error('❌ Store: Error obteniendo usuario:', error)
      console.error('❌ Store: Error details:', error.response?.data)
      // Si hay error, limpiar datos de autenticación
      logout()
      throw error
    }
  }

  const logout = async () => {
    try {
      // Solo llamar al endpoint de logout si no estamos en modo demo y hay un token
      if (!isDemoMode.value && token.value) {
        await AuthAPI.logout()
      }
    } catch (error) {
      console.warn('Error al llamar endpoint de logout:', error)
      // Continuar con el logout local aunque falle el endpoint
    } finally {
      // Limpiar estado local
      user.value = null
      token.value = null
      isDemoMode.value = false
      
      if (process.client) {
        localStorage.removeItem('AUTH_TOKEN')
        localStorage.removeItem('DEMO_MODE')
      }
    }
  }

  const forgotPassword = async (email) => {
    try {
      isLoading.value = true
      const data = await AuthAPI.forgotPassword({ email })
      return { success: true, ...data }
    } catch (error) {
      console.error('Error en forgot password:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const verifyPasswordResetToken = async (token) => {
    try {
      const data = await AuthAPI.verifyPasswordResetToken(token)
      return { success: true, ...data }
    } catch (error) {
      console.error('Error verificando token:', error)
      throw error
    }
  }

  const updatePassword = async (token, password) => {
    try {
      isLoading.value = true
      const data = await AuthAPI.updatePassword(token, { password })
      return { success: true, ...data }
    } catch (error) {
      console.error('Error actualizando password:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const verifyAccount = async (token) => {
    try {
      const data = await AuthAPI.verifyAccount(token)
      return { success: true, ...data }
    } catch (error) {
      console.error('Error verificando cuenta:', error)
      throw error
    }
  }

  const changePassword = async (passwordData) => {
    try {
      isLoading.value = true
      const data = await AuthAPI.changePassword(passwordData)
      return { success: true, ...data }
    } catch (error) {
      console.error('Error cambiando password:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Nuevas acciones para modo demo
  const enterDemoMode = () => {
    console.log('🎭 Store: Activando modo demo')
    console.log('🔍 Store: Estado antes del demo:', {
      isDemoMode: isDemoMode.value,
      user: user.value,
      token: token.value
    })
    
    isDemoMode.value = true
    user.value = { ...demoData.user }
    token.value = null
    
    if (process.client) {
      localStorage.setItem('DEMO_MODE', 'true')
      localStorage.removeItem('AUTH_TOKEN')
      console.log('💾 Store: localStorage actualizado - DEMO_MODE:', localStorage.getItem('DEMO_MODE'))
    }
    
    console.log('🔍 Store: Estado después del demo:', {
      isDemoMode: isDemoMode.value,
      user: user.value,
      token: token.value,
      isAuthenticated: isAuthenticated.value
    })
    
    console.log('✅ Store: Modo demo activado')
  }
  
  const exitDemoMode = () => {
    console.log('🎭 Store: Saliendo del modo demo')
    isDemoMode.value = false
    user.value = null
    
    if (process.client) {
      localStorage.removeItem('DEMO_MODE')
    }
    
    console.log('✅ Store: Modo demo desactivado')
  }

  // Inicializar usuario si hay token
  const init = async () => {
    if (token.value && process.client) {
      try {
        await getCurrentUser()
      } catch (error) {
        // Si falla, limpiar token inválido
        logout()
      }
    }
  }

  return {
    // Estado
    user,
    token,
    isLoading,
    isDemoMode,
    
    // Getters
    isAuthenticated,
    userName,
    userEmail,
    isEmailVerified,
    isAdmin,
    
    // Actions
    login,
    register,
    getCurrentUser,
    logout,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword,
    verifyAccount,
    changePassword,
    enterDemoMode,
    exitDemoMode,
    init
  }
}) 