<script setup>
import { useAdminStore } from '~/stores/admin'
import { useToastNotifications } from '~/composables/useToastNotifications'
import DevicesFilter from '~/components/Admin/Devices/DevicesFilter.vue'
import DevicesTable from '~/components/Admin/Devices/DevicesTable.vue'

// Configurar middleware de administrador
definePageMeta({
  middleware: 'admin'
})

// Stores y composables
const adminStore = useAdminStore()
const { toast } = useToastNotifications()

// Cargar dispositivos al montar el componente
onMounted(async () => {
  try {
    await adminStore.fetchAllDevices()
  } catch (error) {
    toast.error('Error al cargar dispositivos')
  }
})

// Manejar cambios en filtros
const handleFilterChange = (filters) => {
  adminStore.updateDeviceFilters(filters.name, filters.user, filters.email, filters.endDevice)
}

const handleClearFilters = () => {
  adminStore.clearDeviceFilters()
}

// Manejar eliminación de dispositivo
const handleDeleteDevice = async (deviceId) => {
  try {
    await adminStore.deleteDevice(deviceId)
    toast.success('Dispositivo eliminado exitosamente')
  } catch (error) {
    toast.error('Error al eliminar dispositivo')
  }
}

// Manejar edición de dispositivo
const handleEditDevice = (device) => {
  // Navegar a la página de edición
  navigateTo(`/admin/dispositivos/editar/${device.id}`)
}

// Manejar activación de dispositivo
const devicesTableRef = ref(null)

const handleActivateDevice = async (device, force = false) => {
  try {
    const result = await adminStore.activateDeviceWithValidation(device.id, force)
    
    if (result.success) {
      toast.success(result.message || 'Dispositivo activado exitosamente')
    } else if (result.requiresConfirmation) {
      // Mostrar modal de confirmación
      if (devicesTableRef.value) {
        devicesTableRef.value.showActivationConfirmation(
          result.activeDevices,
          device,
          device.user
        )
      }
    }
  } catch (error) {
    console.error('Error al activar dispositivo:', error)
    toast.error('Error al activar dispositivo')
  }
}

// Manejar desactivación de dispositivo
const handleDeactivateDevice = async (device) => {
  try {
    const result = await adminStore.deactivateDevice(device.id)
    
    if (result.success) {
      toast.success(result.message || 'Dispositivo desactivado exitosamente')
    }
  } catch (error) {
    console.error('Error al desactivar dispositivo:', error)
    toast.error('Error al desactivar dispositivo')
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-2">
        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white">Panel de Administración</h1>
          <p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p>
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-xl font-semibold text-white">Gestión de Dispositivos</h2>
        <p class="text-gray-400 mt-1">Administración y supervisión de todos los dispositivos del sistema</p>
      </div>
    </div>

    <!-- Estadísticas rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ adminStore.totalDevices }}</p>
            <p class="text-sm text-blue-300">Total de Dispositivos</p>
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
            <p class="text-2xl font-bold text-white">{{ adminStore.filteredDevicesCount }}</p>
            <p class="text-sm text-green-300">Dispositivos Filtrados</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ adminStore.devices.filter(d => d.is_active_communication).length }}</p>
            <p class="text-sm text-purple-300">Dispositivos Activos</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <DevicesFilter 
      :name-filter="adminStore.deviceNameFilter"
      :user-filter="adminStore.deviceUserFilter"
      :email-filter="adminStore.deviceEmailFilter"
      :end-device-filter="adminStore.deviceEndDeviceFilter"
      @filter-change="handleFilterChange"
      @clear-filters="handleClearFilters"
    />

    <!-- Tabla de dispositivos -->
    <DevicesTable 
      ref="devicesTableRef"
      :devices="adminStore.filteredDevices"
      :is-loading="adminStore.isLoading"
      @delete-device="handleDeleteDevice"
      @edit-device="handleEditDevice"
      @activate-device="handleActivateDevice"
      @deactivate-device="handleDeactivateDevice"
    />
  </div>
</template> 