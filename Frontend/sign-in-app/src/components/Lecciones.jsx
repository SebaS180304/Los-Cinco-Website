import React, { useContext, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { CursosContext } from '../context/GlobalContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';

const Lecciones = ({ courseId }) => {
  const { cursos, setCursos } = useContext(CursosContext);
  const lecciones = cursos[courseId]?.lecciones || [];
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [newLeccion, setNewLeccion] = useState({ title: '', content: '' });
  const [expandedLeccion, setExpandedLeccion] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSaveLeccion = () => {
    if (!cursos[courseId] || typeof cursos[courseId] !== 'object') {
      console.error(`Curso con ID ${courseId} no encontrado o no es un objeto.`);
      return;
    }

    const updatedCursos = { ...cursos };
    if (!updatedCursos[courseId].lecciones) {
      updatedCursos[courseId].lecciones = [];
    }
    updatedCursos[courseId].lecciones.push(newLeccion);
    setCursos(updatedCursos);
    setNewLeccion({ title: '', content: '' });
    setExpanded(false);
  };

  const handleLeccionClick = (index) => {
    setExpandedLeccion(expandedLeccion === index ? null : index);
  };

  return (
    <>
      <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 3, p: 0 }} onClick={handleOpen}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Lista de Lecciones
        </Typography>
        <Box sx={{ height: 270, overflow: 'auto', p: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: 'fixed' }} aria-label="simple table">
              <TableBody>
                {lecciones.length === 0 ? (
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" align="center">
                        Aún no hay lecciones.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  lecciones.map((leccion, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                        '&:hover': { backgroundColor: '#e0e0e0' },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleLeccionClick(index)}
                    >
                      <TableCell>
                        <Typography variant="body1">
                          {leccion.title}
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

      {/* Pop-Up Section */}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            width: '60%',
            height: '80%',
            maxWidth: 'none', // Evita que se limite al tamaño predeterminado
            margin: 'auto', // Centra el pop-up
          },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">Detalles de Lecciones</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ tableLayout: 'fixed' }} aria-label="simple table">
              <TableBody>
                {lecciones.length === 0 ? (
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" align="center">
                        Aún no hay lecciones.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  lecciones.map((leccion, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                        '&:hover': { backgroundColor: '#e0e0e0' },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleLeccionClick(index)}
                    >
                      <TableCell>
                        <Typography variant="body1">
                          {leccion.title}
                        </Typography>
                        {expandedLeccion === index && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {leccion.content.substring(0, 100)}...
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{ cursor: 'pointer', color: 'blue' }}
                      onClick={handleExpandClick}
                    >
                      {expanded ? 'Cancelar' : 'Agregar nueva lección'}
                    </Typography>
                    {expanded && (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          label="Título de la lección"
                          variant="outlined"
                          fullWidth
                          value={newLeccion.title}
                          onChange={(e) => setNewLeccion({ ...newLeccion, title: e.target.value })}
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          label="Contenido de la lección"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                          value={newLeccion.content}
                          onChange={(e) => setNewLeccion({ ...newLeccion, content: e.target.value })}
                          sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <IconButton
                            color="success"
                            onClick={handleSaveLeccion}
                            sx={{ backgroundColor: 'green', color: 'white' }}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Lecciones;