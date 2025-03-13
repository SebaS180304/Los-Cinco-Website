import React, { useContext } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, LinearProgress, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { AlumnosContext } from '../context/GlobalContext';

const EstadisticasAlumnos = () => {
  const { alumnos } = useContext(AlumnosContext);

  // Generar un porcentaje fijo al azar para cada alumno
  const getRandomPercentage = () => Math.floor(Math.random() * 100) + 1;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" component="div" sx={{ mb: 1 }}>
        Estadísticas de Alumnos
      </Typography>
      <TableContainer component={Paper} sx={{ border: '2px solid black', borderRadius: 2, width: '100%', height: 350, overflow: 'auto' }}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableBody>
            {alumnos.length === 0 ? (
              <TableRow>
                <TableCell>
                  <Typography variant="body1" align="center">
                    Aún no hay alumnos.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              alumnos.map((alumno, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell colSpan={2} sx={{ borderBottom: 'none' }}>
                    <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                      {alumno}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant="determinate" value={getRandomPercentage()} sx={{ height: 40, borderRadius: 2, backgroundColor: '#f0f0f0', '& .MuiLinearProgress-bar': { backgroundColor: yellow[700] } }} />
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EstadisticasAlumnos;