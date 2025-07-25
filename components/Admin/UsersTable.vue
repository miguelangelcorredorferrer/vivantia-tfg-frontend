<script setup>
import { useToastNotifications } from '~/composables/useToastNotifications'
import DeleteConfirmModal from './DeleteConfirmModal.vue'

const props = defineProps({
  users: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete-user'])

const { toast } = useToastNotifications()

// Estado del modal de confirmación
const showDeleteModal = ref(false)
const userToDelete = ref(null)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getRoleBadgeClass = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'usuario':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'visitante':
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

const getRoleLabel = (role) => {
  switch (role) {
    case 'admin':
      return 'Administrador'
    case 'usuario':
      return 'Usuario'
    case 'visitante':
      return 'Visitante'
    default:
      return role
  }
}

const getVerificationStatus = (verified) => {
  return verified ? {
    label: 'Verificado',
    class: 'bg-green-500/20 text-green-400 border-green-500/30'
  } : {
    label: 'No verificado',
    class: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  }
}

const handleDeleteUser = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    await emit('delete-user', userToDelete.value.id)
    toast.success('Usuario eliminado exitosamente')
  } catch (error) {
    toast.error('Error al eliminar usuario')
  } finally {
    showDeleteModal.value = false
    userToDelete.value = null
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  userToDelete.value = null
}
</script>

<template>
  <div class="bg-gray-800/50 border border-gray-600/30 rounded-lg overflow-hidden">
    <!-- Header de la tabla -->
    <div class="px-6 py-4 border-b border-gray-600/30">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-white">Usuarios Disponibles</h3>
          <p class="text-sm text-gray-400 mt-1">
            {{ users.length }} usuario{{ users.length !== 1 ? 's' : '' }} encontrado{{ users.length !== 1 ? 's' : '' }}
          </p>
        </div>
        <button
          @click="navigateTo('/admin/users/agregar')"
          class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Añadir Usuario
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-700/50">
          <tr>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Nombre
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Fecha de Creación
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Estado
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Rol
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-600/30">
          <!-- Estado de carga -->
          <tr v-if="isLoading">
            <td colspan="6" class="px-6 py-8 text-center">
              <div class="flex items-center justify-center space-x-2">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span class="text-gray-400">Cargando usuarios...</span>
              </div>
            </td>
          </tr>

          <!-- Sin usuarios -->
          <tr v-else-if="users.length === 0">
            <td colspan="6" class="px-6 py-8 text-center">
              <div class="text-gray-400">
                <svg class="w-12 h-12 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
                <p class="text-lg font-medium">No se encontraron usuarios</p>
                <p class="text-sm">Intenta ajustar los filtros de búsqueda</p>
              </div>
            </td>
          </tr>

          <!-- Lista de usuarios -->
          <tr v-else v-for="user in users" :key="user.id" class="hover:bg-gray-700/30 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                  <span class="text-white text-sm font-semibold">
                    {{ user.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div class="text-center">
                  <div class="text-sm font-medium text-white">{{ user.name }}</div>
                  <div class="text-xs text-gray-400">ID: {{ user.id }}</div>
                </div>
              </div>
            </td>
            
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-white">{{ user.email }}</div>
            </td>
            
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-300">{{ formatDate(user.created_at) }}</div>
            </td>
            
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <span 
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full border"
                :class="getVerificationStatus(user.verified).class"
              >
                {{ getVerificationStatus(user.verified).label }}
              </span>
            </td>
            
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <span 
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full border"
                :class="getRoleBadgeClass(user.role)"
              >
                {{ getRoleLabel(user.role) }}
              </span>
            </td>
            
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex items-center justify-center space-x-2">
                <button
                  @click="navigateTo(`/admin/users/editar/${user.id}`)"
                  class="inline-flex items-center px-2 py-1 text-yellow-400 border border-yellow-400 rounded-md hover:bg-yellow-400/10 transition-colors"
                  title="Editar usuario"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  <span class="text-xs font-medium">Editar</span>
                </button>
                <button
                  @click="handleDeleteUser(user)"
                  class="inline-flex items-center px-2 py-1 text-red-400 border border-red-400 rounded-md hover:bg-red-400/10 transition-colors"
                  :disabled="user.role === 'admin'"
                  :title="user.role === 'admin' ? 'No se puede eliminar un administrador' : 'Eliminar usuario'"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  <span class="text-xs font-medium">Eliminar</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal de confirmación de eliminación -->
  <DeleteConfirmModal
    :is-open="showDeleteModal"
    title="Eliminar Usuario"
    message="¿Estás seguro de que quieres eliminar este usuario?"
    :item-name="userToDelete?.name"
    item-type="usuario"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template> 