import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const FileUploader = ({ lesson, onFileUploaded, open, onClose }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
        const response = await axios.post('http://130.213.216.127:5010/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const uploadedFileId = response.data.url; // Recibir el fileId
        // Determinar el tipo de archivo basado en la extensión
        let generatedUrl = null;
        let tipoArchivo = 0; // Inicializar tipoArchivo
        const extension = file.name.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
            tipoArchivo = 1; // Imagen
            generatedUrl = `https://drive.google.com/file/d/${uploadedFileId}/preview`;
            console.log('URL de la imagen generada:', generatedUrl);
        } else if (['mp4', 'avi', 'mov', 'mkv'].includes(extension)) {
            tipoArchivo = 2; // Video
            generatedUrl = `https://drive.google.com/file/d/${uploadedFileId}/preview`;
            console.log('URL del video generada:', generatedUrl);
        } else if (['obj', 'fbx', 'stl', 'gltf'].includes(extension)) {
            tipoArchivo = 3; // Archivo 3D
            generatedUrl = `https://drive.google.com/file/d/${uploadedFileId}`;
        } else {
            tipoArchivo = 0; // Otro tipo de archivo
            console.log('No se reconoce el tipo de archivo');
        }

        if (!generatedUrl) {
            alert('No se pudo generar la URL para este tipo de archivo.');
            return;
        }

        // Enviar el fileId y la URL generada al backend para actualizar la lección
        await axios.patch(
            'http://130.213.216.127:5011/CursoAdmin/Leccion/Edit',
            {
                IdLeccion: lesson.IdLeccion,
                TituloLeccion: lesson.TituloLeccion,
                Contenido: lesson.Contenido,
                tipo: tipoArchivo,
                Url: generatedUrl, // Guardar la URL generada en la base de datos
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );

        console.log('Lección actualizada con éxito:', lesson.IdLeccion, lesson.TituloLeccion, lesson.Contenido, generatedUrl, tipoArchivo);
        alert('Archivo subido y URL guardada con éxito.');

        // Llamar a la función de callback (si se proporciona) para actualizar el estado en el componente padre
        if (onFileUploaded) {
            onFileUploaded(uploadedFileId);
        }

        // Limpiar el estado y cerrar el diálogo
        setFile(null);
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