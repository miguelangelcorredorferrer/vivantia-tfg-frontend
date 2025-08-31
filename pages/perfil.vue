<script setup>
import { ref } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import UserAPI from '~/api/UserAPI'
import {
  UserInfo,
  NameEditor,
  PasswordEditor,
  AccountActions,
  DeleteAccountModal
} from '~/components/Profile'

// Configurar middleware
definePageMeta({
  middleware: ['auth', 'visitor-block']
})

// Stores
const userStore = useUserStore()
const { showToast } = useToastNotifications()

// Estados reactivos
const showDeleteConfirm = ref(false)
const isLoading = ref(false)

// Funciones para gestión de nombre
const handleSaveName = async (newName) => {
  if (!newName.trim()) {
    showToast('El nombre no puede estar vacío', 'error')
    return
  }

  isLoading.value = true
  try {
    // TODO: Implementar API para cambiar nombre
    console.log('Cambiar nombre a:', newName)
    showToast('Nombre actualizado exitosamente', 'success')
  } catch (error) {
    console.error('Error actualizando nombre:', error)
    showToast(error.message || 'Error al actualizar nombre', 'error')
  } finally {
    isLoading.value = false
  }
}

// Funciones para gestión de contraseña
const handleSavePassword = async (passwordData) => {
  if (!passwordData.currentPassword || !passwordData.newPassword) {
    showToast('Todos los campos son obligatorios', 'error')
    return
  }

  if (passwordData.newPassword.length < 6) {
    showToast('La nueva contraseña debe tener al menos 6 caracteres', 'error')
    return
  }

  isLoading.value = true
  try {
    await userStore.changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    })
    showToast('Contraseña actualizada exitosamente', 'success')
  } catch (error) {
    console.error('Error actualizando contraseña:', error)
    showToast(error.message || 'Error al actualizar contraseña', 'error')
  } finally {
    isLoading.value = false
  }
}

// Función para cerrar sesión
const handleLogout = async () => {
  await userStore.logout()
  navigateTo('/auth/login')
}

// Funciones para eliminar cuenta
const handleConfirmDelete = () => {
  showDeleteConfirm.value = true
}

const handleCancelDelete = () => {
  showDeleteConfirm.value = false
}

const handleDeleteAccount = async (deleteData) => {
  if (deleteData.confirmText !== 'ELIMINAR') {
    showToast('Debes escribir "ELIMINAR" para confirmar', 'error')
    return
  }

  if (!deleteData.password) {
    showToast('Debes introducir tu contraseña', 'error')
    return
  }

  isLoading.value = true
  try {
    // Llamar a la API para eliminar la cuenta
    const response = await UserAPI.deleteOwnAccount(deleteData.password)
    
    if (response.success) {
      // Cerrar el modal de confirmación
      showDeleteConfirm.value = false
      
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
    <UserInfo 
      :user-name="userStore.userName"
      :user-email="userStore.userEmail"
    />

    <!-- Gestión de nombre -->
    <NameEditor 
      :current-name="userStore.userName"
      :is-loading="isLoading"
      @save-name="handleSaveName"
      @cancel="() => {}"
    />

    <!-- Gestión de contraseña -->
    <PasswordEditor 
      :is-loading="isLoading"
      @save-password="handleSavePassword"
      @cancel="() => {}"
    />

    <!-- Acciones de cuenta -->
    <AccountActions 
      @logout="handleLogout"
      @confirm-delete="handleConfirmDelete"
    />

    <!-- Modal de confirmación para eliminar cuenta -->
    <DeleteAccountModal 
      :show="showDeleteConfirm"
      :is-loading="isLoading"
      @delete-account="handleDeleteAccount"
      @cancel="handleCancelDelete"
    />
  </div>
</template> 