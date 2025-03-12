import React from 'react';
import { Box, Grid } from '@mui/material';
import Estadisticas from '../components/Estadisticas';
import EvaluacionCurso from '../components/Cursos';
import Alumnos from '../components/Alumnos';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', mt: '64px' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <Estadisticas />
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <EvaluacionCurso />
            </Box>
          </Grid>
        </Grid>
        <Alumnos />
      </Box>
    </Box>
  );
};

export default Home;