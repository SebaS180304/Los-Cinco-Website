import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ProgressCharts from './ProgressCharts';
import CourseCard from './CourseCard';

const PanelContent = ({ onVerAprender, course, recentCourse }) => {
    return ( 
        <Box sx={{ flexGrow: 1 }}>
            <Box p={3}>
                <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', mb: 3}}>
                    Sigue Aprendiendo
                </Typography>
                <CourseCard course={recentCourse} />
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 'bold',
                        color: '#FFB300',
                        cursor: 'pointer',
                        transition: 'opacity 0.3s ease',
                        textDecoration: 'underline',
                        '&:hover': { opacity: 0.7 },
                        mt: 2,
                        p: 1
                    }}
                    onClick={onVerAprender}
                >
                    Ver todo el progreso de Aprendizaje
                </Typography>
                <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', mb: 3, mt: 5}}>
                    Sigue tu Progreso
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8.5}>
                        <ProgressCharts course={course} />
                    </Grid>
                    <Grid item xs={12} md={3.5}>
                        <Box sx={{ borderRadius: '16px', border: '1px solid #000', p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Sección de Ligas
                            </Typography>
                            <Typography variant="body1">
                                Aquí los técnicos podrán visualizar su posición dentro del ranking de su grupo asignado por su instructor. La puntuación se obtiene por medio de los ejercicios de repaso y evaluaciones.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
     );
}

export default PanelContent;