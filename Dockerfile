# Usa una imagen ligera de Node.js solo para construir la app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . . 
RUN npm run build

# Usa una imagen ligera para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos estáticos de la build de React a Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expone el puerto 80 para servir la aplicación
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
