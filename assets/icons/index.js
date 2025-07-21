import { h } from 'vue'

// Iconos de navegación
export const dashboardIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-5 h-5'
}, [
  h('path', { d: 'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' })
])

export const devicesIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
  class: 'w-5 h-5'
}, [
  h('path', { d: 'M21 8H17.8174M21 12H18M21 16H17.8174M6.18257 8H3M8 6.18257V3M8 21L8 17.8174M12 6V3M12 21V18M16 6.18257V3M16 21V17.8174M6 12H3M6.18257 16H3M10.8 18H13.2C14.8802 18 15.7202 18 16.362 17.673C16.9265 17.3854 17.3854 16.9265 17.673 16.362C18 15.7202 18 14.8802 18 13.2V10.8C18 9.11984 18 8.27976 17.673 7.63803C17.3854 7.07354 16.9265 6.6146 16.362 6.32698C15.7202 6 14.8802 6 13.2 6H10.8C9.11984 6 8.27976 6 7.63803 6.32698C7.07354 6.6146 6.6146 7.07354 6.32698 7.63803C6 8.27976 6 9.11984 6 10.8V13.2C6 14.8802 6 15.7202 6.32698 16.362C6.6146 16.9265 7.07354 17.3854 7.63803 17.673C8.27976 18 9.11984 18 10.8 18ZM10 10H14V14H10V10Z' })
])

export const plantIcon = () => h('svg', {
  fill: 'currentColor',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-5 h-5'
}, [
  // Hoja derecha superior
  h('path', { d: 'M10.89,12a1,1,0,0,1-.75-.34,1,1,0,0,1-.24-.78c.41-3.27,2.93-9.44,9.56-9.44a1,1,0,0,1,1,.87,9.42,9.42,0,0,1-2,6.84C16.75,11.05,14.22,12,10.89,12Zm7.6-8.51C14.23,4,12.66,7.94,12.13,10a7,7,0,0,0,4.79-2.12A7,7,0,0,0,18.49,3.5Z' }),
  // Hoja izquierda superior  
  h('path', { d: 'M10.89,12h-.12c-2.51-.32-7.26-2.26-7.26-7.38a1,1,0,0,1,.88-1A7.26,7.26,0,0,1,9.68,5.2,7.33,7.33,0,0,1,11.89,11a1,1,0,0,1-1,1ZM5.6,5.61c.48,2.57,2.76,3.67,4.21,4.12a4.72,4.72,0,0,0-1.44-3A4.81,4.81,0,0,0,5.6,5.61Z' }),
  // Tallo principal
  h('path', { d: 'M10.89,16.18a1,1,0,0,1-1-1V11a1,1,0,1,1,2,0v4.17A1,1,0,0,1,10.89,16.18Z' }),
  // Maceta
  h('path', { d: 'M13.55,22.55H8.63a4,4,0,0,1-4-4V15.18a1,1,0,0,1,1-1H16.55a1,1,0,0,1,1,1v3.37A4,4,0,0,1,13.55,22.55ZM6.63,16.18v2.37a2,2,0,0,0,2,2h4.92a2,2,0,0,0,2-2V16.18Z' })
])

