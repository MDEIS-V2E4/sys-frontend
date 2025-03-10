# Usa la imagen base de node
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si tienes)
COPY package*.json ./

# Instala las dependencias necesarias
RUN npm install --production

# Copia todo el código de la app al contenedor
COPY . .

# Construye la app en producción (esto genera los archivos estáticos)
RUN npm run build

# Expón el puerto que usarás (Vite usa 5173 por defecto en modo dev, pero los archivos estáticos se sirven normalmente en 3000)
EXPOSE 3000

# Usa un servidor estático para servir los archivos generados
CMD ["npx", "serve", "dist"]
