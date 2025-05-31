require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const { 
  createMarca, 
  getAllMarcas, 
  getMarcaById, 
  updateMarca 
} = require('./src/app/controllers/marcaController');

const { 
  createCelular, 
  getAllCelulares, 
  getCelularById, 
  updateCelular 
} = require('./src/app/controllers/celularController');

const { 
  createCategoria, 
  getAllCategorias, 
  getCategoriaById, 
  updateCategoria 
} = require('./src/app/controllers/categoriaController');

const { 
  createCliente, 
  getAllClientes, 
  getClienteById, 
  updateCliente 
} = require('./src/app/controllers/clienteController');

const { 
  createPedido, 
  getAllPedidos, 
  getPedidoById, 
  updatePedido 
} = require('./src/app/controllers/pedidoController');


const app = express();
app.use(cors());
app.use(express.json());

// Configuración de PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Ruta de prueba de conexión a DB
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({
      status: 'success',
      dbTime: result.rows[0].current_time,
      message: 'Conexión a PostgreSQL exitosa!'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error conectando a PostgreSQL',
      error: err.message
    });
  }
});

// Ruta básica
app.get('/', (req, res) => {
  res.json({
    app: process.env.APP_NAME || 'node-api',
    status: 'running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Marcas
app.post('/marcas', createMarca);
app.get('/marcas', getAllMarcas);
app.get('/marcas/:id', getMarcaById);
app.put('/marcas/:id', updateMarca);

// Celulares
app.post('/celulares', createCelular);
app.get('/celulares', getAllCelulares);
app.get('/celulares/:id', getCelularById);
app.put('/celulares/:id', updateCelular);

// Categorias
app.post('/categorias', createCategoria);
app.get('/categorias', getAllCategorias);
app.get('/categorias/:id', getCategoriaById);
app.put('/categorias/:id', updateCategoria);

// Clientes
app.post('/clientes', createCliente);
app.get('/clientes', getAllClientes);
app.get('/clientes/:id', getClienteById);
app.put('/clientes/:id', updateCliente);

// Pedidos
app.post('/pedidos', createPedido);
app.get('/pedidos', getAllPedidos);
app.get('/pedidos/:id', getPedidoById);
app.put('/pedidos/:id', updatePedido);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// const config = require('./config');
// const Keycloak = require('keycloak-connect');
// const session = require('express-session');

// const app = express();

// // Middlewares básicos
// app.use(cors());
// app.use(express.json());

// // Configuración de sesión para Keycloak
// const memoryStore = new session.MemoryStore();
// app.use(session({
//   secret: config.app.name,
//   resave: false,
//   saveUninitialized: true,
//   store: memoryStore
// }));

// // Configuración de Keycloak
// const keycloak = new Keycloak({ store: memoryStore }, {
//   realm: config.keycloak.realm,
//   'auth-server-url': config.keycloak.baseUrl,
//   'ssl-required': 'external',
//   resource: config.keycloak.clientId,
//   'bearer-only': true,
//   'confidential-port': 0,
//   credentials: {
//     secret: config.keycloak.clientSecret
//   }
// });
// app.use(keycloak.middleware());

// // Conexión a PostgreSQL principal
// const mainPool = new Pool({
//   user: config.database.main.username,
//   host: config.database.main.host,
//   database: config.database.main.database,
//   password: config.database.main.password,
//   port: config.database.main.port
// });

// // Conexión a PostgreSQL de Keycloak (si es necesaria)
// const keycloakPool = new Pool({
//   user: config.database.keycloak.username,
//   host: config.database.keycloak.host,
//   database: config.database.keycloak.database,
//   password: config.database.keycloak.password,
//   port: config.database.keycloak.port
// });

// // Ruta de prueba pública
// app.get('/', (req, res) => {
//   res.send(`${config.app.name} funcionando en modo ${config.app.env}`);
// });

// // Ruta de prueba protegida con Keycloak
// app.get('/protected', keycloak.protect(), (req, res) => {
//   res.json({ message: 'Ruta protegida', user: req.kauth.grant.access_token.content });
// });

// // Ruta para verificar conexión a la base de datos
// app.get('/health', async (req, res) => {
//   try {
//     await mainPool.query('SELECT 1');
//     res.json({ 
//       status: 'OK',
//       database: 'Conectado',
//       keycloak: config.keycloak.baseUrl
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       status: 'Error',
//       database: 'No conectado',
//       error: err.message 
//     });
//   }
// });

// // Manejo de errores
// app.use((err, req, res, next) => {
//   if (config.app.debug) {
//     console.error(err.stack);
//     res.status(500).json({ 
//       error: err.message,
//       stack: err.stack 
//     });
//   } else {
//     res.status(500).send('Algo salió mal!');
//   }
// });

// app.listen(config.app.port, () => {
//   console.log(`
//   Servidor ${config.app.name} corriendo en ${config.app.url}:${config.app.port}
//   Entorno: ${config.app.env}
//   Base de datos: ${config.database.main.database}@${config.database.main.host}
//   Keycloak: ${config.keycloak.baseUrl}/realms/${config.keycloak.realm}
//   `);
// });