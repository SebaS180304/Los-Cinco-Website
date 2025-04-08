import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, IconButton, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
    <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 5, p: 0 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Cursos Similares
      </Typography>
      <Box sx={{ height: '16rem', overflow: 'auto', p: 2 }}>
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
                  index.toString() === courseId ? (
                    <React.Fragment key={index}>
                      <TableRow
                        sx={{
                          backgroundColor: 'white',
                          '&:hover': { backgroundColor: '#e0e0e0' },
                        }}
                        onClick={() => handleEditCurso(index)}
                      >
                        <TableCell sx={{ width: '80%', borderBottom: 'none' }}>
                          <Typography variant="body1">
                            {curso.nombre}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ width: '20%', borderBottom: 'none' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body1" sx={{ color: 'blue' }}>
                              Actual
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} sx={{ padding: 0 }}>
                          <Divider />
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ) : (
                    <React.Fragment key={index}>
                      <TableRow
                        sx={{
                          backgroundColor: 'white',
                          '&:hover': { backgroundColor: '#f5f5f5' },
                        }}
                        onClick={() => handleEditCurso(index)}
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
                              sx={{ padding: 0 }}
                            >
                              <VisibilityIcon />
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
                  )
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