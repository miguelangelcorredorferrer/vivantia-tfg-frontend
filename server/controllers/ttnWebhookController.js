import { createSensorReading } from '../services/sensorReadingService.js'
import DeviceValidationService from '../services/deviceValidationService.js'

// Webhook TTN - Capturar datos de sensores
const handleTTNUplink = async (req, res) => {
  try {
    console.log('📥 Webhook recibido');
    console.log('📋 Payload completo:', JSON.stringify(req.body, null, 2));
    
    const payload = req.body.uplink_message?.decoded_payload;
    const endDeviceIds = req.body.end_device_ids;
    const fPort = req.body.uplink_message?.f_port;
    
    console.log('📱 End Device IDs:', JSON.stringify(endDeviceIds, null, 2));
    console.log('🔌 F_Port:', fPort);
    
    if (!payload) {
      console.error('❌ Payload inválido');
      return res.status(400).send('Datos incompletos');
    }
    
    // Validar que el uplink viene del puerto 2
    if (fPort !== 2) {
      console.log(`⏭️ Uplink ignorado - F_Port ${fPort} no es 2`);
      return res.status(200).send('Uplink ignorado - puerto no válido');
    }
    
    // Validar dispositivo TTN
    const deviceValidation = await DeviceValidationService.validateTTNDevice(endDeviceIds); //
    
    if (!deviceValidation.isValid) {
      console.error('❌ Dispositivo no autorizado:', deviceValidation.message);
      return res.status(401).send('Dispositivo no autorizado');
    }
    
    const validatedDevice = deviceValidation.device;
    console.log('✅ Dispositivo autorizado:', validatedDevice.device_name); //
    
    console.log('🔍 Payload decodificado:', JSON.stringify(payload, null, 2));
    
    // Extraer datos - verificar nombres de campos
    const { temperature, humidity, soil_moisture, humedad, temp } = payload;
    
    console.log('🌡️ Datos extraídos:', { 
      temperature, 
      humidity, 
      soil_moisture, 
      humedad, 
      temp 
    });
    
    // Usar diferentes nombres de campos que pueden venir de TTN
    // Si no hay humidity, usar soil_moisture como humedad del suelo
    const finalTemperature = Number(temperature || temp) || null;
    const finalHumidity = Number(humidity || humedad || soil_moisture) || null;
    
    console.log('✅ Datos finales:', { 
      temperature: finalTemperature, 
      humidity: finalHumidity,
      soil_moisture: Number(soil_moisture) || null
    });
    
    // Preparar datos para guardar en PostgreSQL
    // Usar el device_id real del dispositivo validado
    const sensorData = {
      device_id: validatedDevice.id, // Device ID real del dispositivo autorizado //
      humidity: finalHumidity,
      temperature: finalTemperature
    };
    
    console.log('💾 Datos a guardar:', sensorData);
    
    // Usar el servicio para guardar en PostgreSQL directamente
    const savedReading = await createSensorReading(sensorData);
    console.log('💾 Dato guardado en BD:', savedReading);
    
    // Formatear datos para emitir a clientes (si usas Socket.IO)
    const newData = {
      temperature: finalTemperature,
      humidity: finalHumidity,
      soil_moisture: Number(soil_moisture) || null,
      timestamp: savedReading.created_at,
      device_id: validatedDevice.id,
      device_name: validatedDevice.device_name
    };
    
    // TODO: Emitir evento en tiempo real (si usas Socket.IO)
    // io.emit('sensorData', newData);
    console.log('📤 Dato preparado para emitir a clientes:', newData);
    
    res.status(200).send('Datos procesados correctamente');
  } catch (error) {
    console.error('❌ Error general en webhook:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export {
  handleTTNUplink
}; 