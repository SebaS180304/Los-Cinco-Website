import React, { useContext, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Dialog, DialogContent, DialogTitle, IconButton, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { CursosContext } from '../context/GlobalContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const PreguntasQuiz = ({ courseId }) => {
  const { cursos, setCursos } = useContext(CursosContext);
  const preguntas = cursos[courseId]?.quiz || [];
  const [open, setOpen] = useState(false);
  const [expandedAdd, setExpandedAdd] = useState(false);
  const [expandedPregunta, setExpandedPregunta] = useState(null);
  const [newPregunta, setNewPregunta] = useState('');
  const [newOpciones, setNewOpciones] = useState([{ texto: '', correcta: false }, { texto: '', correcta: false }]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePreguntaClick = (index) => {
    if (expandedPregunta === index) {
      // Validar las condiciones antes de cerrar la pregunta expandida
      const preguntaActual = preguntas[index];
      const hasCorrecta = preguntaActual.opciones.some((opcion) => opcion.correcta);
      const allFieldsFilled = preguntaActual.opciones.every((opcion) => opcion.texto.trim() !== '');
  
      if (!hasCorrecta || !allFieldsFilled) {
        return;
      }
    }
    setExpandedPregunta(expandedPregunta === index ? null : index);
  };

  const handleAddExpandClick = () => {
    setExpandedAdd(!expandedAdd);
  };

  const handleNewAddOpcion = () => {
    if (newOpciones.length < 4) {
      setNewOpciones([...newOpciones, { texto: '', correcta: false }]);
    }
  };

  const handleAddOpcion = (preguntaIndex) => {
    const updatedPreguntas = preguntas.map((pregunta, i) => {
      if (i === preguntaIndex) {
        if (pregunta.opciones.length < 4) {
          const updatedOpciones = [...pregunta.opciones, { texto: '', correcta: false }];
          return { ...pregunta, opciones: updatedOpciones };
        }
      }
      return pregunta;
    });
    const updatedCursos = { ...cursos, [courseId]: { ...cursos[courseId], quiz: updatedPreguntas } };
    setCursos(updatedCursos);
  };

  const handleNewOpcionChange = (index, field, value) => {
    const updatedOpciones = newOpciones.map((opcion, i) => 
      i === index ? { ...opcion, [field]: value } : opcion
    );
    setNewOpciones(updatedOpciones);
  };

  const handleNewCorrectaChange = (index) => {
    const updatedOpciones = newOpciones.map((opcion, i) => 
      ({ ...opcion, correcta: i === index })
    );
    setNewOpciones(updatedOpciones);
  };

  const handleSavePregunta = () => {
    const hasCorrecta = newOpciones.some((opcion) => opcion.correcta);
    const allFieldsFilled =
      newPregunta.trim() !== '' &&
      newOpciones.every((opcion) => opcion.texto.trim() !== '');

    if (!hasCorrecta || !allFieldsFilled) {
      alert('Debe seleccionar al menos una opción correcta y llenar todos los campos.');
      return;
    }
  
    // Guardar la pregunta si pasa las validaciones
    if (!cursos[courseId] || typeof cursos[courseId] !== 'object') {
      console.error(`Curso con ID ${courseId} no encontrado o no es un objeto.`);
      return;
    }
  
    const updatedCursos = { ...cursos };
    if (!updatedCursos[courseId].quiz) {
      updatedCursos[courseId].quiz = [];
    }
    updatedCursos[courseId].quiz.push({ pregunta: newPregunta, opciones: newOpciones });
    setCursos(updatedCursos);
    setNewPregunta('');
    setNewOpciones([{ texto: '', correcta: false }, { texto: '', correcta: false }]);
    setExpandedAdd(false);
  };

  const handleNewRemoveOpcion = (index) => {
    if (newOpciones.length <= 2) {
      alert('Debe haber al menos 2 opciones.');
      return;
    }
    const updatedOpciones = newOpciones.filter((_, i) => i !== index);
    setNewOpciones(updatedOpciones);
  };

  const handleRemoveOpcion = (preguntaIndex) => {
    const updatedPreguntas = preguntas.map((pregunta, i) => {
      if (i === preguntaIndex) {
        if (pregunta.opciones.length <= 2) {
          return pregunta;
        }
        const updatedOpciones = pregunta.opciones.filter((_, j) => j !== preguntaIndex);
        return { ...pregunta, opciones: updatedOpciones };
      }
      return pregunta;
    });
    const updatedCursos = { ...cursos, [courseId]: { ...cursos[courseId], quiz: updatedPreguntas } };
    setCursos(updatedCursos);
  };

  const handleOpcionChange = (preguntaIndex, opcionIndex, field, value) => {
    const updatedPreguntas = preguntas.map((pregunta, i) => {
      if (i === preguntaIndex) {
        const updatedOpciones = pregunta.opciones.map((opcion, j) => 
          j === opcionIndex ? { ...opcion, [field]: value } : opcion
        );
        return { ...pregunta, opciones: updatedOpciones };
      }
      return pregunta;
    });
    const updatedCursos = { ...cursos, [courseId]: { ...cursos[courseId], quiz: updatedPreguntas } };
    setCursos(updatedCursos);
  };

  const handleCorrectaChange = (preguntaIndex, opcionIndex) => {
    const updatedPreguntas = preguntas.map((pregunta, i) => {
      if (i === preguntaIndex) {
        const updatedOpciones = pregunta.opciones.map((opcion, j) => 
          ({ ...opcion, correcta: j === opcionIndex })
        );
        return { ...pregunta, opciones: updatedOpciones };
      }
      return pregunta;
    });
    const updatedCursos = { ...cursos, [courseId]: { ...cursos[courseId], quiz: updatedPreguntas } };
    setCursos(updatedCursos);
  };

  return (
    <>
      <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 2, mt: 3, p: 0, cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }} onClick={handleOpen}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Preguntas del Quiz
        </Typography>
        <Box sx={{ height: 350, overflow: 'auto', p: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: 'fixed', width: '100%' }} aria-label="simple table">
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
                        sx={{
                          backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                          '&:hover': { backgroundColor: '#e0e0e0' },
                          cursor: 'pointer',
                        }}
                        onClick={() => handlePreguntaClick(index)}
                      >
                        <TableCell>
                          <Typography variant="body1">
                            {pregunta.pregunta}
                          </Typography>
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
            <Typography variant="h6">Preguntas del Quiz</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ tableLayout: 'fixed', width: '100%' }} aria-label="simple table">
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
                        sx={{
                          backgroundColor: index % 2 === 0 ? '#F1EDED' : 'white',
                          '&:hover': { backgroundColor: '#e0e0e0' },
                          cursor: 'pointer',
                        }}
                        onClick={() => handlePreguntaClick(index)}
                      >
                        <TableCell>
                          <Typography variant="body1">
                            {pregunta.pregunta}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {expandedPregunta === index && (
                        <TableRow>
                          <TableCell colSpan={1}>
                            <Box sx={{ mt: 1, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                              {pregunta.opciones.map((opcion, i) => (
                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1, width: '100' }}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={opcion.correcta}
                                        onChange={() => handleCorrectaChange(index, i)}
                                      />
                                    }
                                    sx = {{ mr: 1 }}
                                  />
                                  <TextField
                                    label={`Opción ${i + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    value={opcion.texto}
                                    onChange={(e) => handleOpcionChange(index, i, 'texto', e.target.value)}
                                    sx={{ mr: 2 }}
                                  />
                                  <IconButton
                                    color="error"
                                    onClick={() => handleRemoveOpcion(index)}
                                    sx={{ ml: 1 }}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                </Box>
                              ))}
                              <Typography
                                variant="body1"
                                align="center"
                                sx={{ cursor: 'pointer', color: 'blue', mt: 2 }}
                                onClick={() => handleAddOpcion(index)}
                              >
                                {newOpciones.length < 4 ? 'Agregar opción' : 'Máximo de opciones alcanzado'}
                              </Typography>
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
                          label="Pregunta"
                          variant="outlined"
                          fullWidth
                          value={newPregunta}
                          onChange={(e) => setNewPregunta(e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        {newOpciones.map((opcion, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={opcion.correcta}
                                  onChange={() => handleNewCorrectaChange(index)}
                                />
                              }
                              sx = {{ mr: 1, ml: 0.5 }}
                            />
                            <TextField
                              label={`Opción ${index + 1}`}
                              variant="outlined"
                              fullWidth
                              value={opcion.texto}
                              onChange={(e) => handleNewOpcionChange(index, 'texto', e.target.value)}
                            />
                            <IconButton
                              color="error"
                              onClick={() => handleNewRemoveOpcion(index)}
                              sx={{ ml: 1 }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        ))}
                        <Typography
                          variant="body1"
                          align="center"
                          sx={{ cursor: 'pointer', color: 'blue', mt: 2 }}
                          onClick={handleNewAddOpcion}
                        >
                          {newOpciones.length < 4 ? 'Agregar opción' : 'Máximo de opciones alcanzado'}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                          <IconButton
                            color="success"
                            onClick={handleSavePregunta}
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

export default PreguntasQuiz;