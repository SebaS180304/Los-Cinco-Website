import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, LinearProgress, Typography, Divider, Grid } from '@mui/material';
import { yellow } from '@mui/material/colors';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add'; // Importa el ícono de +
import { Link } from 'react-router-dom';

const createData = (name, value) => {
  return { name, value };
};

const rows = [
  createData(' de los técnicos aún no han iniciado ningún curso.', 60),
  createData(' de los técnicos han completado el 50% de material.', 40),
  createData(' de los técnicos están por finalizar el último módulo.', 90),
  createData(' de los técnicos han completado todos los cursos disponibles.', 30),
];

const AddContent = () => {
  return (
    <Box sx={{ display: 'flex', mt: '64px' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                Estadísticas
              </Typography>
              <TableContainer component={Paper} sx={{ border: '2px solid black', borderRadius: 0, width: '100%' }}>
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
            <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 3, p: 0 }}>
              <Typography variant="h6" sx={{ p: 2 }}>
                Evaluación de Curso X
              </Typography>
              <Divider sx={{ mx: 2 }} />
              <Box sx={{ overflow: 'auto', height: 'calc(100% - 48px)', p: 2 }}> {/* Ajusta la altura para el scroll */}
                <TableContainer component={Paper}>
                  <Table sx={{ minHeight: 300 }} aria-label="simple table">
                    <TableBody>
                      {['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5', ''].map((quiz, index) => (
                        <TableRow
                          key={quiz}
                          sx={{
                            backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                            '&:hover': { backgroundColor: '#e0e0e0' },
                            cursor: 'pointer',
                          }}
                        >
                          <TableCell>
                            {quiz || <AddIcon />}
                          </TableCell>
                          <TableCell>
                            <Divider orientation="vertical" flexItem /> {/* Añade el divisor vertical */}
                          </TableCell>
                          <TableCell>
                            {quiz ? (
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography>Modificar</Typography>
                                <ArrowForwardIcon />
                              </Box>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ width: 250, height: 200, border: '2px solid black', borderRadius: 2, display: 'flex', flexDirection: 'column', mb: 4 }}>
                <Box sx={{ flex: '0 0 20%', backgroundColor: '#F1EDED', borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, textDecoration: 'none', color: 'black' }}>
                  <Typography variant="body1">
                    Seleccionar Curso
                  </Typography>
                  <ArrowForwardIcon />
                </Box>
                <Box sx={{ flex: '0 0 60%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
                  <Typography variant="h6">
                    Contenido Actual
                  </Typography>
                </Box>
                <Box sx={{ flex: '0 0 20%', backgroundColor: '#F1EDED', borderTopRightRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, textDecoration: 'none', color: 'black' }}>
                  <Typography variant="body1">
                    Ver
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', backgroundColor: 'black', color: 'white' }}>
                    <ArrowForwardIcon fontSize="small" />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: 250, height: 200, border: '2px solid black', borderRadius: 2, display: 'flex', flexDirection: 'column', mb: 4 }}>
                <Box sx={{ flex: '0 0 20%', backgroundColor: '#F1EDED', borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, textDecoration: 'none', color: 'black' }}>
                  <Typography variant="body1">
                    Seleccionar Curso
                  </Typography>
                  <ArrowForwardIcon />
                </Box>
                <Box sx={{ flex: '0 0 60%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
                  <Typography variant="h6">
                    Subir PDF
                  </Typography>
                </Box>
                <Box sx={{ flex: '0 0 20%', backgroundColor: '#F1EDED', borderTopRightRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, textDecoration: 'none', color: 'black' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', backgroundColor: 'black', color: 'white' }}>
                    <AddIcon fontSize="small" />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: 250, height: 200, border: '2px solid black', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flex: '0 0 20%', backgroundColor: '#F1EDED', borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, textDecoration: 'none', color: 'black' }}>
                  <Typography variant="body1">
                    Seleccionar Curso
                  </Typography>
                  <ArrowForwardIcon />
                </Box>
                <Box sx={{ flex: '0 0 60%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
                  <Typography variant="h6">
                    Subir Video
                  </Typography>
                </Box>
                <Box sx={{ flex: '0 0 20%', backgroundColor: '#F1EDED', borderTopRightRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, textDecoration: 'none', color: 'black' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', backgroundColor: 'black', color: 'white' }}>
                    <AddIcon fontSize="small" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddContent;