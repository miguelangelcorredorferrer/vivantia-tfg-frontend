<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { useToastNotifications } from '~/composables/useToastNotifications'

// Configurar el layout de autenticación
definePageMeta({
  layout: 'auth',
  middleware: 'public'
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { toast } = useToastNotifications()

const token = route.params.token
const isVerifying = ref(true)
const isSuccess = ref(false)
const errorMessage = ref('')

// Verificar la cuenta al cargar la página
onMounted(async () => {
  try {
    await userStore.verifyAccount(token)
    isSuccess.value = true
    toast.success('¡Cuenta verificada exitosamente! Ya puedes iniciar sesión.')
    
    // Redirigir al login después de 3 segundos
    setTimeout(() => {
      router.push('/auth/login')
    }, 3000)
    
  } catch (error) {
    console.error('Error verificando cuenta:', error)
    isSuccess.value = false
    errorMessage.value = error.response?.data?.msg || 'Error al verificar la cuenta. El enlace puede haber expirado.'
    toast.error(errorMessage.value)
  } finally {
    isVerifying.value = false
  }
})

const goToLogin = () => {
  router.push('/auth/login')
}

const goToRegister = () => {
  router.push('/auth/register')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
    <div class="max-w-md w-full mx-4">
      <!-- Card principal -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <!-- Logo y título -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg v-if="isVerifying" class="w-8 h-8 text-white animate-spin" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
            </svg>
            <svg v-else-if="isSuccess" class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            {{ isVerifying ? 'Verificando cuenta...' : isSuccess ? '¡Cuenta verificada!' : 'Error de verificación' }}
          </h1>
          <p class="text-gray-600">
            {{ isVerifying ? 'Procesando tu verificación' : isSuccess ? 'Tu cuenta ha sido verificada exitosamente' : 'No se pudo verificar tu cuenta' }}
          </p>
        </div>

        <!-- Contenido dinámico -->
        <div class="text-center mb-8">
          <div v-if="isVerifying" class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600 text-sm">Verificando tu cuenta, por favor espera...</p>
          </div>

          <div v-else-if="isSuccess" class="bg-green-50 border border-green-200 rounded-lg p-6">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">¡Verificación exitosa!</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión y acceder a todas las funcionalidades de Vivantia IoT Solutions.
            </p>
          </div>

          <div v-else class="bg-red-50 border border-red-200 rounded-lg p-6">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Error de verificación</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              {{ errorMessage }}
            </p>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="space-y-4">
          <button
            v-if="isSuccess"
            @click="goToLogin"
            class="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Ir al inicio de sesión
          </button>

          <div v-else-if="!isVerifying" class="space-y-3">
            <button
              @click="goToLogin"
              class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Ir al inicio de sesión
            </button>
            
            <button
              @click="goToRegister"
              class="w-full bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Crear nueva cuenta
            </button>
          </div>
        </div>

        <!-- Información adicional -->
        <div class="mt-6 text-center">
          <p class="text-xs text-gray-500">
            ¿Necesitas ayuda? Contacta con nuestro soporte técnico.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8">
        <p class="text-sm text-gray-400">
          © 2024 Vivantia IoT Solutions. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 