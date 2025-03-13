import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { CursosContext } from '../context/GlobalContext';

const CursosSimilares = () => {
  const { cursos } = useContext(CursosContext);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleEditCurso = (index) => {
    navigate(`/courses/${index}`); // Redirigir a la página de cursos con el ID del curso
  };

  const cursosArray = Object.values(cursos);

  return (
    <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 3, p: 0 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Cursos Similares
      </Typography>
      <Box sx={{ height: 350, overflow: 'auto', p: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ tableLayout: 'fixed' }} aria-label="simple table">
            <TableBody>
              {cursosArray.length === 0 ? (
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" align="center">
                      Aún no hay cursos.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                cursosArray.map((curso, index) => (
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
                        {index.toString() === courseId ? (
                          <Typography variant="body1" sx={{ color: 'blue' }}>
                            Actual
                          </Typography>
                        ) : (
                          <IconButton
                            color="primary"
                            onClick={() => handleEditCurso(index)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CursosSimilares;