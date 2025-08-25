import fetch from 'node-fetch';

console.log('🧪 Probando endpoint de evaluación automática...');

const testEvaluateEndpoint = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/irrigation/automatic/evaluate/9', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.text();
    
    console.log('📊 Status:', response.status);
    console.log('📝 Response:', result);
    
    if (response.ok) {
      console.log('✅ Endpoint funciona correctamente');
    } else {
      console.log('❌ Error en el endpoint');
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
};

testEvaluateEndpoint();
