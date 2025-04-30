// filepath: /Backend/MyApiProyect/googleDriveApi.js
const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const cors = require('cors');


const app = express();
app.use(cors({ origin: '*' }));
const upload = multer({ dest: 'uploads/' });

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('Error: Las variables de entorno CLIENT_ID, CLIENT_SECRET y REFRESH_TOKEN son obligatorias.');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
      console.log('Archivo recibido:', req.file); // Verifica si el archivo se recibe
      if (!req.file) {
          return res.status(400).send('No se recibió ningún archivo.');
      }

      const fileMetadata = { name: req.file.originalname };
      const media = { mimeType: req.file.mimetype, body: fs.createReadStream(req.file.path) };

      const response = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: 'id',
      });

      const fileId = response.data.id;

      // Hacer el archivo público
      await drive.permissions.create({
          fileId: fileId,
          requestBody: { role: 'reader', type: 'anyone' },
      });

      console.log('URL del archivo subido:', fileId);

      res.status(200).send({ url: fileId });

      // Eliminar archivo temporal
      fs.unlinkSync(req.file.path);
  } catch (error) {
      console.error('Error en el endpoint /upload:', error);
      res.status(500).send('Error al subir el archivo');
  }
});

app.listen(5010, () => console.log('Servidor corriendo en el puerto 5010'));