import React from 'react';
import { Box, Grid, Breadcrumbs, Link, Typography } from '@mui/material';
import Estadisticas from '../components/Estadisticas';
import Cursos from '../components/Cursos';
import Alumnos from '../components/Alumnos';
import NavbarAdmin from '../components/NavbarAdmin';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', mt: '64px' }}>
      <NavbarAdmin />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Typography color="text.primary">Inicio</Typography>
        </Breadcrumbs>

        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <Estadisticas />
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Alumnos />
            </Box>
          </Grid>
        </Grid>
        <Cursos />
      </Box>
    </Box>
  );
};

export default Dashboard;