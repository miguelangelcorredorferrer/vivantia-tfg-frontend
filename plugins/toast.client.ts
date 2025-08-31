import Toast, { POSITION, type PluginOptions } from "vue-toastification"
import "vue-toastification/dist/index.css"

export default defineNuxtPlugin((nuxtApp): { provide: { toast: any } } => {
  const options: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    toastClassName: "custom-toast",
    bodyClassName: "custom-toast-body",
    containerClassName: "custom-toast-container",
    transition: "Vue-Toastification__bounce",
    maxToasts: 10,
    newestOnTop: true
  }
  
  nuxtApp.vueApp.use(Toast, options)
  
  // Hacer el toast disponible globalmente
  return {
    provide: {
      toast: nuxtApp.vueApp.config.globalProperties.$toast
    }
  }
}) 