// Script de prueba para verificar endpoints del dashboard
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001/api';

// Función para probar los endpoints
async function testDashboardEndpoints() {
  console.log('🧪 Probando endpoints del dashboard...\n');

  try {
    // 1. Probar obtener último dato (con cambios porcentuales)
    console.log('1️⃣ Probando GET /sensor-readings/dashboard/latest/:device_id');
    const latestResponse = await fetch(`${BASE_URL}/sensor-readings/dashboard/latest/1`);
    const latestData = await latestResponse.json();
    
    if (latestResponse.ok) {
      console.log('✅ Último dato obtenido:', {
        temperature: latestData.data.temperature,
        humidity: latestData.data.humidity,
        received_at: latestData.data.received_at,
        changes: latestData.data.changes
      });
    } else {
      console.log('❌ Error:', latestData.message);
    }

    console.log('\n2️⃣ Probando GET /sensor-readings/dashboard/history/:device_id');
    const historyResponse = await fetch(`${BASE_URL}/sensor-readings/dashboard/history/1?hours=24&limit=10`);
    const historyData = await historyResponse.json();
    
    if (historyResponse.ok) {
      console.log('✅ Datos históricos obtenidos:', {
        count: historyData.count,
        first_record: historyData.data[0] ? {
          temperature: historyData.data[0].temperature,
          humidity: historyData.data[0].humidity,
          received_at: historyData.data[0].received_at
        } : 'No hay datos',
        last_record: historyData.data[historyData.data.length - 1] ? {
          temperature: historyData.data[historyData.data.length - 1].temperature,
          humidity: historyData.data[historyData.data.length - 1].humidity,
          received_at: historyData.data[historyData.data.length - 1].received_at
        } : 'No hay datos'
      });
    } else {
      console.log('❌ Error:', historyData.message);
    }

    console.log('\n3️⃣ Probando GET /sensor-readings/dashboard/new/:device_id');
    const now = new Date().toISOString();
    const newResponse = await fetch(`${BASE_URL}/sensor-readings/dashboard/new/1?since=${now}`);
    const newData = await newResponse.json();
    
    if (newResponse.ok) {
      console.log('✅ Datos nuevos obtenidos:', {
        count: newData.count,
        message: newData.message
      });
    } else {
      console.log('❌ Error:', newData.message);
    }

  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

// Ejecutar pruebas
testDashboardEndpoints(); 