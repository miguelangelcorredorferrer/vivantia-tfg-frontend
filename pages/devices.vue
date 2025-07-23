<script setup>
import { ref } from 'vue'
import DeviceForm from '~/components/Devices/DeviceForm.vue'
import DevicesTable from '~/components/Devices/DevicesTable.vue'

// Configurar middleware de autenticación
definePageMeta({
  middleware: 'auth'
})

// Estado reactivo para los dispositivos
const devices = ref([
  // Datos de ejemplo para mostrar el diseño
  {
    deviceName: 'Sensor Riego Principal',
    enddeviceId: 'sensor-riego-01',
    appEui: '0123456789ABCDEF',
    devEui: 'FEDCBA9876543210',
    appKey: '0123456789ABCDEF0123456789ABCDEF',
    isActive: true
  },
  {
    deviceName: 'Sensor Humedad Suelo',
    enddeviceId: 'humedad-suelo-02',
    appEui: 'ABCDEF0123456789',
    devEui: '0123456789ABCDEF',
    appKey: 'FEDCBA9876543210FEDCBA9876543210',
    isActive: false
  },
  {
    deviceName: 'Controlador Bomba',
    enddeviceId: 'bomba-ctrl-03',
    appEui: '9876543210FEDCBA',
    devEui: '567890ABCDEF1234',
    appKey: '1234567890ABCDEF1234567890ABCDEF',
    isActive: false
  }
])

// Manejar la adición de nuevos dispositivos
const handleDeviceAdded = (newDevice) => {
  // Crear el dispositivo con estado inicial inactivo
  const deviceToAdd = {
    ...newDevice,
    isActive: false
  }
  
  // Agregar al inicio de la lista
  devices.value.unshift(deviceToAdd)
  
  console.log('Nuevo dispositivo agregado:', deviceToAdd)
  
  // Aquí se podría hacer la llamada a la API real
  // await deviceService.addDevice(deviceToAdd)
}

// Manejar el cambio de estado del switch
const handleToggleDevice = ({ index, isActive }) => {
  if (isActive) {
    // Si se está activando un dispositivo, desactivar todos los demás
    devices.value.forEach((device, i) => {
      if (i !== index) {
        device.isActive = false
      }
    })
    // Activar el dispositivo seleccionado
    devices.value[index].isActive = true
    
    console.log(`Dispositivo ${devices.value[index].deviceName} activado. Todos los demás desactivados.`)
  } else {
    // Si se está desactivando, simplemente desactivar
    devices.value[index].isActive = false
    console.log(`Dispositivo ${devices.value[index].deviceName} desactivado`)
  }
  
  // Aquí se podría hacer la llamada a la API real
  // await deviceService.updateDeviceStatus(devices.value[index].id, isActive)
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
      :devices="devices" 
      @toggle-device="handleToggleDevice" 
    />
  </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 