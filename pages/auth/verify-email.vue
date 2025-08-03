<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'public'
})

const router = useRouter()

const goToLogin = () => {
  router.push('/auth/login')
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
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Verifica tu cuenta</h1>
          <p class="text-gray-600">Revisa tu correo electrónico</p>
        </div>

        <!-- Mensaje principal -->
        <div class="text-center mb-8">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">¡Revisa tu email!</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Hemos enviado un enlace de verificación a tu correo electrónico. 
              Haz clic en el enlace para verificar tu cuenta y poder acceder a Vivantia IoT Solutions.
            </p>
          </div>
        </div>

        <!-- Botón para volver al login -->
        <div class="space-y-4">
          <button
            @click="goToLogin"
            class="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Volver al inicio de sesión
          </button>
        </div>

        <!-- Información adicional -->
        <div class="mt-6 text-center">
          <p class="text-xs text-gray-500">
            ¿No recibiste el email? Revisa tu carpeta de spam o 
            <NuxtLink to="/auth/register" class="text-blue-600 hover:text-blue-700 font-medium">
              regístrate nuevamente
            </NuxtLink>
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

