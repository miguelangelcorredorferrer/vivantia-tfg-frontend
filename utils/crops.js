// Datos de prueba para cultivos
export const sampleCrops = [
  {
    id: 1,
    name: 'Tomate',
    description: 'Tomate rojo tradicional, ideal para ensaladas y salsas',
    category: 'Hortalizas',
    minHumidity: 60,
    maxHumidity: 80,
    maxTemperature: 28,
    waterPumpActive: false,
    isSelected: false,
    growthDays: 90,
    harvestSeason: 'Verano',
    image: '/images/crops/tomato.jpg'
  },
  {
    id: 2,
    name: 'Lechuga',
    description: 'Lechuga verde fresca, perfecta para ensaladas',
    category: 'Hortalizas',
    minHumidity: 70,
    maxHumidity: 85,
    maxTemperature: 22,
    waterPumpActive: true,
    isSelected: true,
    growthDays: 45,
    harvestSeason: 'Primavera/Otoño',
    image: '/images/crops/lettuce.jpg'
  },
  {
    id: 3,
    name: 'Pepino',
    description: 'Pepino largo, refrescante y crujiente',
    category: 'Hortalizas',
    minHumidity: 65,
    maxHumidity: 85,
    maxTemperature: 30,
    waterPumpActive: false,
    isSelected: false,
    growthDays: 70,
    harvestSeason: 'Verano',
    image: '/images/crops/cucumber.jpg'
  },
  {
    id: 4,
    name: 'Zanahoria',
    description: 'Zanahoria naranja dulce, rica en vitamina A',
    category: 'Raíces',
    minHumidity: 55,
    maxHumidity: 75,
    maxTemperature: 25,
    waterPumpActive: false,
    isSelected: false,
    growthDays: 120,
    harvestSeason: 'Otoño/Invierno',
    image: '/images/crops/carrot.jpg'
  },
  {
    id: 5,
    name: 'Pimiento',
    description: 'Pimiento rojo dulce, perfecto para guisos',
    category: 'Hortalizas',
    minHumidity: 60,
    maxHumidity: 80,
    maxTemperature: 32,
    waterPumpActive: false,
    isSelected: false,
    growthDays: 100,
    harvestSeason: 'Verano',
    image: '/images/crops/pepper.jpg'
  },
  {
    id: 6,
    name: 'Espinaca',
    description: 'Espinaca verde tierna, rica en hierro',
    category: 'Hortalizas de hoja',
    minHumidity: 65,
    maxHumidity: 80,
    maxTemperature: 20,
    waterPumpActive: false,
    isSelected: false,
    growthDays: 40,
    harvestSeason: 'Primavera/Otoño',
    image: '/images/crops/spinach.jpg'
  },
  {
    id: 7,
    name: 'Calabacín',
    description: 'Calabacín verde versátil para múltiples preparaciones',
    category: 'Calabazas',
    minHumidity: 60,
    maxHumidity: 75,
    maxTemperature: 28,
    waterPumpActive: false,
    isSelected: false,
    growthDays: 60,
    harvestSeason: 'Verano',
    image: '/images/crops/zucchini.jpg'
  },
  {
    id: 8,
    name: 'Brócoli',
    description: 'Brócoli verde nutritivo, rico en vitaminas',
    category: 'Crucíferas',
    minHumidity: 70,
    maxHumidity: 85,
    maxTemperature: 24,
    waterPumpActive: false,
    isSelected: false,
    growthDays: 80,
    harvestSeason: 'Otoño/Invierno',
    image: '/images/crops/broccoli.jpg'
  },
  {
    id: 9,
    name: 'Albahaca',
    description: 'Albahaca aromática, ideal para condimentar',
    category: 'Hierbas',
    minHumidity: 55,
    maxHumidity: 70,
    maxTemperature: 30,
    waterPumpActive: false,
    isSelected: false,
    growthDays: 30,
    harvestSeason: 'Verano',
    image: '/images/crops/basil.jpg'
  },
  {
    id: 10,
    name: 'Rábano',
    description: 'Rábano rojo pequeño y picante',
    category: 'Raíces',
    minHumidity: 60,
    maxHumidity: 75,
    maxTemperature: 22,
    waterPumpActive: false,
    isSelected: false,
    growthDays: 25,
    harvestSeason: 'Primavera/Otoño',
    image: '/images/crops/radish.jpg'
  }
]

// Categorías disponibles
export const cropCategories = [
  'Todas',
  'Hortalizas',
  'Raíces',
  'Hortalizas de hoja',
  'Calabazas',
  'Crucíferas',
  'Hierbas'
]

// Funciones utilitarias
export const getCropById = (id) => {
  return sampleCrops.find(crop => crop.id === id)
}

export const getSelectedCrop = () => {
  return sampleCrops.find(crop => crop.isSelected)
}

export const getCropsByCategory = (category) => {
  if (category === 'Todas') return sampleCrops
  return sampleCrops.filter(crop => crop.category === category)
}

export const filterCrops = (crops, filters) => {
  return crops.filter(crop => {
    const matchesName = !filters.name || 
      crop.name.toLowerCase().includes(filters.name.toLowerCase())
    
    const matchesCategory = !filters.category || 
      filters.category === 'Todas' || 
      crop.category === filters.category
    
    const matchesMinHumidity = !filters.minHumidity || 
      crop.minHumidity >= parseInt(filters.minHumidity)
    
    const matchesMaxHumidity = !filters.maxHumidity || 
      crop.maxHumidity <= parseInt(filters.maxHumidity)
    
    const matchesMaxTemp = !filters.maxTemperature || 
      crop.maxTemperature <= parseInt(filters.maxTemperature)
    
    return matchesName && matchesCategory && matchesMinHumidity && 
           matchesMaxHumidity && matchesMaxTemp
  })
}

// Estados de la bomba de agua
export const pumpStates = {
  active: 'Activa',
  inactive: 'Inactiva',
  scheduled: 'Programada'
}

// Temporadas de cultivo
export const seasons = [
  'Primavera',
  'Verano', 
  'Otoño',
  'Invierno',
  'Todo el año'
] 