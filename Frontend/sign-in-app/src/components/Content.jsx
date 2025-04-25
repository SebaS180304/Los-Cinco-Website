import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';

function Content({ currentLecture, isMobile }) {
    return ( 
        <Box bgcolor="#101626" {...(!isMobile ? { flex: 1 } : {})} sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 128px)'}}>
            <AppBar position="static" sx={{ backgroundColor: '#273661', boxShadow: 'none' }}>
                <Toolbar>
                    <LocalLibraryOutlinedIcon sx={{fontSize: 40}} />
                    <Typography component="div" sx={{ ml: 2, fontWeight:'bold' }}>
                        Aprendiendo
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ p: 3, overflow: 'auto' }}>
                <Typography variant="h6" color="#CECACA" sx={{ mb: 2, textTransform: 'uppercase' }}>
                    Nombre del curso
                </Typography>
                <Typography color="white" variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {currentLecture?.tituloLeccion}
                </Typography>
                <Typography color="white" sx={{ textAlign: 'left', lineHeight: 2 }}
                    dangerouslySetInnerHTML={{ __html: currentLecture?.contenido }}>
                </Typography>
            </Box>
        </Box>
     );
}

export default Content;