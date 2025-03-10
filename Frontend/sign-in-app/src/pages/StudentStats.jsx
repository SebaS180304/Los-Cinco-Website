import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const StudentStats = () => {
  return (
    <Box sx={{ display: 'flex', mt: '64px' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Estadísticas Estudiantes</h1>
      </Box>
    </Box>
  );
};

export default StudentStats;