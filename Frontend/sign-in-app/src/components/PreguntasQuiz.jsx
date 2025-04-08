import React, { useContext, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Dialog, DialogContent, DialogTitle, IconButton, TextField, Button, Divider, Checkbox, FormControlLabel } from '@mui/material';
import { CursosContext } from '../context/GlobalContext';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const PreguntasQuiz = ({ courseId }) => {
  const { cursos, setCursos } = useContext(CursosContext);
  const preguntas = cursos[courseId]?.quiz || [];
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [editingPregunta, setEditingPregunta] = useState({ pregunta: '', opciones: [] });
  const [newPregunta, setNewPregunta] = useState({ pregunta: '', opciones: [{ texto: '', correcta: false }, { texto: '', correcta: false }] });

  const handleOpenEdit = (index) => {
    setEditingPregunta(preguntas[index]);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditingPregunta({ pregunta: '', opciones: [] });
  };

  const handleSavePregunta = (index) => {
    const updatedCursos = { ...cursos };
    updatedCursos[courseId].quiz[index] = editingPregunta;
    setCursos(updatedCursos);
    handleCloseEdit();
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewPregunta({ pregunta: '', opciones: [{ texto: '', correcta: false }, { texto: '', correcta: false }] });
  };

  const handleAddPregunta = () => {
    const updatedCursos = { ...cursos };
    if (!updatedCursos[courseId].quiz) {
      updatedCursos[courseId].quiz = [];
    }
    updatedCursos[courseId].quiz.push(newPregunta);
    setCursos(updatedCursos);
    handleCloseAdd();
  };

  const handleOpcionChange = (pregunta, index, field, value) => {
    const updatedOpciones = pregunta.opciones.map((opcion, i) =>
      i === index ? { ...opcion, [field]: value } : opcion
    );
    return updatedOpciones;
  };

  const handleCorrectaChange = (pregunta, index) => {
    const updatedOpciones = pregunta.opciones.map((opcion, i) => ({
      ...opcion,
      correcta: i === index,
    }));
    return updatedOpciones;
  };

  return (
    <>
      <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 3, p: 0 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Preguntas del Quiz
        </Typography>
        <Box sx={{ height: 270, overflow: 'auto', p: 2 }}>
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
                    <React.Fragment key={index}>
                      <TableRow
                        onClick={() => handleOpenEdit(index)}
                        sx={{
                          backgroundColor: 'white',
                          '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body1">{pregunta.pregunta}</Typography>
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

      {/* Pop-up para editar pregunta */}
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Pregunta</DialogTitle>
        <DialogContent>
          <TextField
            label="Pregunta"
            variant="outlined"
            fullWidth
            value={editingPregunta.pregunta}
            onChange={(e) => setEditingPregunta({ ...editingPregunta, pregunta: e.target.value })}
            sx={{ mb: 2 }}
          />
          {editingPregunta.opciones.map((opcion, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={opcion.correcta}
                    onChange={() =>
                      setEditingPregunta({
                        ...editingPregunta,
                        opciones: handleCorrectaChange(editingPregunta, index),
                      })
                    }
                  />
                }
                label=""
              />
              <TextField
                label={`Opción ${index + 1}`}
                variant="outlined"
                fullWidth
                value={opcion.texto}
                onChange={(e) =>
                  setEditingPregunta({
                    ...editingPregunta,
                    opciones: handleOpcionChange(editingPregunta, index, 'texto', e.target.value),
                  })
                }
              />
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => handleSavePregunta(preguntas.indexOf(editingPregunta))}>
              Guardar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Pop-up para añadir nueva pregunta */}
      <Dialog open={openAdd} onClose={handleCloseAdd} maxWidth="sm" fullWidth>
        <DialogTitle>Añadir Nueva Pregunta</DialogTitle>
        <DialogContent>
          <TextField
            label="Pregunta"
            variant="outlined"
            fullWidth
            value={newPregunta.pregunta}
            onChange={(e) => setNewPregunta({ ...newPregunta, pregunta: e.target.value })}
            sx={{ mb: 2 }}
          />
          {newPregunta.opciones.map((opcion, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={opcion.correcta}
                    onChange={() =>
                      setNewPregunta({
                        ...newPregunta,
                        opciones: handleCorrectaChange(newPregunta, index),
                      })
                    }
                  />
                }
                label=""
              />
              <TextField
                label={`Opción ${index + 1}`}
                variant="outlined"
                fullWidth
                value={opcion.texto}
                onChange={(e) =>
                  setNewPregunta({
                    ...newPregunta,
                    opciones: handleOpcionChange(newPregunta, index, 'texto', e.target.value),
                  })
                }
              />
              <IconButton
                color="error"
                onClick={() =>
                  setNewPregunta({
                    ...newPregunta,
                    opciones: newPregunta.opciones.filter((_, i) => i !== index),
                  })
                }
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddPregunta}>
              Añadir
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreguntasQuiz;