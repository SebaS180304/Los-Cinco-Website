import React, { useContext, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Dialog, IconButton } from '@mui/material';
import { CursosContext } from '../context/GlobalContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PreguntasQuiz = ({ courseId }) => {
  const { cursos } = useContext(CursosContext);
  const preguntas = cursos[courseId]?.quiz || [];
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 3, p: 0 }} onClick={handleOpen}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Preguntas del Quiz
        </Typography>
        <Box sx={{ height: 350, overflow: 'auto', p: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: 'fixed' }} aria-label="simple table">
              <TableBody>
                {preguntas.length === 0 ? (
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" align="center">
                        Aún no hay preguntas.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  preguntas.map((pregunta, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                        '&:hover': { backgroundColor: '#e0e0e0' },
                        cursor: 'pointer',
                      }}
                    >
                      <TableCell>
                        <Typography variant="body1">
                          {pregunta}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Dialog fullScreen open={open} onClose={handleClose}>
        <Box sx={{ position: 'relative', height: '100%' }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', top: 16, left: 16 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ p: 3 }}>
            <Typography variant="h4">Detalles del Quiz</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Aquí puedes ver los detalles completos de cada pregunta del quiz.
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table sx={{ tableLayout: 'fixed' }} aria-label="simple table">
                <TableBody>
                  {preguntas.length === 0 ? (
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" align="center">
                          Aún no hay preguntas.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    preguntas.map((pregunta, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                          '&:hover': { backgroundColor: '#e0e0e0' },
                          cursor: 'pointer',
                        }}
                      >
                        <TableCell>
                          <Typography variant="body1">
                            {pregunta}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default PreguntasQuiz;