<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useToastNotifications } from '~/composables/useToastNotifications'

// Configurar el layout de autenticación
definePageMeta({
  layout: 'auth'
})

const userStore = useUserStore()
const { toast } = useToastNotifications()

// Estado del formulario
const email = ref('')
const errors = ref({})
const isSubmitting = ref(false)
const emailSent = ref(false)

// Validaciones
const validateForm = () => {
  errors.value = {}
  
  if (!email.value.trim()) {
    errors.value.email = 'El email es obligatorio'
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = 'El email no es válido'
  }
  
  return Object.keys(errors.value).length === 0
}

// Manejar envío del formulario
const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    
    const result = await userStore.forgotPassword(email.value)
    
    toast.success(result.msg || 'Se ha enviado un enlace de recuperación a tu email')
    emailSent.value = true
    email.value = ''
    
  } catch (error) {
    console.error('Error en forgot password:', error)
    const message = error.response?.data?.msg || 'Error al enviar el email de recuperación'
    toast.error(message)
  } finally {
    isSubmitting.value = false
  }
}

// Limpiar error al escribir
const clearError = () => {
  if (errors.value.email) {
    delete errors.value.email
  }
}

// Resetear formulario
const resetForm = () => {
  emailSent.value = false
  email.value = ''
  errors.value = {}
}
</script>

<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Recuperar Contraseña</h2>
      <p class="text-gray-600">Te enviaremos instrucciones a tu email</p>
    </div>

    <!-- Formulario de recuperación -->
    <div v-if="!emailSent">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Campo Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="tu@email.com"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :class="{ 'border-red-500': errors.email }"
            @input="clearError"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Botón de envío -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!isSubmitting">Enviar instrucciones</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </span>
        </button>
      </form>
    </div>

    <!-- Mensaje de confirmación -->
    <div v-else class="text-center">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </div>
      
      <h3 class="text-lg font-semibold text-gray-800 mb-2">¡Email enviado!</h3>
      <p class="text-gray-600 mb-6">
        Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
      </p>
      
      <button
        @click="resetForm"
        class="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
      >
        Enviar a otro email
      </button>
    </div>

    <!-- Enlaces adicionales -->
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        ¿Recordaste tu contraseña? 
        <NuxtLink 
          to="/auth/login" 
          class="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
        >
          Iniciar sesión
        </NuxtLink>
      </p>
    </div>
  </div>
</template> 