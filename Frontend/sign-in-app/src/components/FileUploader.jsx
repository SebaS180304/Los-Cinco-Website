import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const FileUploader = ({ lesson, onFileUploaded, open, onClose }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tipoArchivo, setTipoArchivo] = useState(0);
  const [fileId, setFileId] = useState(null); // Guardar el fileId
  const [fileUrl, setFileUrl] = useState(null); // Guardar la URL del archivo

  const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      
  };

  const handleUpload = async () => {
      if (!file) return alert('Selecciona un archivo primero.');
      if (!lesson.IdLeccion) return alert('No se ha proporcionado el ID de la lección.');

      const formData = new FormData();
      formData.append('file', file);

      try {
          setUploading(true);

          // Subir el archivo al backend (Google Drive)
          const response = await axios.post('http://localhost:5010/upload', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
          });

          const uploadedFileId = response.data.url; // Recibir el fileId
          setFileId(uploadedFileId);
          // Determinar el tipo de archivo basado en la extensión
          if (file) {
            const extension = file.name.split('.').pop().toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
                setTipoArchivo(1); // Imagen
                const uploadedFileUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
                setFileUrl(uploadedFileUrl);
                console.log('fileUrl ', fileUrl);
            } else if (['mp4', 'avi', 'mov', 'mkv'].includes(extension)) {
                setTipoArchivo(2); // Video
                const uploadedFileUrl = `https://drive.google.com/file/d/${fileId}/preview`;
                setFileUrl(uploadedFileUrl);
                console.log('fileUrl ', fileUrl);
            } else if (['obj', 'fbx', 'stl', 'gltf'].includes(extension)) {
                setTipoArchivo(3); // Archivo 3D
            } else {
                setTipoArchivo(0); // Otro tipo de archivo
                console.log('No se reconoce el tipo de archivo');
            }
          }
          console.log('fileId ', uploadedFileId);
          console.log('Url ', fileUrl);
          // Enviar el fileId al backend para actualizar la lección
          await axios.patch(
              'http://localhost:5011/CursoAdmin/Leccion/Edit',
              {
                  IdLeccion: lesson.IdLeccion,
                  TituloLeccion: lesson.TituloLeccion,
                  Contenido: lesson.Contenido,
                  tipo: tipoArchivo,
                  Url: fileUrl, // Guardar el fileId en la base de datos
              },
              {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
              }
          );
          console.log('Lección actualizada con éxito:', lesson.IdLeccion, lesson.TituloLeccion, lesson.Contenido, fileUrl, tipoArchivo);
          alert('Archivo subido y fileId guardado con éxito.');

          // Llamar a la función de callback (si se proporciona) para actualizar el estado en el componente padre
          if (onFileUploaded) {
              onFileUploaded(uploadedFileId);
          }

          // Cerrar el diálogo
          onClose();
      } catch (error) {
          console.error('Error al subir el archivo o guardar el fileId:', error);
          alert('Hubo un error al subir el archivo o guardar el fileId.');
      } finally {
          setUploading(false);
      }
  };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Subir Archivo</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <input type="file" onChange={handleFileChange} />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={uploading}
                        startIcon={uploading && <CircularProgress size={20} />}
                    >
                        {uploading ? 'Subiendo...' : 'Subir Archivo'}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default FileUploader;