export const plantConfigIcon = () => h('svg', {
  fill: 'currentColor',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-12 h-12 text-green-500'
}, [
  // Hoja derecha superior
  h('path', { d: 'M10.89,12a1,1,0,0,1-.75-.34,1,1,0,0,1-.24-.78c.41-3.27,2.93-9.44,9.56-9.44a1,1,0,0,1,1,.87,9.42,9.42,0,0,1-2,6.84C16.75,11.05,14.22,12,10.89,12Zm7.6-8.51C14.23,4,12.66,7.94,12.13,10a7,7,0,0,0,4.79-2.12A7,7,0,0,0,18.49,3.5Z' }),
  // Hoja izquierda superior  
  h('path', { d: 'M10.89,12h-.12c-2.51-.32-7.26-2.26-7.26-7.38a1,1,0,0,1,.88-1A7.26,7.26,0,0,1,9.68,5.2,7.33,7.33,0,0,1,11.89,11a1,1,0,0,1-1,1ZM5.6,5.61c.48,2.57,2.76,3.67,4.21,4.12a4.72,4.72,0,0,0-1.44-3A4.81,4.81,0,0,0,5.6,5.61Z' }),
  // Tallo principal
  h('path', { d: 'M10.89,16.18a1,1,0,0,1-1-1V11a1,1,0,1,1,2,0v4.17A1,1,0,0,1,10.89,16.18Z' }),
  // Maceta
  h('path', { d: 'M13.55,22.55H8.63a4,4,0,0,1-4-4V15.18a1,1,0,0,1,1-1H16.55a1,1,0,0,1,1,1v3.37A4,4,0,0,1,13.55,22.55ZM6.63,16.18v2.37a2,2,0,0,0,2,2h4.92a2,2,0,0,0,2-2V16.18Z' })
])

export const analyticsIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-5 h-5'
}, [
  h('path', { d: 'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' })
])

export const settingsIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-5 h-5'
}, [
  h('path', { 'fill-rule': 'evenodd', d: 'M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z', 'clip-rule': 'evenodd' })
])

export const homeIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-4 h-4'
}, [
  h('path', { d: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' })
])

// Iconos de sensores para dashboard
export const thermometerIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6 text-white'
}, [
  h('path', { d: 'M12 9C11.1077 8.98562 10.2363 9.27003 9.52424 9.808C8.81222 10.346 8.30055 11.1066 8.07061 11.9688C7.84068 12.8311 7.90568 13.7455 8.25529 14.5665C8.6049 15.3876 9.21904 16.0682 10 16.5M12 3V5M6.6 18.4L5.2 19.8M4 13H2M6.6 7.6L5.2 6.2M20 14.5351V4C20 2.89543 19.1046 2 18 2C16.8954 2 16 2.89543 16 4V14.5351C14.8044 15.2267 14 16.5194 14 18C14 20.2091 15.7909 22 18 22C20.2091 22 22 20.2091 22 18C22 16.5194 21.1956 15.2267 20 14.5351Z' })
])

export const humidityIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6 text-white'
}, [
  h('path', { d: 'M12 21.5C16.1012 21.5 19.5 18.4372 19.5 14.5714C19.5 12.1555 18.2672 9.71249 16.8732 7.70906C15.4698 5.69214 13.8515 4.04821 12.9778 3.21778C12.4263 2.69364 11.5737 2.69364 11.0222 3.21779C10.1485 4.04821 8.53016 5.69214 7.1268 7.70906C5.73282 9.71249 4.5 12.1555 4.5 14.5714C4.5 18.4372 7.8988 21.5 12 21.5Z' }),
  h('path', { d: 'M12 18C11.4747 18 10.9546 17.8965 10.4693 17.6955C9.98396 17.4945 9.54301 17.1999 9.17157 16.8284C8.80014 16.457 8.5055 16.016 8.30448 15.5307C8.10346 15.0454 8 14.5253 8 14', 'stroke-linecap': 'round' })
])

// Iconos para StatsCard
export const devicesStatsIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-6 h-6'
}, [
  h('path', { 'fill-rule': 'evenodd', d: 'M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z', 'clip-rule': 'evenodd' })
])

export const temperatureStatsIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-6 h-6'
}, [
  h('path', { 'fill-rule': 'evenodd', d: 'M10 2a4 4 0 00-4 4v4a6 6 0 1012 0V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v6.5a4 4 0 11-4 0V6z', 'clip-rule': 'evenodd' })
])

export const energyIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-6 h-6'
}, [
  h('path', { 'fill-rule': 'evenodd', d: 'M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z', 'clip-rule': 'evenodd' })
])

