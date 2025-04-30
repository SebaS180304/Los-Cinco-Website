import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Alert, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import ComputerCanvas from './canvas/Computer';

const CUSTOM_COLOR = '#FFB300';

function Media({ mediaType, src, isMobile }) {
    if (mediaType === 0) return <></>;

    const [reloadKey, setReloadKey] = useState(0);
    const [loadError, setLoadError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const iframeRef = useRef(null);

    const handleReload = useCallback(() => {
        setIsLoading(true);
        setLoadError(false);
        setReloadKey(prevKey => prevKey + 1);
    }, []);

    useEffect(() => {
        const iframe = iframeRef.current;

        if (iframe) {
            const handleLoad = () => {
                setIsLoading(false);
            };

            const handleError = () => {
                setLoadError(true);
                setIsLoading(false);
                console.error(`Error al cargar el contenido desde la URL: ${src}`);
            };

            iframe.addEventListener('load', handleLoad);
            iframe.addEventListener('error', handleError);

            return () => {
                iframe.removeEventListener('load', handleLoad);
                iframe.removeEventListener('error', handleError);
            };
        }
    }, [src, reloadKey]);

    let mediaContent;
    let mediaIcon;
    let mediaText;
    if (mediaType === 2 || mediaType === 1) {
      mediaContent = (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <iframe
                  key={reloadKey}
                  ref={iframeRef}
                  src={src}
                  width="100%"
                  height="70%"
                  style={{ objectFit: 'contain' }}
                  frameBorder="0"
              ></iframe>
          </Box>
      );
      mediaIcon = mediaType === 2
          ? <VideoCameraBackOutlinedIcon sx={{ color: 'white', fontSize: 40 }} />
          : <ImageOutlinedIcon sx={{ color: 'white', fontSize: 40 }} />;
      mediaText = mediaType === 2 ? 'Video' : 'Imagen';
  } else {
      mediaContent = <Typography color="white">Tipo de contenido no soportado</Typography>;
      mediaIcon = <ImageOutlinedIcon sx={{ color: 'white', fontSize: 40 }} />;
      mediaText = "Imagen";
  }

    return (
        <Box bgcolor={'#212633'} 
            {...(!isMobile ? { flex: 2 } : {})}
            sx={{  
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 128px)'
        }}>
            <AppBar position="static" sx={{ backgroundColor: '#060E25', boxShadow: 'none' }}>
                <Toolbar sx={{ justifyContent: 'flex-end' }}>
                    <Typography component="div" sx={{ mr: 2, fontWeight:'bold' }}>
                        {mediaText}
                    </Typography>
                    {mediaIcon}
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ p: 3, flexGrow: 1, position: 'relative' }}>
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
                        <CircularProgress sx={{ color: CUSTOM_COLOR }} size={60} />
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
                <Toolbar>
                    <Button 
                        variant="contained" 
                        size='large' 
                        startIcon={<RefreshIcon />} 
                        onClick={handleReload}
                        disabled={isLoading}
                        sx={{ 
                            bgcolor: '#212633', 
                            border: `2px solid ${CUSTOM_COLOR}`, 
                            color: 'white',
                            '&:disabled': {
                                bgcolor: '#1a1f2a',
                                border: '2px solid #666',
                                color: '#666'
                            },
                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                    >
                        {isLoading ? 'Reiniciando...' : 'Reiniciar'}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Media;