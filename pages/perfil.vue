<script setup>
import { ref, reactive } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import UserAPI from '~/api/UserAPI'

// Configurar middleware
definePageMeta({
  middleware: ['auth', 'visitor-block']
})

// Stores
const userStore = useUserStore()
const { showToast } = useToastNotifications()

// Estados reactivos
const isEditingName = ref(false)
const isEditingPassword = ref(false)
const showDeleteConfirm = ref(false)
const isLoading = ref(false)

// Formularios
const nameForm = reactive({
  name: userStore.userName || ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const deleteForm = reactive({
  confirmText: '',
  password: ''
})

// Funciones para gestión de nombre
const startEditingName = () => {
  nameForm.name = userStore.userName || ''
  isEditingName.value = true
}

const cancelEditingName = () => {
  nameForm.name = userStore.userName || ''
  isEditingName.value = false
}

const saveName = async () => {
  if (!nameForm.name.trim()) {
    showToast('El nombre no puede estar vacío', 'error')
    return
  }

  isLoading.value = true
  try {
    // TODO: Implementar API para cambiar nombre
    console.log('Cambiar nombre a:', nameForm.name)
    showToast('Nombre actualizado exitosamente', 'success')
    isEditingName.value = false
  } catch (error) {
    console.error('Error actualizando nombre:', error)
    showToast(error.message || 'Error al actualizar nombre', 'error')
  } finally {
    isLoading.value = false
  }
}

// Funciones para gestión de contraseña
const startEditingPassword = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  isEditingPassword.value = true
}

const cancelEditingPassword = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  isEditingPassword.value = false
}

const savePassword = async () => {
  if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    showToast('Todos los campos son obligatorios', 'error')
    return
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    showToast('Las contraseñas no coinciden', 'error')
    return
  }

  if (passwordForm.newPassword.length < 6) {
    showToast('La nueva contraseña debe tener al menos 6 caracteres', 'error')
    return
  }

  isLoading.value = true
  try {
    await userStore.changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    })
    showToast('Contraseña actualizada exitosamente', 'success')
    cancelEditingPassword()
  } catch (error) {
    console.error('Error actualizando contraseña:', error)
    showToast(error.message || 'Error al actualizar contraseña', 'error')
  } finally {
    isLoading.value = false
  }
}

// Función para cerrar sesión
const handleLogout = () => {
  userStore.logout()
  navigateTo('/auth/login')
}

// Funciones para eliminar cuenta
const confirmDelete = () => {
  deleteForm.confirmText = ''
  deleteForm.password = ''
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  deleteForm.confirmText = ''
  deleteForm.password = ''
  showDeleteConfirm.value = false
}

