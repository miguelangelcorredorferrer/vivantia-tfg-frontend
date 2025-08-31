<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { useToastNotifications } from '~/composables/useToastNotifications'

// Configurar el layout de autenticación
definePageMeta({
  layout: 'auth'
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { toast } = useToastNotifications()

const { token } = route.params

// Estado del componente
const validToken = ref(false)
const isCheckingToken = ref(true)
const password = ref('')
const passwordConfirm = ref('')
const errors = ref({})
const isSubmitting = ref(false)

// Verificar el token al montar el componente
onMounted(async () => {
  try {
    await userStore.verifyPasswordResetToken(token)
    validToken.value = true
  } catch (error) {
    console.error('Error verificando token:', error)
    const message = error.response?.data?.msg || 'Token inválido o expirado'
    toast.error(message)
    validToken.value = false
  } finally {
    isCheckingToken.value = false
  }
})

// Validaciones
const validateForm = () => {
  errors.value = {}
  
  if (!password.value) {
    errors.value.password = 'La contraseña es obligatoria'
  } else if (password.value.length < 8) {
    errors.value.password = 'La contraseña debe tener al menos 8 caracteres'
  }
  
  if (!passwordConfirm.value) {
    errors.value.passwordConfirm = 'Confirmar contraseña es obligatorio'
  } else if (password.value !== passwordConfirm.value) {
    errors.value.passwordConfirm = 'Las contraseñas no coinciden'
  }
  
  return Object.keys(errors.value).length === 0
}

// Manejar envío del formulario
const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    
    const result = await userStore.updatePassword(token, password.value)
    
    toast.success(result.msg || 'Contraseña actualizada exitosamente')
    
    // Redirigir al login después de actualizar la contraseña
    setTimeout(() => {
      router.push('/auth/login')
    }, 2000)
    
  } catch (error) {
    console.error('Error actualizando contraseña:', error)
    const message = error.response?.data?.msg || 'Error al actualizar la contraseña'
    toast.error(message)
  } finally {
    isSubmitting.value = false
  }
}

// Limpiar errores al escribir
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}
</script>

<template>
  <div>
    <!-- Cargando verificación de token -->
    <div v-if="isCheckingToken" class="text-center py-8">
      <div class="flex justify-center mb-4">
        <svg class="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p class="text-gray-600">Verificando token...</p>
    </div>

    <!-- Token válido - Formulario de nueva contraseña -->
    <div v-else-if="validToken">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Nueva Contraseña</h2>
        <p class="text-gray-600">Establece una nueva contraseña para tu cuenta</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Campo Nueva Contraseña -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Nueva contraseña
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :class="{ 'border-red-500': errors.password }"
            @input="clearError('password')"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Campo Confirmar Contraseña -->
        <div>
          <label for="passwordConfirm" class="block text-sm font-medium text-gray-700 mb-1">
            Confirmar nueva contraseña
          </label>
          <input
            id="passwordConfirm"
            v-model="passwordConfirm"
            type="password"
            placeholder="Repite tu nueva contraseña"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :class="{ 'border-red-500': errors.passwordConfirm }"
            @input="clearError('passwordConfirm')"
          />
          <p v-if="errors.passwordConfirm" class="text-red-500 text-sm mt-1">{{ errors.passwordConfirm }}</p>
        </div>

        <!-- Botón de envío -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!isSubmitting">Guardar nueva contraseña</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Guardando...
          </span>
        </button>
      </form>
    </div>

    <!-- Token inválido -->
    <div v-else class="text-center py-8">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
      </div>
      
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Token inválido</h3>
      <p class="text-gray-600 mb-6">
        El enlace de recuperación ha expirado o no es válido.
      </p>
      
      <NuxtLink 
        to="/auth/forgot-password" 
        class="inline-block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
      >
        Solicitar nuevo enlace
      </NuxtLink>
    </div>
  </div>
</template> 