<script setup>
import { onMounted, ref } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import DeviceForm from '~/components/Devices/DeviceForm.vue'
import DevicesTable from '~/components/Devices/DevicesTable.vue'
import DeviceEditModal from '~/components/Devices/DeviceEditModal.vue'

// Configurar middleware de autenticación
definePageMeta({
  middleware: 'auth'
})

// Stores
const userStore = useUserStore()
const deviceStore = useDeviceStore()
const { showToast } = useToastNotifications()

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
      showToast('Error al cargar dispositivo', 'error')
    }
  }
})

// Manejar la adición de nuevos dispositivos
const handleDeviceAdded = async (newDeviceData) => {
  try {
    // Mapear campos del formulario a los campos que espera el backend
    const deviceToAdd = {
      user_id: userStore.user.id,
      device_name: newDeviceData.deviceName,
      enddevice_id: newDeviceData.enddeviceId,
      app_eui: newDeviceData.appEui,
      dev_eui: newDeviceData.devEui,
      app_key: newDeviceData.appKey,
      is_active_communication: false // Estado inicial inactivo
    }
    
    console.log('📝 Datos a enviar:', deviceToAdd)
    
    const response = await deviceStore.createDevice(deviceToAdd)
    
    console.log('✅ Dispositivo creado exitosamente:', response.data?.device_name)
    showToast('Dispositivo registrado exitosamente', 'success')
    
  } catch (error) {
    console.error('❌ Error creando dispositivo:', error)
    
    // Mostrar mensaje de error específico
    if (error.message.includes('ya tienes un dispositivo')) {
      showToast('Ya tienes un dispositivo registrado. Solo se permite uno por usuario.', 'error')
    } else {
      showToast(error.message || 'Error al registrar dispositivo', 'error')
    }
  }
}

// Manejar el cambio de estado del switch
const handleToggleDevice = async ({ device, isActive }) => {
  try {
    await deviceStore.toggleDeviceActive(device.id, isActive)
    console.log(`✅ Dispositivo ${device.deviceName} ${isActive ? 'activado' : 'desactivado'}`)
  } catch (error) {
    console.error('❌ Error cambiando estado del dispositivo:', error)
    showToast(error.message || 'Error al cambiar estado del dispositivo', 'error')
  }
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
    showToast('Dispositivo actualizado exitosamente', 'success')
    // El modal se cierra automáticamente desde el componente
  } catch (error) {
    console.error('❌ Error actualizando dispositivo:', error)
    showToast(error.message || 'Error al actualizar dispositivo', 'error')
    // En caso de error, no se cierra el modal para que el usuario pueda corregir
  }
}

// Manejar eliminación de dispositivo
const handleDeleteDevice = async (device) => {
  try {
    await deviceStore.deleteDevice(device.id)
    console.log('✅ Dispositivo eliminado exitosamente')
    showToast('Dispositivo eliminado exitosamente', 'success')
  } catch (error) {
    console.error('❌ Error eliminando dispositivo:', error)
    showToast(error.message || 'Error al eliminar dispositivo', 'error')
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

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 