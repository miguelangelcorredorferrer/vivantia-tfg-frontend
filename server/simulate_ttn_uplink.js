import fetch from 'node-fetch';

console.log('🚀 Simulando uplink TTN que GARANTIZA activación del riego...');

// Crear payload TTN completo que simule datos de activación
const ttnPayload = {
  "end_device_ids": {
    "device_id": "sensor-riego-prueba",
    "application_ids": {
      "application_id": "vivantia-tfg"
    },
    "dev_eui": "70B3D57ED0060B72", // Debe coincidir con la BD
    "join_eui": "0000000000000000",
    "dev_addr": "260BDA1D"
  },
  "correlation_ids": [
    "as:up:01J68EWD8SQPRFNGS8ZF8J6G2H",
    "gs:conn:01J68DWVG8T73WRQZJX9FGJX7Y",
    "gs:up:host:01J68DWVGAB8N7CT2FJZ9VBKTH",
    "gs:uplink:01J68EWD8P73VNCMQH8QTPRN91",
    "ns:uplink:01J68EWD8P8ZFTMQ5PFZWZM3R1",
    "rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01J68EWD8P7VBH61PJ9A3PQ4VE",
    "rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01J68EWD8QQGTPK45NXHWWYK6F"
  ],
  "received_at": new Date().toISOString(),
  "uplink_message": {
    "session_key_id": "01J68DWVMD1W8NFZXQGCZ3J1Q1",
    "f_port": 2, // Puerto 2 para datos de sensores
    "f_cnt": Math.floor(Math.random() * 1000),
    "frm_payload": "AadRABcA", // Ejemplo de payload codificado
    "decoded_payload": {
      // DATOS QUE GARANTIZAN ACTIVACIÓN:
      // Temp: 37°C > 35°C (máximo) ✅
      // Aire: 35% < 40% (mínimo) ✅  
      // Suelo: -1% < 0% (mínimo) ✅
      "temperature_c": 37.0,   // > 35.00 máximo del cultivo
      "humidity_rh": 35.0,     // < 40.00 mínimo del cultivo  
      "soil_moisture_pct": -1.0 // < 0.00 mínimo del cultivo
    },
    "rx_metadata": [
      {
        "gateway_ids": {
          "gateway_id": "gateway-sim",
          "eui": "58A0CBFFFE800213"
        },
        "time": new Date().toISOString(),
        "timestamp": Math.floor(Date.now() / 1000),
        "rssi": -85,
        "channel_rssi": -85,
        "snr": 7.25,
        "uplink_token": "simulated_token",
        "channel_index": 0
      }
    ],
    "settings": {
      "data_rate": {
        "lora": {
          "bandwidth": 125000,
          "spreading_factor": 7
        }
      },
      "coding_rate": "4/5",
      "frequency": "868100000",
      "timestamp": Math.floor(Date.now() / 1000)
    },
    "received_at": new Date().toISOString(),
    "consumed_airtime": "0.061696s",
    "version_ids": {
      "brand_id": "arduino",
      "model_id": "mkrwan1310",
      "hardware_version": "1.0",
      "firmware_version": "1.0.0",
      "band_id": "EU_863_870"
    },
    "network_ids": {
      "net_id": "000013",
      "tenant_id": "ttn",
      "cluster_id": "eu1"
    }
  }
};

// Enviar el payload al webhook local
const webhookUrl = 'http://localhost:3001/api/ttn/uplink';

try {
  console.log('📡 Enviando payload TTN...');
  console.log('🔍 Datos de simulación:', ttnPayload.uplink_message.decoded_payload);
  
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ttnPayload)
  });

  const responseText = await response.text();
  
  if (response.ok) {
    console.log('✅ Uplink TTN enviado exitosamente');
    console.log('📝 Respuesta del webhook:', responseText);
    console.log('');
    console.log('🎯 Si todo funciona correctamente deberías ver:');
    console.log('   1. ✅ Dispositivo autorizado');
    console.log('   2. 💾 Datos guardados en BD');
    console.log('   3. 🤖 Evaluación de riego automático completada'); 
    console.log('   4. 🚰 Bomba activada (si hay configuración automática)');
  } else {
    console.error('❌ Error enviando uplink:', response.status, responseText);
  }

} catch (error) {
  console.error('❌ Error:', error.message);
}

process.exit(0);