export const alertsIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-6 h-6'
}, [
  h('path', { 'fill-rule': 'evenodd', d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z', 'clip-rule': 'evenodd' })
])

// Iconos para cultivos
export const closeIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
  class: 'w-3 h-3 text-gray-400'
}, [
  h('path', { d: 'M18 6L6 18M6 6l12 12' })
])

export const checkIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
  class: 'w-3 h-3 text-green-600'
}, [
  h('path', { d: 'M20 6L9 17l-5-5' })
])

export const infoIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-4 h-4 text-blue-400'
}, [
  h('path', { 'fill-rule': 'evenodd', d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z', 'clip-rule': 'evenodd' })
])

export const editIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
  class: 'w-4 h-4'
}, [
  h('path', { d: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' }),
  h('path', { d: 'M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' })
])

export const deleteIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
  class: 'w-4 h-4'
}, [
  h('path', { d: 'M3 6h18' }),
  h('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }),
  h('line', { x1: '10', y1: '11', x2: '10', y2: '17' }),
  h('line', { x1: '14', y1: '11', x2: '14', y2: '17' })
])

export const searchIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
  class: 'w-5 h-5'
}, [
  h('circle', { cx: '11', cy: '11', r: '8' }),
  h('path', { d: 'M21 21L16.65 16.65' })
])

export const filterIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
  class: 'w-4 h-4 text-green-500'
}, [
  h('polygon', { points: '22,3 2,3 10,12.46 10,19 14,21 14,12.46' })
])

export const clearFiltersIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
  class: 'w-4 h-4'
}, [
  h('path', { d: 'M3 6h18l-6 6v7l-6-2v-5z' }),
  h('path', { d: 'M18 6L6 18' })
])

export const dangerIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-6 h-6 text-red-600'
}, [
  h('path', { 'fill-rule': 'evenodd', d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z', 'clip-rule': 'evenodd' })
])

export const warningIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-5 h-5 text-yellow-500 flex-shrink-0 mr-2 mt-0.5'
}, [
  h('path', { 'fill-rule': 'evenodd', d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z', 'clip-rule': 'evenodd' })
])

export const cancelIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
  class: 'w-4 h-4 mr-2'
}, [
  h('path', { d: 'M18 6L6 18M6 6l12 12' })
])

export const wateringIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-5 h-5'
}, [
  // Regadera
  h('path', { d: 'M16 6H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 5c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-3 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-3 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-3 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z' }),
  // Gotas de agua
  h('path', { d: 'M6 15c-.3.6-.3 1.4 0 2 .3.6.9.6 1.2 0 .3-.6.3-1.4 0-2-.3-.6-.9-.6-1.2 0zm3 0c-.3.6-.3 1.4 0 2 .3.6.9.6 1.2 0 .3-.6.3-1.4 0-2-.3-.6-.9-.6-1.2 0zm3 0c-.3.6-.3 1.4 0 2 .3.6.9.6 1.2 0 .3-.6.3-1.4 0-2-.3-.6-.9-.6-1.2 0zm3 0c-.3.6-.3 1.4 0 2 .3.6.9.6 1.2 0 .3-.6.3-1.4 0-2-.3-.6-.9-.6-1.2 0z' })
])

