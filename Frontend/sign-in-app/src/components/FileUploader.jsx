import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const FileUploader = ({ lessonId, titulo, contenido, onFileUploaded, open, onClose }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert('Selecciona un archivo primero.');
        if (!lessonId) return alert('No se ha proporcionado el ID de la lección.');

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);

            // Subir el archivo al backend (Google Drive)
            const response = await axios.post('http://localhost:5010/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const fileUrl = response.data.url;

            // Enviar el URL del archivo al backend para actualizar la lección
            await axios.patch(
                'http://localhost:5011/CursoAdmin/Leccion/Edit',
                {
                    IdLeccion: lessonId,
                    TituloLeccion: titulo,
                    Contenido: contenido,
                    Url: fileUrl,
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            console.log('Lección actualizada con éxito:', lessonId, titulo, contenido, fileUrl);
            alert('Archivo subido y URL guardado con éxito.');

            // Llamar a la función de callback (si se proporciona) para actualizar el estado en el componente padre
            if (onFileUploaded) {
                onFileUploaded(fileUrl);
            }

            // Cerrar el diálogo
            onClose();
        } catch (error) {
            console.error('Error al subir el archivo o guardar el URL:', error);
            alert('Hubo un error al subir el archivo o guardar el URL.');
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