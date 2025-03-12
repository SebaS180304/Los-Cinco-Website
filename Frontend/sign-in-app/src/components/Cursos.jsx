import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Divider, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { CursosContext } from '../context/GlobalContext';

const Cursos = () => {
  const { cursos, setCursos } = useContext(CursosContext);
  const [newCurso, setNewCurso] = useState('');
  const navigate = useNavigate();

  const handleAddCurso = () => {
    if (newCurso.trim()) {
      const newIndex = Object.keys(cursos).length;
      const updatedCursos = { ...cursos, [newIndex]: { nombre: newCurso, lecciones: [], quiz: null } };
      setCursos(updatedCursos);
      setNewCurso('');
      navigate(`/courses/${newIndex}`); // Redirigir a la página de cursos con el ID del curso
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddCurso();
    }
  };

  const handleEditCurso = (index) => {
    navigate(`/courses/${index}`); // Redirigir a la página de cursos con el ID del curso
  };

  const cursosArray = Object.values(cursos);

  return (
    <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 3, p: 0 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Lista de Cursos
      </Typography>
      <Divider sx={{ mx: 2 }} />
      <Box sx={{ height: 350, overflow: 'auto', p: 2 }}> {/* Ajusta la altura para el scroll */}
        <TableContainer component={Paper}>
          <Table sx={{ tableLayout: 'fixed' }} aria-label="simple table">
            <TableBody>
              {cursosArray.map((curso, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                    '&:hover': { backgroundColor: '#e0e0e0' },
                  }}
                >
                  <TableCell sx={{ width: '80%' }}>
                    <Typography variant="body1">
                      {curso.nombre}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: '20%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditCurso(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                sx={{
                  backgroundColor: cursosArray.length % 2 === 0 ? '#F1EDED' : 'white',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
              >
                <TableCell colSpan={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      value={newCurso}
                      onChange={(e) => setNewCurso(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Agregar nuevo curso"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <AddIcon onClick={handleAddCurso} sx={{ ml: 2, cursor: 'pointer' }} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Cursos;