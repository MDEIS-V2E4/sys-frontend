FROM node:18 AS builder

WORKDIR /app

# Copia solo los archivos esenciales primero
COPY package.json package-lock.json ./

# Instala dependencias sin módulos opcionales problemáticos
RUN rm -rf node_modules && npm install --no-optional

RUN npm install --save-dev rollup

# Verifica si Rollup está correctamente instalado
RUN npm list rollup

# Copia el código fuente
COPY . .

# Ejecuta la compilación
RUN npm run build



# Usa una imagen ligera para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos estáticos de la build de React a Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80 para servir la aplicación
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