// Función helper para obtener iconos por nombre
export const getIcon = (iconName) => {
  const icons = {
    dashboard: dashboardIcon,
    devices: devicesIcon,
    plant: plantIcon,
    plantConfig: plantConfigIcon,
    widgets: plantIcon, // Alias para compatibilidad
    cultivos: plantIcon, // Alias para compatibilidad
    watering: wateringIcon,
    analytics: analyticsIcon,
    settings: settingsIcon,
    home: homeIcon,
    thermometer: thermometerIcon,
    humidity: humidityIcon,
    // Iconos de StatsCard
    devicesStats: devicesStatsIcon,
    temperature: temperatureStatsIcon,
    energy: energyIcon,
    alerts: alertsIcon,
    // Iconos para cultivos
    close: closeIcon,
    check: checkIcon,
    info: infoIcon,
    notes: () => h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
      h('polyline', { points: '14,2 14,8 20,8' }),
      h('line', { x1: '16', y1: '13', x2: '8', y2: '13' }),
      h('line', { x1: '16', y1: '17', x2: '8', y2: '17' }),
      h('polyline', { points: '10,9 9,9 8,9' })
    ]),
    edit: editIcon,
    delete: deleteIcon,
    search: searchIcon,
    filter: filterIcon,
    clearFilters: clearFiltersIcon,
    danger: dangerIcon,
    warning: warningIcon,
    cancel: cancelIcon,
    breadcrumbArrow: () => h('svg', {
      fill: 'currentColor',
      viewBox: '0 0 20 20',
      class: 'w-6 h-6'
    }, [
      h('path', { 'fill-rule': 'evenodd', d: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z', 'clip-rule': 'evenodd' })
    ]),
    back: () => h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', { d: 'M10 19l-7-7m0 0l7-7m-7 7h18' })
    ]),
    spinner: () => h('svg', {
      fill: 'none',
      viewBox: '0 0 24 24',
      class: 'w-5 h-5'
    }, [
      h('circle', { class: 'opacity-25', cx: '12', cy: '12', r: '10', stroke: 'currentColor', 'stroke-width': '4' }),
      h('path', { class: 'opacity-75', fill: 'currentColor', d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' })
    ])
  }
  
  return icons[iconName] || dashboardIcon
}

// Importar los nuevos iconos de componentes Vue
import HomeIcon from './HomeIcon.vue'
import ChevronRightIcon from './ChevronRightIcon.vue'
import ClockIcon from './ClockIcon.vue'
import CheckIcon from './CheckIcon.vue'
import PauseIcon from './PauseIcon.vue'
import CalendarIcon from './CalendarIcon.vue'
import ChevronLeftIcon from './ChevronLeftIcon.vue'
import ChevronRightSmallIcon from './ChevronRightSmallIcon.vue'
import ConfirmIcon from './ConfirmIcon.vue'
import WarningIcon from './WarningIcon.vue'
import ManualIcon from './ManualIcon.vue'
import ManualConfirmIcon from './ManualConfirmIcon.vue'
import AutomaticIcon from './AutomaticIcon.vue'
import ThermometerIcon from './ThermometerIcon.vue'
import HumidityIcon from './HumidityIcon.vue'
import AutomaticConfirmIcon from './AutomaticConfirmIcon.vue'
import DashboardIcon from './DashboardIcon.vue'
import PlantIcon from './PlantIcon.vue'
import FlowIcon from './FlowIcon.vue'
import ManualModeIcon from './ManualModeIcon.vue'
import ProgrammedModeIcon from './ProgrammedModeIcon.vue'
import AutomaticModeIcon from './AutomaticModeIcon.vue'
import EditIcon from './EditIcon.vue'
import NotesIcon from './NotesIcon.vue'
import UserIcon from './UserIcon.vue'
import DeviceIcon from './DeviceIcon.vue'
import WateringIcon from './WateringIcon.vue'

// Exportar los nuevos iconos como componentes Vue
export {
  HomeIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckIcon,
  PauseIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightSmallIcon,
  ConfirmIcon,
  WarningIcon,
  ManualIcon,
  ManualConfirmIcon,
  AutomaticIcon,
  ThermometerIcon,
  HumidityIcon,
  AutomaticConfirmIcon,
  DashboardIcon,
  PlantIcon,
  FlowIcon,
  ManualModeIcon,
  ProgrammedModeIcon,
  AutomaticModeIcon,
  EditIcon,
  NotesIcon,
  UserIcon,
  DeviceIcon,
  WateringIcon
}

// Exportar AlertsIcon como alias
export { alertsIcon as AlertsIcon }

// Exportar DeleteIcon como alias
export { deleteIcon as DeleteIcon } 