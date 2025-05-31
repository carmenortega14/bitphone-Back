FROM node:20-alpine

WORKDIR /usr/src/app

# Instala las dependencias primero para aprovechar el cache de Docker
COPY package*.json ./
# Instala las dependencias de producción COMENTAR
COPY prisma ./prisma/
RUN npm install
# Genera el cliente de Prisma COMENTAR
RUN npx prisma generate

# Copia el resto de los archivos
COPY . .

# Instala nodemon globalmente (mejor para Docker)
RUN npm install -g nodemon

# Variables de entorno
ENV NODE_ENV=development
ENV PORT=3000

# Puerto expuesto
EXPOSE 3000

# Comando para iniciar con nodemon (observa cambios)
# CMD ["nodemon", "--inspect=0.0.0.0", "index.js"]
CMD ["sh", "-c", "npx prisma migrate dev --name init && nodemon --inspect=0.0.0.0 index.js"]