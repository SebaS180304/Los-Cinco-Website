import React, { useState, useContext } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Divider, TextField, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { AlumnosContext } from '../context/GlobalContext';

const Alumnos = () => {
  const { alumnos, setAlumnos } = useContext(AlumnosContext);
  const [newAlumno, setNewAlumno] = useState('');

  const handleAddAlumno = () => {
    if (newAlumno.trim()) {
      setAlumnos([...alumnos, newAlumno]);
      setNewAlumno('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddAlumno();
    }
  };

  const handleDeleteAlumno = (index) => {
    const updatedAlumnos = alumnos.filter((_, i) => i !== index);
    setAlumnos(updatedAlumnos);
  };

  return (
    <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 3, p: 0 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Lista de Alumnos
      </Typography>
      <Divider sx={{ mx: 2 }} />
      <Box sx={{ height: 350, overflow: 'auto', p: 2 }}> {/* Ajusta la altura para el scroll */}
        <TableContainer component={Paper}>
          <Table sx={{ tableLayout: 'fixed' }} aria-label="simple table">
            <TableBody>
              <Grid container spacing={2}>
                {alumnos.map((alumno, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <TableRow
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                        '&:hover': { backgroundColor: '#e0e0e0' },
                      }}
                    >
                      <TableCell sx={{ width: '80%' }}>
                        <Typography variant="body1">
                          {alumno}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ width: '20%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteAlumno(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </Grid>
                ))}
                <Grid item xs={12} sm={6} md={4}>
                  <TableRow
                    sx={{
                      backgroundColor: alumnos.length % 2 === 0 ? '#F1EDED' : 'white',
                      '&:hover': { backgroundColor: '#e0e0e0' },
                    }}
                  >
                    <TableCell colSpan={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          value={newAlumno}
                          onChange={(e) => setNewAlumno(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Agregar nuevo alumno"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                        <AddIcon onClick={handleAddAlumno} sx={{ ml: 2, cursor: 'pointer' }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                </Grid>
              </Grid>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Alumnos;