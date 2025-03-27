import React, { useState, useCallback } from 'react';
import { Box, AppBar, Container, Toolbar, Typography, Button, Alert, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import ComputerCanvas from './canvas/Computer';

function Media({ mediaType, src }) {
        if (mediaType === 'none') return <></>;

    const [reloadKey, setReloadKey] = useState(0);
    const [loadError, setLoadError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleReload = useCallback(() => {
        setIsLoading(true);
        setLoadError(false);
        setTimeout(() => {
            setReloadKey(prevKey => prevKey + 1);
        }, 100);
    }, []);

    const handleError = useCallback(() => {
        setLoadError(true);
        setIsLoading(false);
    }, []);

    const handleLoad = useCallback(() => {
        setIsLoading(false);
    }, []);

    let mediaContent;
    let mediaIcon;
    let mediaText;
    if (mediaType === 'model3d') {
        mediaContent = (
            <ComputerCanvas 
                src={src}
                key={reloadKey} 
                onError={handleError}
                onLoad={handleLoad}
            />
        );
        mediaIcon = <ViewInArOutlinedIcon sx={{ color: 'white', fontSize: 40 }} />;
        mediaText = 'Modelo 3D';
    } else if (mediaType === 'video') {
        mediaContent = (
            <video 
                key={reloadKey}
                onError={handleError}
                onLoadedData={handleLoad}
                controls
                style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
            >
                <source src={src} type="video/mp4" />
                Tu navegador no soporta videos.
            </video>
        );
        mediaIcon = <VideoCameraBackOutlinedIcon sx={{ color: 'white', fontSize: 40 }} />;
        mediaText = 'Video';
    } else if (mediaType === 'image') {
        mediaContent = (
            <img 
                key={reloadKey}
                onError={handleError}
                onLoad={handleLoad}
                src={src}
                alt="Contenido multimedia"
                style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
            />
        );
        mediaIcon = <ImageOutlinedIcon sx={{ color: 'white', fontSize: 40 }} />;
        mediaText = 'Imagen';
    } else {
        mediaContent = <Typography color="white">Tipo de contenido no soportado</Typography>;
        mediaIcon = <ImageOutlinedIcon sx={{ color: 'white', fontSize: 40 }} />;
        mediaText = "Imagen";
    }

    return (
        <Box bgcolor={'#212633'} sx={{ 
            flex: 2, 
            display: 'flex',
            flexDirection: 'column'
        }}>
            <AppBar position="sticky" sx={{ backgroundColor: '#060E25' }}>
                <Container maxWidth='xxl'>
                    <Toolbar sx={{ justifyContent: 'flex-end' }}>
                        <Typography component="div" sx={{ mr: 2, fontWeight:'bold' }}>
                            {mediaText}
                        </Typography>
                        {mediaIcon}
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="main" sx={{ p: 5, flexGrow: 1, position: 'relative' }}>
                {loadError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        El contenido multimedia no se cargó correctamente. Por favor, intente recargar.
                    </Alert>
                )}
                {isLoading && (
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <CircularProgress color="warning" size={60} />
                        <Typography color="white">
                            Cargando contenido multimedia...
                        </Typography>
                    </Box>
                )}
                {mediaContent}
            </Box>
            <AppBar position="relative" sx={{ 
                backgroundColor: '#060E25',
                zIndex: 1
            }}>
                <Container maxWidth='xxl'>
                    <Toolbar>
                        <Button 
                            variant="contained" 
                            size='large' 
                            startIcon={<RefreshIcon />} 
                            onClick={handleReload}
                            disabled={isLoading}
                            sx={{ 
                                bgcolor: '#212633', 
                                border: '2px solid #FFB300', 
                                color: 'white',
                                '&:disabled': {
                                    bgcolor: '#1a1f2a',
                                    border: '2px solid #666',
                                    color: '#666'
                                }
                            }}
                        >
                            {isLoading ? 'Reiniciando...' : 'Reiniciar'}
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default Media;