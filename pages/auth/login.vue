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
    </form>

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