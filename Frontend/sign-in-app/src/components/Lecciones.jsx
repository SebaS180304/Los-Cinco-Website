import React, { useContext, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Dialog, DialogContent, DialogTitle, IconButton, TextField, Button, Divider } from '@mui/material';
import { CursosContext } from '../context/GlobalContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

const Lecciones = ({ courseId }) => {
  const { cursos, setCursos } = useContext(CursosContext);
  const lecciones = cursos[courseId]?.lecciones || [];
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [editingLeccion, setEditingLeccion] = useState({ title: '', content: '' });
  const [newLeccion, setNewLeccion] = useState({ title: '', content: '' });

  const handleOpenEdit = (index) => {
    setEditingLeccion(lecciones[index]);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditingLeccion({ title: '', content: '' });
  };

  const handleSaveLeccion = (index) => {
    const updatedCursos = { ...cursos };
    updatedCursos[courseId].lecciones[index] = editingLeccion;
    setCursos(updatedCursos);
    handleCloseEdit();
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewLeccion({ title: '', content: '' });
  };

  const handleAddLeccion = () => {
    const updatedCursos = { ...cursos };
    if (!updatedCursos[courseId].lecciones) {
      updatedCursos[courseId].lecciones = [];
    }
    updatedCursos[courseId].lecciones.push(newLeccion);
    setCursos(updatedCursos);
    handleCloseAdd();
  };

  return (
    <>
      <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 3, p: 0 }}>
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
                        onClick={() => handleOpenEdit(index)}
                        sx={{
                          backgroundColor: 'white',
                          '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body1">{leccion.title}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{ padding: 0 }}>
                          <Divider />
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))
                )}
                <TableRow>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={handleOpenAdd}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Pop-up para editar lección */}
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Lección</DialogTitle>
        <DialogContent>
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
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => handleSaveLeccion(lecciones.indexOf(editingLeccion))}>
              Guardar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Pop-up para añadir nueva lección */}
      <Dialog open={openAdd} onClose={handleCloseAdd} maxWidth="sm" fullWidth>
        <DialogTitle>Añadir Nueva Lección</DialogTitle>
        <DialogContent>
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
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddLeccion}>
              Añadir
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Lecciones;