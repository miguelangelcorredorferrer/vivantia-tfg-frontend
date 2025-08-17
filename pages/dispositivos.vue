<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useDeviceStore } from '~/stores/device'
import { useToastNotifications } from '~/composables/useToastNotifications'
import DeviceForm from '~/components/Devices/DeviceForm.vue'
import DevicesTable from '~/components/Devices/DevicesTable.vue'
import DeviceEditModal from '~/components/Devices/DeviceEditModal.vue'

// Configurar middleware
definePageMeta({
  middleware: ['auth', 'visitor-block']
})

// Stores
const userStore = useUserStore()
const deviceStore = useDeviceStore()
const { toast } = useToastNotifications()

// Estado del modal de edición
const isEditModalOpen = ref(false)
const deviceToEdit = ref(null)

// Cargar dispositivo del usuario al montar la página
onMounted(async () => {
  if (userStore.user?.id) {
    try {
      await deviceStore.fetchUserDevice(userStore.user.id)
    } catch (error) {
      console.error('Error cargando dispositivo:', error)
      toast.error('Error al cargar dispositivo')
    }
  }
})

// Manejar la adición de nuevos dispositivos
const handleDeviceAdded = async (newDeviceData) => {
  try {
    // Mapear campos del formulario a los campos que espera el backend
    const deviceToAdd = {
      device_name: newDeviceData.deviceName,
      enddevice_id: newDeviceData.enddeviceId,
      app_eui: newDeviceData.appEui,
      dev_eui: newDeviceData.devEui,
      app_key: newDeviceData.appKey,
      is_active_communication: false, // Estado inicial inactivo
      ttn_region: newDeviceData.ttnRegion || null,
      ttn_app_id: newDeviceData.ttnAppId || null,
      ttn_access_key: newDeviceData.ttnAccessKey || null
    }
    
    console.log('📝 Datos a enviar:', deviceToAdd)
    
    const response = await deviceStore.createDevice(deviceToAdd)
    
    console.log('✅ Dispositivo creado exitosamente:', response.data?.device_name)
    toast.success('Dispositivo registrado exitosamente')
    
  } catch (error) {
    console.error('❌ Error creando dispositivo:', error)
    toast.error(error.message || 'Error al registrar dispositivo')
  }
}

// Manejar el cambio de estado del switch
// Nota: la acción de activación/desactivación ya la ejecuta el componente hijo `DevicesTable`.
// Aquí solo registramos el evento para evitar duplicar llamadas al backend (y alertas).
const handleToggleDevice = async ({ device, isActive }) => {
  console.log(`Evento de toggle recibido para ${device.deviceName}: ${isActive ? 'activado' : 'desactivado'}`)
}

// Manejar edición de dispositivo
const handleEditDevice = (device) => {
  console.log('🔧 Editar dispositivo:', device.deviceName)
  deviceToEdit.value = device
  isEditModalOpen.value = true
}

// Cerrar modal de edición
const handleCloseEditModal = () => {
  isEditModalOpen.value = false
  deviceToEdit.value = null
}

// Guardar cambios del dispositivo
const handleSaveDevice = async ({ deviceId, updateData }) => {
  try {
    await deviceStore.updateDevice(deviceId, updateData)
    console.log('✅ Dispositivo actualizado exitosamente')
    toast.success('Dispositivo actualizado exitosamente')
    // El modal se cierra automáticamente desde el componente
  } catch (error) {
    console.error('❌ Error actualizando dispositivo:', error)
    toast.error(error.message || 'Error al actualizar dispositivo')
    // En caso de error, no se cierra el modal para que el usuario pueda corregir
  }
}

// Manejar eliminación de dispositivo
const handleDeleteDevice = async (device) => {
  try {
    await deviceStore.deleteDevice(device.id)
    console.log('✅ Dispositivo eliminado exitosamente')
    toast.success('Dispositivo eliminado exitosamente')
  } catch (error) {
    console.error('❌ Error eliminando dispositivo:', error)
    toast.error(error.message || 'Error al eliminar dispositivo')
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">Dispositivos IoT</h1>
      <p class="text-gray-400 mt-2">Gestión y monitoreo de dispositivos para el sistema de riego automático</p>
    </div>

    <!-- Formulario de registro -->
    <DeviceForm @device-added="handleDeviceAdded" />

    <!-- Tabla de dispositivos -->
    <DevicesTable 
      :device-store="deviceStore"
      @toggle-device="handleToggleDevice"
      @edit-device="handleEditDevice"
      @delete-device="handleDeleteDevice"
    />

    <!-- Modal de edición -->
    <DeviceEditModal
      :is-open="isEditModalOpen"
      :device="deviceToEdit"
      @close="handleCloseEditModal"
      @save="handleSaveDevice"
    />
  </div>
</template>

