// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api'
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  css: ['~/assets/css/main.css', '~/assets/css/toast.css'],

  tailwindcss: {
    viewer: false
  },

  devServer: {
    port: 3000,
    host: 'localhost'
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;'
        }
      }
    },
    // Configuración para mejorar compatibilidad con CommonJS
    optimizeDeps: {
      include: ['vue-toastification']
    },
    ssr: {
      noExternal: ['vue-toastification']
    }
  },

  // Configuración para Vercel
  nitro: {
    preset: 'vercel',
    // Evitar errores 404 de builds/meta
    experimental: {
      wasm: true
    },
    // Configuración específica para evitar errores de build meta
    routeRules: {
      '/_nuxt/builds/meta/**': { redirect: '/404' }
    }
  },

  // Ignorar la carpeta server para evitar conflictos con Nuxt
  ignore: [
    'server/**'
  ]
})