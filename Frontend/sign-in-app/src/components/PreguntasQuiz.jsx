import React, { useContext, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Dialog, IconButton, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { CursosContext } from '../context/GlobalContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

const PreguntasQuiz = ({ courseId }) => {
  const { cursos, setCursos } = useContext(CursosContext);
  const preguntas = cursos[courseId]?.quiz || [];
  const [open, setOpen] = useState(false);
  const [expandedPregunta, setExpandedPregunta] = useState(null);
  const [newPregunta, setNewPregunta] = useState('');
  const [opciones, setOpciones] = useState([{ texto: '', correcta: false }, { texto: '', correcta: false }]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePreguntaClick = (index) => {
    setExpandedPregunta(expandedPregunta === index ? null : index);
  };

  const handleAddOpcion = () => {
    if (opciones.length < 4) {
      setOpciones([...opciones, { texto: '', correcta: false }]);
    }
  };

  const handleOpcionChange = (index, field, value) => {
    const updatedOpciones = opciones.map((opcion, i) => 
      i === index ? { ...opcion, [field]: value } : opcion
    );
    setOpciones(updatedOpciones);
  };

  const handleCorrectaChange = (index) => {
    const updatedOpciones = opciones.map((opcion, i) => 
      ({ ...opcion, correcta: i === index })
    );
    setOpciones(updatedOpciones);
  };

  const handleSavePregunta = () => {
    if (!cursos[courseId] || typeof cursos[courseId] !== 'object') {
      console.error(`Curso con ID ${courseId} no encontrado o no es un objeto.`);
      return;
    }

    const updatedCursos = { ...cursos };
    if (!updatedCursos[courseId].quiz) {
      updatedCursos[courseId].quiz = [];
    }
    updatedCursos[courseId].quiz.push({ pregunta: newPregunta, opciones });
    setCursos(updatedCursos);
    setNewPregunta('');
    setOpciones([{ texto: '', correcta: false }, { texto: '', correcta: false }]);
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
                          <TableCell colSpan={2}>
                            <Box sx={{ mt: 1, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                              {pregunta.opciones.map((opcion, i) => (
                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <TextField
                                    label={`Opción ${i + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    value={opcion.texto}
                                    onChange={(e) => handleOpcionChange(i, 'texto', e.target.value)}
                                    sx={{ mr: 2 }}
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={opcion.correcta}
                                        onChange={() => handleCorrectaChange(i)}
                                      />
                                    }
                                    label="Correcta"
                                  />
                                  <IconButton
                                    color="primary"
                                    onClick={() => handleOpcionChange(i, 'texto', prompt('Editar opción', opcion.texto))}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Box>
                              ))}
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Dialog fullScreen open={open} onClose={handleClose}>
        <Box sx={{ position: 'relative', height: '100%', px: 14 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', top: 30, left: 45, transform: 'scale(1.4)' }} // Aumentar el tamaño del botón
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ p: 3, mt: 8 }}>
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
                            <TableCell colSpan={2}>
                              <Box sx={{ mt: 1, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                                {pregunta.opciones.map((opcion, i) => (
                                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <TextField
                                      label={`Opción ${i + 1}`}
                                      variant="outlined"
                                      fullWidth
                                      value={opcion.texto}
                                      onChange={(e) => handleOpcionChange(i, 'texto', e.target.value)}
                                      sx={{ mr: 2 }}
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={opcion.correcta}
                                          onChange={() => handleCorrectaChange(i)}
                                        />
                                      }
                                      label="Correcta"
                                    />
                                    <IconButton
                                      color="primary"
                                      onClick={() => handleOpcionChange(i, 'texto', prompt('Editar opción', opcion.texto))}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Box>
                                ))}
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  )}
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="body1"
                        align="center"
                        sx={{ cursor: 'pointer', color: 'blue' }}
                        onClick={handleAddOpcion}
                      >
                        {opciones.length < 4 ? 'Agregar opción' : 'Máximo de opciones alcanzado'}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          label="Pregunta"
                          variant="outlined"
                          fullWidth
                          value={newPregunta}
                          onChange={(e) => setNewPregunta(e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        {opciones.map((opcion, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <TextField
                              label={`Opción ${index + 1}`}
                              variant="outlined"
                              fullWidth
                              value={opcion.texto}
                              onChange={(e) => handleOpcionChange(index, 'texto', e.target.value)}
                              sx={{ mr: 2 }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={opcion.correcta}
                                  onChange={() => handleCorrectaChange(index)}
                                />
                              }
                              label="Correcta"
                            />
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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