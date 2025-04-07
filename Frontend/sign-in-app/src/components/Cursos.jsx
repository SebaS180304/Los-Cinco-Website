import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Divider, TextField, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { CursosContext } from '../context/GlobalContext';

const Cursos = () => {
  const { cursos, setCursos } = useContext(CursosContext);
  const [newCurso, setNewCurso] = useState('');
  const [showInput, setShowInput] = useState(false); // Estado para controlar la visibilidad del TextField
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

  const handleShowInput = () => {
    setShowInput(true); // Mostrar el TextField
  };

  const cursosArray = Object.values(cursos);

  return (
    <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 5, p: 0 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Cursos
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
                    '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' },
                  }}
                  onClick={() => navigate(`/courses/${index}`)} // Hacer clic en toda la fila
                >
                  <TableCell sx={{ width: '80%' }}>
                    <Typography variant="body1">
                      {curso.nombre}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: '20%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                      <VisibilityIcon color="primary" />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                onClick={!showInput ? handleShowInput : undefined}
                sx={{
                  backgroundColor: cursosArray.length % 2 === 0 ? '#F1EDED' : 'white',
                  cursor: showInput ? 'default' : 'pointer',
                  '&:hover': showInput ? {} : { backgroundColor: '#e0e0e0' },
                }}
              >
                <TableCell colSpan={2}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ transition: 'all 2s ease', width: showInput ? '100%' : '0', padding: 0, margin: 0 }}>
                      <TextField
                        inputRef={(input) => {
                          if (showInput && input) {
                            input.focus(); // Enfocar el TextField cuando showInput sea true
                          }
                        }}
                        value={newCurso}
                        onChange={(e) => setNewCurso(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Agregar nuevo curso"
                        variant="outlined"
                        onBlur={() => setShowInput(false)} // Ocultar el input al perder el foco
                        InputProps={{
                          sx: {
                            height: showInput ? '35px' : '20px', // Ajusta la altura del TextField
                            transition: 'all 0.5s ease',
                            opacity: showInput ? 1 : 0,
                          },
                        }}
                        fullWidth
                      />
                    </Box>
                    <AddIcon
                      onClick={() => handleAddCurso()}
                      sx={{
                        mx: 2,
                        cursor: 'pointer',
                        transition: 'all 1.5s ease',
                        transform: showInput ? 'rotate(360deg)' : 'rotate(0deg)',
                      }}
                    />
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