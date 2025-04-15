import React from 'react';
import { Box, Typography } from '@mui/material';

function LeagueContent() {
    return ( 
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
                Sección de Ligas [En Construcción]
            </Typography>
            <Typography variant="body1">
                Aquí los técnicos podrán visualizar su posición dentro del ranking de su grupo asignado por su instructor. La puntuación se obtiene por medio de los ejercicios de repaso y evaluaciones.
            </Typography>
        </Box>
     );
}

export default LeagueContent;