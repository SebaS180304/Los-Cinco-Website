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
    <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 2, p: 0 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Cursos
      </Typography>
      <Divider sx={{ mx: 2 }} />
      <Box sx={{ height: 350, overflow: 'auto', px: 2, pb: 4 }}> {/* Ajusta la altura para el scroll */}
        <TableContainer component={Paper}>
          <Table sx={{ tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: 0 }} aria-label="simple table">
            <TableBody>
              {cursosArray.map((curso, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    onClick={() => navigate(`/courses/${index}`)}
                    sx={{
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' },
                    }}
                  >
                    <TableCell sx={{ width: '80%', borderBottom: 'none' }}>
                      <Typography variant="body1">{curso.nombre}</Typography>
                    </TableCell>
                    <TableCell sx={{ width: '20%', borderBottom: 'none' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <VisibilityIcon color="primary" />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} sx={{ padding: 0 }}>
                      <Divider />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
              <TableRow
                onClick={!showInput ? handleShowInput : undefined}
                sx={{
                  backgroundColor: 'white',
                  cursor: showInput ? 'default' : 'pointer',
                  '&:hover': showInput ? {} : { backgroundColor: '#f5f5f5' },
                }}
              >
                <TableCell colSpan={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ transition: 'all 2s ease', width: showInput ? '100%' : '0', padding: 0, margin: 0 }}>
                      <TextField
                        inputRef={(input) => {
                          if (showInput && input) {
                            input.focus();
                          }
                        }}
                        value={newCurso}
                        onChange={(e) => setNewCurso(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Agregar nuevo curso"
                        variant="outlined"
                        onBlur={() => setShowInput(false)}
                        InputProps={{
                          sx: {
                            height: showInput ? '35px' : '20px',
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