import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: './server/.env' });

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'vivantia_db',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 5432,
});

async function checkToken(token) {
  try {
    console.log('🔍 Verificando token:', token);
    
    // Buscar el token en la base de datos
    const query = 'SELECT id, email, name, role, token, verified, created_at FROM users WHERE token = $1';
    const result = await pool.query(query, [token]);
    
    if (result.rows.length === 0) {
      console.log('❌ Token no encontrado en la base de datos');
      
      // Buscar tokens similares
      const similarQuery = 'SELECT id, email, name, role, token, verified, created_at FROM users WHERE token LIKE $1';
      const similarResult = await pool.query(similarQuery, [`%${token.substring(0, 10)}%`]);
      
      if (similarResult.rows.length > 0) {
        console.log('🔍 Tokens similares encontrados:');
        similarResult.rows.forEach(user => {
          console.log(`- Usuario: ${user.email}, Token: ${user.token}, Verificado: ${user.verified}`);
        });
      }
    } else {
      console.log('✅ Token encontrado:');
      const user = result.rows[0];
      console.log(`- Usuario: ${user.email}`);
      console.log(`- Nombre: ${user.name}`);
      console.log(`- Role: ${user.role}`);
      console.log(`- Verificado: ${user.verified}`);
      console.log(`- Token: ${user.token}`);
      console.log(`- Creado: ${user.created_at}`);
    }
    
    // Mostrar todos los usuarios para debug
    const allUsersQuery = 'SELECT id, email, name, role, token, verified, created_at FROM users ORDER BY created_at DESC LIMIT 5';
    const allUsersResult = await pool.query(allUsersQuery);
    
    console.log('\n📋 Últimos 5 usuarios registrados:');
    allUsersResult.rows.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} - Verificado: ${user.verified} - Token: ${user.token || 'Sin token'}`);
    });
    
  } catch (error) {
    console.error('❌ Error al verificar token:', error.message);
  } finally {
    await pool.end();
  }
}

// Usar el token del problema
const token = '1j0rdhj6gv4u2m8f9feg';
checkToken(token); 