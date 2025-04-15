import { Box, Typography } from '@mui/material';
import React from 'react';

function PracticeContent() {
    return ( 
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
                Sección de Práctica [En Construcción]
            </Typography>
            <Typography variant="body1">
                Aquí los técnicos podrán practicar sus conocimientos adquiridos en los cursos. Realizando ejercicios de repaso de los temas vistos en las lecciones de los diferentes cursos.
            </Typography>
        </Box>
     );
}

export default PracticeContent;