import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckMark from '@mui/icons-material/Check';
import axios from '../api/axios';

const ExamQuestions = ({ courseId }) => {
  const [examQuestions, setExamQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener las preguntas del examen
  useEffect(() => {
    const fetchExamQuestions = async () => {
      try {
        const response = await axios.get(`/CursoAdmin/Single?IdCurso=${courseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setExamQuestions(response.data?.quiz || []); // Guardar las preguntas
      } catch (error) {
        console.error('Error al obtener las preguntas del examen:', error);
        alert('Hubo un error al obtener las preguntas del examen.');
      } finally {
        setLoading(false);
      }
    };

    fetchExamQuestions();
  }, [courseId]);

  // Manejar cambios en las preguntas
  const handleQuestionChange = (questionIndex, field, value) => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions[questionIndex][field] = value;
    setExamQuestions(updatedQuestions);
  };

  // Manejar cambios en las opciones
  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions[questionIndex].opciones[optionIndex][field] = value;
    setExamQuestions(updatedQuestions);
  };

  // Cambiar la opción correcta
  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions[questionIndex].opciones = updatedQuestions[questionIndex].opciones.map((opcion, i) => ({
      ...opcion,
      correcta: i === optionIndex,
    }));
    setExamQuestions(updatedQuestions);
  };

  // Agregar una nueva opción
  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...examQuestions];
    if (updatedQuestions[questionIndex].opciones.length < 4) {
      updatedQuestions[questionIndex].opciones.push({ texto: '', correcta: false });
      setExamQuestions(updatedQuestions);
    }
  };

  // Eliminar una opción
  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions[questionIndex].opciones = updatedQuestions[questionIndex].opciones.filter((_, i) => i !== optionIndex);
    setExamQuestions(updatedQuestions);
  };

  // Agregar una nueva pregunta
  const handleAddQuestion = () => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions.push({
      texto: '',
      opciones: [
        { texto: '', correcta: false },
        { texto: '', correcta: false },
      ],
    });
    setExamQuestions(updatedQuestions);
  };

  // Guardar las preguntas en el backend
  const handleSaveQuestions = async () => {
    try {
      const payload = examQuestions.map((question) => ({
        texto: question.texto,
        opciones: question.opciones.map((opcion) => ({
          texto: opcion.texto,
          correcta: opcion.correcta,
        })),
      }));

      await axios.post(`/Quiz?id_curso=${courseId}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      alert('Preguntas guardadas exitosamente.');
    } catch (error) {
      console.error('Error al guardar las preguntas:', error);
      alert('Hubo un error al guardar las preguntas.');
    }
  };

  if (loading) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', mt: 3 }}>
        Cargando preguntas del examen...
      </Typography>
    );
  }

  if (examQuestions.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', mt: 3 }}>
        No hay preguntas disponibles para el examen.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      {examQuestions.map((question, index) => (
        <Accordion key={index} defaultExpanded={index === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{question.texto || 'Nueva Pregunta'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Pregunta"
              variant="outlined"
              fullWidth
              value={question.texto}
              onChange={(e) => handleQuestionChange(index, 'texto', e.target.value)}
              sx={{ mb: 2 }}
            />
            {question.opciones.map((opcion, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FormControlLabel
                  control={
                    <Tooltip title="Opción Correcta">
                      <Checkbox
                        checked={opcion.correcta}
                        onChange={() => handleCorrectOptionChange(index, i)}
                        sx={{
                          '&.Mui-checked': {
                            color: '#FFB300',
                          },
                        }}
                      />
                    </Tooltip>
                  }
                />
                <TextField
                  label={`Opción ${i + 1}`}
                  variant="outlined"
                  fullWidth
                  value={opcion.texto}
                  onChange={(e) => handleOptionChange(index, i, 'texto', e.target.value)}
                  sx={{ mr: 2 }}
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveOption(index, i)}
                  disabled={question.opciones.length <= 2}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            {question.opciones.length < 4 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleAddOption(index)}
                  startIcon={<AddIcon />}
                >
                  Agregar Opción
                </Button>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddQuestion}
          startIcon={<AddIcon />}
        >
          Agregar Pregunta
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveQuestions}
          startIcon={<CheckMark />}
          sx={{
            backgroundColor: '#FFB300',
            color: '#ffffff',
          }}
        >
          Guardar Preguntas
        </Button>
      </Box>
    </Box>
  );
};

export default ExamQuestions;