<script setup>
import { useAdminStore } from '~/stores/admin'
import { useToastNotifications } from '~/composables/useToastNotifications'
import UserAPI from '~/api/UserAPI'

// Configurar middleware de administrador
definePageMeta({
  middleware: 'admin'
})

// Stores y composables
const adminStore = useAdminStore()
const { toast } = useToastNotifications()

// Estado del formulario
const formData = ref({
  name: '',
  email: '',
  password: '',
  role: 'visitante',
  verified: false,
  token: '' // Token como cadena vacía
})

// Estados de carga y error
const isSaving = ref(false)
const error = ref(null)

// Función para guardar usuario
const handleSubmit = async () => {
  try {
    isSaving.value = true
    error.value = null
    
    // Validar campos obligatorios
    if (!formData.value.name || !formData.value.email || !formData.value.password) {
      throw new Error('Todos los campos obligatorios deben estar completos')
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.value.email)) {
      throw new Error('El formato del email no es válido')
    }
    
    // Validar longitud de contraseña
    if (formData.value.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres')
    }
    
    // Crear usuario
    await UserAPI.create(formData.value)
    
    toast.success('Usuario creado exitosamente')
    
    // Redirigir de vuelta a la lista de usuarios
    await navigateTo('/admin/users')
    
  } catch (err) {
    console.error('❌ Error creando usuario:', err)
    error.value = err.message || 'Error al crear el usuario'
    toast.error(error.value)
  } finally {
    isSaving.value = false
  }
}

// Función para cancelar y volver
const handleCancel = () => {
  navigateTo('/admin/users')
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-2">
        <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white">Panel de Administración</h1>
          <p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p>
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-xl font-semibold text-white">Añadir Usuario</h2>
        <p class="text-gray-400 mt-1">Crear un nuevo usuario en el sistema</p>
      </div>
    </div>

    <!-- Formulario de creación -->
    <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Campos del usuario -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Nombre Completo *
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ej: juan.perez@email.com"
            />
          </div>

          <!-- Contraseña -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Contraseña *
            </label>
            <input
              v-model="formData.password"
              type="password"
              required
              minlength="6"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Mínimo 6 caracteres"
            />
            <p class="text-xs text-gray-500 mt-1">La contraseña debe tener al menos 6 caracteres</p>
          </div>

          <!-- Rol -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Rol *
            </label>
            <select
              v-model="formData.role"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="visitante">Visitante</option>
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <!-- Estado de verificación -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Estado de Verificación
            </label>
            <select
              v-model="formData.verified"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option :value="false">No verificado</option>
              <option :value="true">Verificado</option>
            </select>
            <p class="text-xs text-gray-500 mt-1">Controla si el usuario puede acceder al sistema</p>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
          <button
            type="button"
            @click="handleCancel"
            class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="isSaving"
            class="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center"
          >
            <div v-if="isSaving" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ isSaving ? 'Creando...' : 'Crear Usuario' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 