const deleteAccount = async () => {
  if (deleteForm.confirmText !== 'ELIMINAR') {
    showToast('Debes escribir "ELIMINAR" para confirmar', 'error')
    return
  }

  if (!deleteForm.password) {
    showToast('Debes introducir tu contraseña', 'error')
    return
  }

  isLoading.value = true
  try {
    // Llamar a la API para eliminar la cuenta
    const response = await UserAPI.deleteOwnAccount(deleteForm.password)
    
    if (response.success) {
      // Cerrar el modal de confirmación
      showDeleteConfirm.value = false
      
      // Limpiar el formulario
      deleteForm.confirmText = ''
      deleteForm.password = ''
      
      // Mostrar toast de éxito
      showToast('Cuenta eliminada exitosamente', 'success')
      
      // Limpiar completamente el estado de autenticación
      userStore.logout()
      
      // Limpiar localStorage manualmente para asegurar que no queden residuos
      if (process.client) {
        localStorage.removeItem('AUTH_TOKEN')
        localStorage.removeItem('user')
        sessionStorage.clear()
      }
      
      // Redirigir usando navigateTo con replace para evitar problemas con el historial
      // Pequeño delay para que se vea el toast
      setTimeout(async () => {
        await navigateTo('/auth/register', { replace: true })
      }, 1500)
    } else {
      showToast(response.message || 'Error al eliminar cuenta', 'error')
    }
  } catch (error) {
    console.error('Error eliminando cuenta:', error)
    
    // Manejar errores específicos
    if (error.status === 401) {
      showToast('Contraseña incorrecta', 'error')
    } else if (error.status === 404) {
      showToast('Usuario no encontrado', 'error')
    } else {
      showToast(error.message || 'Error al eliminar cuenta', 'error')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">Perfil de Usuario</h1>
      <p class="text-gray-400 mt-2">Gestiona tu cuenta y configuración personal</p>
    </div>

    <!-- Información básica del usuario -->
    <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
          <span class="text-white font-bold text-2xl">
            {{ userStore.userName?.charAt(0)?.toUpperCase() || 'U' }}
          </span>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-white">{{ userStore.userName }}</h2>
          <p class="text-gray-400">{{ userStore.userEmail }}</p>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Cuenta verificada
          </span>
        </div>
      </div>
    </div>

    <!-- Gestión de nombre -->
    <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 class="text-lg font-semibold text-white mb-4">Nombre de perfil</h3>
      
      <div v-if="!isEditingName" class="flex items-center justify-between">
        <div>
          <p class="text-white font-medium">{{ userStore.userName }}</p>
          <p class="text-gray-400 text-sm">Este es tu nombre de visualización en la aplicación</p>
        </div>
        <button
          @click="startEditingName"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Cambiar nombre
        </button>
      </div>

      <div v-else class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white mb-2">Nuevo nombre</label>
          <input
            v-model="nameForm.name"
            type="text"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tu nuevo nombre"
          />
        </div>
        <div class="flex space-x-3">
          <button
            @click="saveName"
            :disabled="isLoading"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {{ isLoading ? 'Guardando...' : 'Guardar' }}
          </button>
          <button
            @click="cancelEditingName"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Gestión de contraseña -->
    <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 class="text-lg font-semibold text-white mb-4">Contraseña</h3>
      
      <div v-if="!isEditingPassword" class="flex items-center justify-between">
        <div>
          <p class="text-white font-medium">••••••••</p>
          <p class="text-gray-400 text-sm">Última actualización hace tiempo</p>
        </div>
        <button
          @click="startEditingPassword"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Cambiar contraseña
        </button>
      </div>

      <div v-else class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white mb-2">Contraseña actual</label>
          <input
            v-model="passwordForm.currentPassword"
            type="password"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tu contraseña actual"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white mb-2">Nueva contraseña</label>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tu nueva contraseña"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white mb-2">Confirmar nueva contraseña</label>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirma tu nueva contraseña"
          />
        </div>
        <div class="flex space-x-3">
          <button
            @click="savePassword"
            :disabled="isLoading"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {{ isLoading ? 'Guardando...' : 'Actualizar contraseña' }}
          </button>
          <button
            @click="cancelEditingPassword"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Acciones de cuenta -->
    <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 class="text-lg font-semibold text-white mb-4">Acciones de cuenta</h3>
      
      <div class="space-y-4">
        <!-- Cerrar sesión -->
        <div class="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <p class="text-white font-medium">Cerrar sesión</p>
            <p class="text-gray-400 text-sm">Salir de tu cuenta en este dispositivo</p>
          </div>
          <button
            @click="handleLogout"
            class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        <!-- Eliminar cuenta -->
        <div class="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div>
            <p class="text-red-400 font-medium">Eliminar cuenta</p>
            <p class="text-gray-400 text-sm">Esta acción es irreversible y eliminará todos tus datos</p>
          </div>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación para eliminar cuenta -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">¿Eliminar cuenta?</h3>
          <p class="text-gray-400 text-sm">Esta acción es irreversible. Todos tus datos, dispositivos y configuraciones se perderán permanentemente.</p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-white mb-2">
              Escribe "ELIMINAR" para confirmar
            </label>
            <input
              v-model="deleteForm.confirmText"
              type="text"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="ELIMINAR"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-white mb-2">Confirma tu contraseña</label>
            <input
              v-model="deleteForm.password"
              type="password"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Tu contraseña actual"
            />
          </div>
        </div>

        <div class="flex space-x-3 mt-6">
          <button
            @click="deleteAccount"
            :disabled="isLoading"
            class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {{ isLoading ? 'Eliminando...' : 'Eliminar definitivamente' }}
          </button>
          <button
            @click="cancelDelete"
            class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 