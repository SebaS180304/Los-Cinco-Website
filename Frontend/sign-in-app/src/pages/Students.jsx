import React, { useState, useEffect, } from 'react';
import { Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, IconButton, Autocomplete,  } from '@mui/material';
import NavbarAdmin from '../components/NavbarAdmin';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import axios from '../api/axios';

const Students = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);

  // Fetch the list of current students (own)
  useEffect(() => {
    const fetchOwnAlumnos = async () => {
      try {
        const response = await axios.get('/Alumnos/Own', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAlumnos(response.data || []);
      } catch (error) {
        console.error('Error al obtener los alumnos:', error);
      }
    };
    fetchOwnAlumnos();
  }, [setAlumnos]);

  // Search for students not already added
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get('/Alumnos/Busqueda', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { query },
      });
      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Error al buscar alumnos:', error);
    }
  };

  // Add a new student
  const handleAddAlumno = async () => {
    if (selectedAlumno) {
      try {
        console.log('Selected Alumno:', selectedAlumno.idAlumno);
        const idEstudiante = selectedAlumno.idAlumno;
        console.log('ID Estudiante:', idEstudiante);
        const response = await axios.post(
          '/Alumnos/Add',
          null, 
          { 
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { IdEstudiante: idEstudiante }, 
          },
        );
        if (response.status === 200) {
          setAlumnos((prev) => [...prev, selectedAlumno]);
          setSelectedAlumno(null);
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error al agregar el alumno:', error);
      }
    }
  };

  // Remove a student
  const handleRemoveAlumno = async (idInscripcion) => {
    try {
      const response = await axios.delete('/Alumnos/UnSubscribe', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { id_inscripcion_instructor: idInscripcion },
      });
      if (response.status === 204) {
        setAlumnos((prev) => prev.filter((alumno) => alumno.idInscripcion !== idInscripcion));
      }
    } catch (error) {
      console.error('Error al eliminar el alumno:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', mt: '64px' }}>
      <NavbarAdmin />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Gestión de Alumnos
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Autocomplete
            options={searchResults}
            getOptionLabel={(option) => option.nombre}
            onInputChange={(event, value) => handleSearch(value)}
            onChange={(event, value) => setSelectedAlumno(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar alumnos"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                        <SearchIcon sx={{ mr: 1 }} />
                    </>
                  ),
                  endAdornment: (
                    <>
                      <IconButton
                          color="primary"
                          onClick={handleAddAlumno}
                          disabled={!selectedAlumno}
                          sx={{ ml: 2 }}
                      >
                        <AddIcon />
                      </IconButton>
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Box>
        <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 2, p: 0 }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Lista de Alumnos
          </Typography>
          <Divider sx={{ mx: 2 }} />
          <Box sx={{ height: 350, overflow: 'auto', px: 2, pt: 0, pb: 4 }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: 0 }} aria-label="simple table">
                <TableBody>
                  {alumnos.map((alumno, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell sx={{ width: '80%', backgroundColor: 'white', borderBottom: 'none' }}>
                          <Typography variant="body1">{alumno.nombre}</Typography>
                        </TableCell>
                        <TableCell sx={{ width: '20%', backgroundColor: 'white', borderBottom: 'none' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveAlumno(alumno.idInscripcion)}
                            >
                              <DeleteIcon sx={{ p: 0 }} />
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
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Students;