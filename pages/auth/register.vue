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
  name: '',
  email: '',
  password: '',
  password_confirm: ''
})

const errors = ref({})
const isSubmitting = ref(false)

// Validaciones
const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.name.trim()) {
    errors.value.name = 'El nombre es obligatorio'
  } else if (formData.value.name.length < 3) {
    errors.value.name = 'El nombre debe tener al menos 3 caracteres'
  }
  
  if (!formData.value.email.trim()) {
    errors.value.email = 'El email es obligatorio'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'El email no es válido'
  }
  
  if (!formData.value.password) {
    errors.value.password = 'La contraseña es obligatoria'
  } else if (formData.value.password.length < 8) {
    errors.value.password = 'La contraseña debe tener al menos 8 caracteres'
  }
  
  if (!formData.value.password_confirm) {
    errors.value.password_confirm = 'Confirmar contraseña es obligatorio'
  } else if (formData.value.password !== formData.value.password_confirm) {
    errors.value.password_confirm = 'Las contraseñas no coinciden'
  }
  
  return Object.keys(errors.value).length === 0
}

// Manejar envío del formulario
const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    
    const { password_confirm, ...userData } = formData.value
    const result = await userStore.register(userData)
    
    toast.success(result.msg || 'Cuenta creada exitosamente. Revisa tu email para verificar tu cuenta.')
    
    // Limpiar formulario
    formData.value = {
      name: '',
      email: '',
      password: '',
      password_confirm: ''
    }
    
    // Redirigir a la página de verificación de email
    setTimeout(() => {
      router.push('/auth/verify-email')
    }, 2000)
    
  } catch (error) {
    console.error('Error en registro:', error)
    const message = error.response?.data?.msg || 'Error al crear la cuenta'
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
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Crear una cuenta</h2>
      <p class="text-gray-600">Únete a Vivantia IoT</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Campo Nombre -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="Tu nombre completo"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          :class="{ 'border-red-500': errors.name }"
          @input="clearError('name')"
        />
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
      </div>

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
          placeholder="Mínimo 8 caracteres"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          :class="{ 'border-red-500': errors.password }"
          @input="clearError('password')"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>

      <!-- Campo Confirmar Contraseña -->
      <div>
        <label for="password_confirm" class="block text-sm font-medium text-gray-700 mb-1">
          Confirmar contraseña
        </label>
        <input
          id="password_confirm"
          v-model="formData.password_confirm"
          type="password"
          placeholder="Repite tu contraseña"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          :class="{ 'border-red-500': errors.password_confirm }"
          @input="clearError('password_confirm')"
        />
        <p v-if="errors.password_confirm" class="text-red-500 text-sm mt-1">{{ errors.password_confirm }}</p>
      </div>

      <!-- Botón de envío -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!isSubmitting">Crear cuenta</span>
        <span v-else class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creando cuenta...
        </span>
      </button>
    </form>
  </div>
</template> 