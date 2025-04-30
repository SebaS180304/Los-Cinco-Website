
# Usa una imagen base de Node.js para ejecutar la API de Google Drive
FROM node:18-alpine AS google-drive-api

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copia los archivos del proyecto al contenedor
COPY drive/googleDriveApi.js .
COPY drive/package.json .
COPY drive/package-lock.json .

# Instala las dependencias necesarias
RUN npm install

# Expone el puerto en el que se ejecutará la API
EXPOSE 5010

# Comando para iniciar la aplicación
CMD ["node", "googleDriveApi.js"]