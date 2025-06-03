# Node API - BitPhone

API RESTful para la gestión de celulares, marcas, categorías, clientes y pedidos, desarrollada en Node.js con Express y Prisma ORM, usando PostgreSQL como base de datos y soporte para Keycloak como autenticación externa.

## Estructura del Proyecto

```
.
├── .env
├── .gitignore
├── docker-compose.yaml
├── Dockerfile
├── index.js
├── nodemon.json
├── package.json
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── uploads/
├── src/
│   └── app/
│       └── controllers/
│           ├── categoriaController.js
│           ├── celularController.js
│           ├── clienteController.js
│           ├── marcaController.js
│           └── pedidoController.js
└── src/config/index.js
```

## Tecnologías

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- Multer (subida de imágenes)
- Keycloak (autenticación, preparado)
- UUID

## Instalación y Uso

### 1. Clonar el repositorio

```sh
git clone <repo-url>
cd node_api
```

### 2. Variables de entorno

Configura el archivo `.env` con los datos de conexión a la base de datos y Keycloak. Ejemplo incluido en el repo.

### 3. Instalación de dependencias

```sh
npm install
```

### 4. Uso con Docker

Levanta la API, PostgreSQL y Keycloak con:

```sh
docker-compose up --build
```

Esto expone la API en [http://localhost:3000](http://localhost:3000) y Keycloak en [http://localhost:8081](http://localhost:8081).

### 5. Migraciones y Prisma

Las migraciones se aplican automáticamente al iniciar el contenedor. Para generarlas manualmente:

```sh
npx prisma migrate dev --name init
```

## Scripts

- `npm run dev` — Inicia el servidor en modo desarrollo con nodemon.
- `npm start` — Inicia el servidor en modo producción.

## Endpoints Principales

### Marcas

- `POST   /marcas` — Crear marca
- `GET    /marcas` — Listar marcas
- `GET    /marcas/:id` — Obtener marca por ID
- `PUT    /marcas/:id` — Actualizar marca

### Celulares

- `POST   /celulares` — Crear celular (con imagen)
- `GET    /celulares` — Listar celulares
- `GET    /celulares/:id` — Obtener celular por ID
- `PUT    /celulares/:id` — Actualizar celular
- `PUT    /celulares/:id/con-imagen` — Actualizar celular con nueva imagen
- `PATCH  /celulares/:id/stock` — Actualizar solo el stock

### Categorías

- `POST   /categorias` — Crear categoría
- `GET    /categorias` — Listar categorías
- `GET    /categorias/:id` — Obtener categoría por ID
- `PUT    /categorias/:id` — Actualizar categoría

### Clientes

- `POST   /clientes` — Crear cliente
- `GET    /clientes` — Listar clientes
- `GET    /clientes/:id` — Obtener cliente por ID
- `PUT    /clientes/:id` — Actualizar cliente

### Pedidos

- `POST   /pedidos` — Crear pedido
- `GET    /pedidos` — Listar pedidos
- `GET    /pedidos/:id` — Obtener pedido por ID
- `PUT    /pedidos/:id` — Actualizar estado del pedido

### Items de Pedido

- `GET    /getAllItemsPedido` — Listar todos los items de pedidos
- `GET    /getItemPedidoById/:id` — Obtener item de pedido por ID

### Otros

- `GET    /test-db` — Prueba de conexión a la base de datos

## Subida de Imágenes

Las imágenes de celulares se almacenan en `/public/uploads` y se acceden vía `/uploads/<nombre-archivo>`.

## Autenticación

El proyecto está preparado para integrarse con Keycloak, aunque las rutas actuales no requieren autenticación por defecto.

## Licencia

MIT

---

> Proyecto desarrollado para BitPhone - Gestión de celulares y ventas.