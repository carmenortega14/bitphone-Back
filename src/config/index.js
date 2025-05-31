require('dotenv').config();

module.exports = {
  app: {
    name: process.env.APP_NAME || 'node',
    env: process.env.APP_ENV || 'development',
    port: process.env.PORT || 3000,
    url: process.env.APP_URL || 'http://localhost',
    debug: process.env.APP_DEBUG === 'true',
    locale: process.env.APP_LOCALE || 'en',
    maintenance: {
      driver: process.env.APP_MAINTENANCE_DRIVER || 'file'
    }
  },
  database: {
    main: {
      connection: process.env.DB_CONNECTION || 'pgsql',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT) || 5432,
      database: process.env.DB_DATABASE || 'bitphonedb',
      username: process.env.DB_USERNAME || 'udenar',
      password: process.env.DB_PASSWORD || '1234'
    },
    keycloak: {
      connection: process.env.DB2_CONNECTION || 'pgsql',
      host: process.env.DB2_HOST || 'postgres',
      port: parseInt(process.env.DB2_PORT) || 5432,
      database: process.env.DB2_DATABASE || 'keycloak_db',
      username: process.env.DB2_USERNAME || 'udenar',
      password: process.env.DB2_PASSWORD || '1234'
    }
  },
  keycloak: {
    clientId: process.env.KEYCLOAK_CLIENT_ID || 'node-api',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    redirectUri: process.env.KEYCLOAK_REDIRECT_URI,
    baseUrl: process.env.KEYCLOAK_BASE_URL || 'http://keycloak:8080',
    realm: process.env.KEYCLOAK_REALM || 'node-realm'
  },
  auth: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12
  }
};