<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">🧪 Página de Prueba - Modo Demo</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Estado del Store -->
        <div class="bg-gray-800 p-6 rounded-lg">
          <h2 class="text-xl font-semibold mb-4">📊 Estado del Store</h2>
          <div class="space-y-2 text-sm">
            <p><strong>isDemoMode:</strong> {{ userStore.isDemoMode }}</p>
            <p><strong>isAuthenticated:</strong> {{ userStore.isAuthenticated }}</p>
            <p><strong>userName:</strong> {{ userStore.userName }}</p>
            <p><strong>userEmail:</strong> {{ userStore.userEmail }}</p>
            <p><strong>isAdmin:</strong> {{ userStore.isAdmin }}</p>
          </div>
        </div>
        
        <!-- LocalStorage -->
        <div class="bg-gray-800 p-6 rounded-lg">
          <h2 class="text-xl font-semibold mb-4">💾 LocalStorage</h2>
          <div class="space-y-2 text-sm">
            <p><strong>DEMO_MODE:</strong> {{ demoMode }}</p>
            <p><strong>AUTH_TOKEN:</strong> {{ authToken ? 'Existe' : 'No existe' }}</p>
          </div>
        </div>
        
        <!-- Acciones -->
        <div class="bg-gray-800 p-6 rounded-lg">
          <h2 class="text-xl font-semibold mb-4">🎮 Acciones</h2>
          <div class="space-y-3">
            <button 
              @click="activateDemo" 
              class="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Activar Modo Demo
            </button>
            <button 
              @click="deactivateDemo" 
              class="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Desactivar Modo Demo
            </button>
            <button 
              @click="goToDashboard" 
              class="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Ir al Dashboard
            </button>
          </div>
        </div>
        
        <!-- Datos Demo -->
        <div class="bg-gray-800 p-6 rounded-lg">
          <h2 class="text-xl font-semibold mb-4">🎭 Datos Demo</h2>
          <div class="space-y-2 text-sm">
            <p><strong>Usuario:</strong> {{ userStore.user?.name || 'No disponible' }}</p>
            <p><strong>Email:</strong> {{ userStore.user?.email || 'No disponible' }}</p>
            <p><strong>Role:</strong> {{ userStore.user?.role || 'No disponible' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore()

// Estados reactivos para localStorage
const demoMode = ref('')
const authToken = ref('')

// Actualizar datos de localStorage
const updateLocalStorageData = () => {
  if (process.client) {
    demoMode.value = localStorage.getItem('DEMO_MODE') || 'null'
    authToken.value = localStorage.getItem('AUTH_TOKEN')
  }
}

// Acciones
const activateDemo = () => {
  console.log('🎭 Activando modo demo desde página de prueba')
  userStore.enterDemoMode()
  updateLocalStorageData()
}

const deactivateDemo = () => {
  console.log('🚫 Desactivando modo demo desde página de prueba')
  userStore.exitDemoMode()
  updateLocalStorageData()
}

const goToDashboard = () => {
  navigateTo('/dashboard')
}

// Inicializar
onMounted(() => {
  updateLocalStorageData()
})

// Actualizar datos cada segundo
const interval = setInterval(updateLocalStorageData, 1000)

onUnmounted(() => {
  clearInterval(interval)
})
</script> 