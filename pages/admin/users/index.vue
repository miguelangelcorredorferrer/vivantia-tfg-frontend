<script setup>
import { useAdminStore } from '~/stores/admin'
import { useToastNotifications } from '~/composables/useToastNotifications'
import UsersFilter from '~/components/Admin/UsersFilter.vue'
import UsersTable from '~/components/Admin/UsersTable.vue'

// Configurar middleware de administrador
definePageMeta({
  middleware: 'admin'
})

// Stores y composables
const adminStore = useAdminStore()
const { toast } = useToastNotifications()

// Cargar usuarios al montar el componente
onMounted(async () => {
  try {
    await adminStore.fetchAllUsers()
  } catch (error) {
    toast.error('Error al cargar usuarios')
  }
})

// Manejar cambios en filtros
const handleFilterChange = (filters) => {
  adminStore.updateFilters(filters.name, filters.email)
}

const handleClearFilters = () => {
  adminStore.clearFilters()
}

// Manejar eliminación de usuario
const handleDeleteUser = async (userId, force = false) => {
  try {
    const result = await adminStore.deleteUser(userId, force)
    
    if (result.success) {
      toast.success(result.message || 'Usuario eliminado exitosamente')
      return result
    } else if (result.requiresConfirmation) {
      // Retornar el resultado para que el componente hijo maneje la confirmación
      return result
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    toast.error('Error al eliminar usuario')
    throw error
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-2">
        <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white">Panel de Administración</h1>
          <p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p>
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-xl font-semibold text-white">Gestión de Usuarios</h2>
        <p class="text-gray-400 mt-1">Administración y control de usuarios del sistema</p>
      </div>
    </div>

    <!-- Estadísticas rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ adminStore.totalUsers }}</p>
            <p class="text-sm text-blue-300">Total de Usuarios</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ adminStore.filteredUsersCount }}</p>
            <p class="text-sm text-green-300">Usuarios Filtrados</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ adminStore.users.filter(u => u.role === 'admin').length }}</p>
            <p class="text-sm text-purple-300">Administradores</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <UsersFilter 
      :name-filter="adminStore.nameFilter"
      :email-filter="adminStore.emailFilter"
      @filter-change="handleFilterChange"
      @clear-filters="handleClearFilters"
    />

    <!-- Tabla de usuarios -->
    <UsersTable 
      :users="adminStore.filteredUsers"
      :is-loading="adminStore.isLoading"
      @delete-user="handleDeleteUser"
    />
  </div>
</template> 