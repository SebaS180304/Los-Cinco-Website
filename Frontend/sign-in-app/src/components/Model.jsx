import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Container, Button, Alert } from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import RefreshIcon from '@mui/icons-material/Refresh';
import ComputerCanvas from './canvas/Computer';

function Model() {
    const [reloadKey, setReloadKey] = useState(0);
    const [loadError, setLoadError] = useState(false);

    const handleReload = () => {
        setReloadKey(prevKey => prevKey + 1);
        setLoadError(false);
    };

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
            <Box component="main" sx={{ p: 5, flexGrow: 1 }}>
                {loadError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        El modelo 3D no se cargó correctamente. Por favor, intente recargar el modelo usando el botón de reinicio.
                    </Alert>
                )}
                <ComputerCanvas key={reloadKey} onError={() => setLoadError(true)} />
            </Box>
            <AppBar position="relative" sx={{ 
                backgroundColor: '#060E25',
                zIndex: 1
            }}>
                <Container maxWidth='xxl'>
                    <Toolbar>
                        <Button variant="contained" size='large' startIcon={<RefreshIcon/>} onClick={handleReload} sx={{ bgcolor: '#212633', border: '2px solid orange', color: 'white'}}>
                            Restart
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
     );
}

export default Model;