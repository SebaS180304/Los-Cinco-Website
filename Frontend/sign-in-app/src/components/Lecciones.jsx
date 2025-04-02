import React, { useContext, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { CursosContext } from '../context/GlobalContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const Lecciones = ({ courseId }) => {
  const { cursos, setCursos } = useContext(CursosContext);
  const lecciones = cursos[courseId]?.lecciones || [];
  const [open, setOpen] = useState(false);
  const [expandedLeccion, setExpandedLeccion] = useState(null);
  const [editingLeccion, setEditingLeccion] = useState({ title: '', content: '' }); // Estado para la lección que se está editando
  const [newLeccion, setNewLeccion] = useState({ title: '', content: '' }); // Estado separado para la nueva lección
  const [expandedAdd, setExpandedAdd] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setExpandedLeccion(null);
    setExpandedAdd(false);
  };

  const handleLeccionClick = (index) => {
    setExpandedLeccion(expandedLeccion === index ? null : index);
    setEditingLeccion(lecciones[index]); // Cargar los datos existentes de la lección en edición
  };

  const handleSaveLeccion = (index) => {
    const updatedCursos = { ...cursos };
    updatedCursos[courseId].lecciones[index] = { ...editingLeccion };
    setCursos(updatedCursos);
    setExpandedLeccion(null);
  };

  const handleAddExpandClick = () => {
    setExpandedAdd(!expandedAdd);
    setNewLeccion({ title: '', content: '' }); // Limpiar los campos para una nueva lección
  };

  const handleAddLeccion = () => {
    const updatedCursos = { ...cursos };
    if (!updatedCursos[courseId].lecciones) {
      updatedCursos[courseId].lecciones = [];
    }
    updatedCursos[courseId].lecciones.push(newLeccion);
    setCursos(updatedCursos);
    setExpandedAdd(false);
    setNewLeccion({ title: '', content: '' });
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
                    <React.Fragment key={index}>
                      <TableRow
                        sx={{
                          backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                          '&:hover': { backgroundColor: '#e0e0e0' },
                          cursor: 'pointer',
                        }}
                        onClick={() => handleLeccionClick(index)}
                      >
                        <TableCell>
                          <Typography variant="body1">{leccion.title}</Typography>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
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
            <Typography variant="h6">Lista de Lecciones</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ tableLayout: 'fixed', width: '100%' }} aria-label="simple table">
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
                    <React.Fragment key={index}>
                      <TableRow
                        sx={{
                          backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                          '&:hover': { backgroundColor: '#e0e0e0' },
                          cursor: 'pointer',
                        }}
                        onClick={() => handleLeccionClick(index)}
                      >
                        <TableCell>
                          <Typography variant="body1">{leccion.title}</Typography>
                        </TableCell>
                      </TableRow>


                      {expandedLeccion === index && (
                        <TableRow>
                          <TableCell colSpan={1}>
                            <Box sx={{ mt: 1, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                              <TextField
                                label="Título de la lección"
                                variant="outlined"
                                fullWidth
                                value={editingLeccion.title}
                                onChange={(e) => setEditingLeccion({ ...editingLeccion, title: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                              <TextField
                                label="Contenido de la lección"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={editingLeccion.content}
                                onChange={(e) => setEditingLeccion({ ...editingLeccion, content: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton
                                  color="success"
                                  onClick={() => handleSaveLeccion(index)}
                                  sx={{ backgroundColor: 'green', color: 'white' }}
                                >
                                  <CheckIcon />
                                </IconButton>
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
                <TableRow>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={handleAddExpandClick}
                      sx={{ backgroundColor: expandedAdd ? 'lightgray' : 'white' }}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {expandedAdd && (
                  <TableRow>
                    <TableCell>
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
                            onClick={handleAddLeccion}
                            sx={{ backgroundColor: 'green', color: 'white' }}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Lecciones;