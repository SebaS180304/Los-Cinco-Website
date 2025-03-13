import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, LinearProgress, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';

const createData = (name, value) => {
  return { name, value };
};

const rows = [
  createData(' de los técnicos aún no han iniciado ningún curso.', 60),
  createData(' de los técnicos han completado el 50% de material.', 40),
  createData(' de los técnicos están por finalizar el último módulo.', 90),
  createData(' de los técnicos han completado todos los cursos disponibles.', 30),
];

const Estadisticas = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" component="div" sx={{ mb: 1 }}>
        Estadísticas
      </Typography>
      <TableContainer component={Paper} sx={{ border: '2px solid black', borderRadius: 2, width: '100%' }}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell colSpan={2} sx={{ borderBottom: 'none' }}>
                  <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                    {`${row.value}% ${row.name}`}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress variant="determinate" value={row.value} sx={{ height: 40, borderRadius: 2, backgroundColor: '#f0f0f0', '& .MuiLinearProgress-bar': { backgroundColor: yellow[700] } }} />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Estadisticas;