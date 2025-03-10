import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const StudentView = () => {
  return (
    <Box sx={{ display: 'flex', mt: '64px' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Vista de alumno</h1>
      </Box>
    </Box>
  );
};

export default StudentView;