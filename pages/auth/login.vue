<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { useToastNotifications } from '~/composables/useToastNotifications'

// Configurar el layout de autenticación
definePageMeta({
  layout: 'auth',
  middleware: 'public'
})

const router = useRouter()
const userStore = useUserStore()
const { toast } = useToastNotifications()

// Estado del formulario
const formData = ref({
  email: '',
  password: ''
})

const errors = ref({})
const isSubmitting = ref(false)

// Validaciones
const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.email.trim()) {
    errors.value.email = 'El email es obligatorio'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'El email no es válido'
  }
  
  if (!formData.value.password) {
    errors.value.password = 'La contraseña es obligatoria'
  }
  
  return Object.keys(errors.value).length === 0
}

// Manejar envío del formulario
const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    
    console.log('🔄 Intentando hacer login...')
    const result = await userStore.login(formData.value)
    console.log('✅ Login exitoso:', result)
    
    toast.success(`¡Bienvenido ${userStore.userName} a Vivantia!`)
    
    // Redirigir al dashboard
    console.log('🔄 Redirigiendo al dashboard...')
    router.push('/dashboard')
    
  } catch (error) {
    console.error('❌ Error en login:', error)
    console.error('❌ Error response:', error.response)
    console.error('❌ Error message:', error.message)
    
    // Manejar error específico de cuenta no verificada
    const errorMessage = error.response?.data?.msg || error.message || ''
    console.log('🔍 Verificando mensaje de error:', errorMessage)
    
    if (errorMessage.includes('Tu cuenta no ha sido confirmada aún') || errorMessage.includes('Cuenta no verificada')) {
      console.log('⚠️ Cuenta no verificada, redirigiendo...')
      toast.warning('Cuenta no verificada. Por favor, verifica tu email antes de continuar.')
      // Redirigir a la página de verificación
      router.push('/auth/verify-email')
      return
    }
    
    const message = error.response?.data?.msg || 'Credenciales incorrectas'
    toast.error(message)
  } finally {
    isSubmitting.value = false
  }
}

// Limpiar error al escribir
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

// Función para activar modo demo
const startDemoMode = () => {
  try {
    console.log('🎭 Activando modo demo...')
    console.log('🔍 Estado antes:', {
      isDemoMode: userStore.isDemoMode,
      isAuthenticated: userStore.isAuthenticated,
      user: userStore.user
    })
    
    userStore.enterDemoMode()
    
    console.log('🔍 Estado después:', {
      isDemoMode: userStore.isDemoMode,
      isAuthenticated: userStore.isAuthenticated,
      user: userStore.user
    })
    
    toast.info('Bienvenido al modo demo de Vivantia')
    
    console.log('🔄 Redirigiendo al dashboard...')
    // Usar navigateTo en lugar de router.push para mejor compatibilidad
    navigateTo('/dashboard')
  } catch (error) {
    console.error('❌ Error activando modo demo:', error)
    toast.error('Error al acceder al modo demo')
  }
}
</script>

<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
      <p class="text-gray-600">Accede a tu cuenta de Vivantia IoT</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Campo Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Correo electrónico
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="tu@email.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          :class="{ 'border-red-500': errors.email }"
          @input="clearError('email')"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <!-- Campo Contraseña -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          placeholder="Tu contraseña"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          :class="{ 'border-red-500': errors.password }"
          @input="clearError('password')"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>

      <!-- Enlace de recuperar contraseña -->
      <div class="text-right">
        <NuxtLink 
          to="/auth/forgot-password" 
          class="text-sm text-green-600 hover:text-green-700 transition-colors duration-200"
        >
          ¿Olvidaste tu contraseña?
        </NuxtLink>
      </div>

      <!-- Botón de envío -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!isSubmitting">Iniciar Sesión</span>
        <span v-else class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Iniciando sesión...
        </span>
      </button>
      
      <!-- Separador -->
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">o</span>
        </div>
      </div>

      <!-- Botón de Vista Previa -->
      <button
        type="button"
        @click="startDemoMode"
        class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 border border-gray-300"
      >
        <span class="flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          Vista Previa
        </span>
      </button>
    </form>

    <!-- Información sobre vista previa -->
    <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-blue-700">
            <strong>Vista Previa:</strong> Explora las funcionalidades de Vivantia con datos de demostración antes de registrarte.
          </p>
        </div>
      </div>
    </div>

    <!-- Información adicional -->
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        ¿No tienes cuenta? 
        <NuxtLink 
          to="/auth/register" 
          class="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
        >
          Regístrate aquí
        </NuxtLink>
      </p>
    </div>
  </div>
</template> 