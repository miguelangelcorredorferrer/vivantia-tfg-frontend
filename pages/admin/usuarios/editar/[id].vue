<script setup>
import { useAdminStore } from '~/stores/admin'
import { useToastNotifications } from '~/composables/useToastNotifications'
import UserAPI from '~/api/UserAPI'

// Configurar middleware de administrador
definePageMeta({
  middleware: 'admin'
})

// Obtener el ID del usuario de la URL
const route = useRoute()
const userId = route.params.id

// Stores y composables
const adminStore = useAdminStore()
const { toast } = useToastNotifications()

// Estado del formulario
const formData = ref({
  name: '',
  email: '',
  role: 'visitante',
  verified: false
})

// Estados de carga y error
const isLoading = ref(false)
const isSaving = ref(false)
const error = ref(null)

// Cargar datos del usuario al montar el componente
onMounted(async () => {
  await loadUserData()
})

// Función para cargar los datos del usuario
const loadUserData = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    // Obtener todos los usuarios y encontrar el específico
    const response = await UserAPI.getAllUsers()
    const user = response.data.find(u => u.id === parseInt(userId))
    
    if (!user) {
      throw new Error('Usuario no encontrado')
    }
    
    // Llenar el formulario con los datos del usuario
    formData.value = {
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'visitante',
      verified: user.verified || false
    }
    
    console.log('✅ Usuario cargado exitosamente')
  } catch (err) {
    console.error('❌ Error cargando usuario:', err)
    error.value = 'Error al cargar el usuario'
    toast.error('Error al cargar el usuario')
  } finally {
    isLoading.value = false
  }
}

// Función para guardar cambios
const handleSubmit = async () => {
  try {
    isSaving.value = true
    error.value = null
    
    // Validar campos obligatorios
    if (!formData.value.name || !formData.value.email) {
      throw new Error('Todos los campos obligatorios deben estar completos')
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.value.email)) {
      throw new Error('El formato del email no es válido')
    }
    
    // Preparar datos para actualizar (excluir password y token)
    const updateData = {
      name: formData.value.name,
      email: formData.value.email,
      role: formData.value.role,
      verified: formData.value.verified
    }
    
    // Actualizar usuario
    await UserAPI.update(userId, updateData)
    
    toast.success('Usuario actualizado exitosamente')
    
    // Redirigir de vuelta a la lista de usuarios
    await navigateTo('/admin/usuarios')
    
  } catch (err) {
    console.error('❌ Error actualizando usuario:', err)
    error.value = err.message || 'Error al actualizar el usuario'
    toast.error(error.value)
  } finally {
    isSaving.value = false
  }
}

// Función para cancelar y volver
const handleCancel = () => {
  navigateTo('/admin/usuarios')
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-2">
        <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white">Panel de Administración</h1>
          <p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p>
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-xl font-semibold text-white">Editar Usuario</h2>
        <p class="text-gray-400 mt-1">Modificar información del usuario</p>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
        <p class="text-gray-400">Cargando usuario...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div>
          <h3 class="text-lg font-medium text-red-400">Error</h3>
          <p class="text-red-300 mt-1">{{ error }}</p>
        </div>
      </div>
      <button
        @click="loadUserData"
        class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
      >
        Reintentar
      </button>
    </div>

    <!-- Formulario de edición -->
    <div v-else class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Campos editables -->
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

        <!-- Información no editable -->
        <div class="bg-gray-700/30 rounded-lg p-4">
          <h3 class="text-lg font-medium text-white mb-4">Información No Editable</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">
                Contraseña
              </label>
              <input
                value="••••••••"
                type="password"
                disabled
                class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-400 cursor-not-allowed"
              />
              <p class="text-xs text-gray-500 mt-1">Por seguridad, la contraseña no puede ser modificada</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">
                Token de Autenticación
              </label>
              <input
                value="No editable"
                type="text"
                disabled
                class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-400 cursor-not-allowed"
              />
              <p class="text-xs text-gray-500 mt-1">El token se genera automáticamente</p>
            </div>
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
            {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 