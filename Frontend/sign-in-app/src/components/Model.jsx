import React, { useState, useCallback } from 'react';
import { Box, AppBar, Toolbar, Typography, Container, Button, Alert, CircularProgress } from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import RefreshIcon from '@mui/icons-material/Refresh';
import ComputerCanvas from './canvas/Computer';

function Model() {
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
                            Graphics
                        </Typography>
                        <ViewInArIcon sx={{ color: 'white', fontSize: 40 }} />
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="main" sx={{ p: 5, flexGrow: 1, position: 'relative' }}>
                {loadError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        El modelo 3D no se cargó correctamente. Por favor, intente recargar el modelo usando el botón de reinicio.
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
                            Cargando modelo 3D...
                        </Typography>
                    </Box>
                )}
                <ComputerCanvas 
                    key={reloadKey} 
                    onError={handleError}
                    onLoad={handleLoad}
                />
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
                            startIcon={<RefreshIcon/>} 
                            onClick={handleReload}
                            disabled={isLoading}
                            sx={{ 
                                bgcolor: '#212633', 
                                border: '2px solid orange', 
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

export default Model;