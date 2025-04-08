import React, { useState, useContext } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Divider, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { AlumnosContext } from '../context/GlobalContext';

const Alumnos = () => {
  const { alumnos, setAlumnos } = useContext(AlumnosContext);
  const [newAlumno, setNewAlumno] = useState('');
  const [showInput, setShowInput] = useState(false); // Estado para controlar la visibilidad del TextField

  const handleAddAlumno = () => {
    if (newAlumno.trim()) {
      setAlumnos([...alumnos, newAlumno]);
      setNewAlumno('');
      setShowInput(false); // Ocultar el input después de agregar
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddAlumno();
    }
  };

  const handleShowInput = () => {
    setShowInput(true); // Mostrar el TextField
  };

  return (
    <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 5, p: 0 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Lista de Alumnos
      </Typography>
      <Divider sx={{ mx: 2 }} />
      <Box sx={{ height: 350, overflow: 'auto', px: 2 , pt: 0, pb: 4 }}> {/* Ajusta la altura para el scroll */}
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table sx={{ tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: 0 }} aria-label="simple table">
            <TableBody>
              {alumnos.map((alumno, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell sx={{ width: '80%', backgroundColor: 'white', borderBottom: 'none' }}>
                      <Typography variant="body1">{alumno}</Typography>
                    </TableCell>
                    <TableCell sx={{ width: '20%', backgroundColor: 'white', borderBottom: 'none' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton
                          color="error"
                          onClick={() => {
                            const updatedAlumnos = alumnos.filter((_, i) => i !== index);
                            setAlumnos(updatedAlumnos);
                          }}
                        >
                          <DeleteIcon sx={{ p: 0 }}/>
                        </IconButton>
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
                        value={newAlumno}
                        onChange={(e) => setNewAlumno(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Agregar nuevo alumno"
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
                      onClick={() => handleAddAlumno()}
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

export default Alumnos;