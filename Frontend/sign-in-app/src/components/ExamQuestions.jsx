import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../api/axios';
import ConfirmationPopup from './ConfirmationPopup';

const ExamQuestions = forwardRef(({ courseId }, ref) => {
  const [examQuestions, setExamQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({}); // Estado para manejar los errores
  const [expandedPanels, setExpandedPanels] = useState([]); // Estado para manejar los paneles expandidos
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchExamQuestions = async () => {
      try {
        const response = await axios.get(`/CursoAdmin/Single?IdCurso=${courseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setExamQuestions(response.data?.quiz || []);
      } catch (error) {
        console.error('Error al obtener las preguntas del examen:', error);
        alert('Hubo un error al obtener las preguntas del examen.');
      } finally {
        setLoading(false);
      }
    };

    fetchExamQuestions();
  }, [courseId]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanels((prev) =>
      isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
    );
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions[questionIndex][field] = value;
    setExamQuestions(updatedQuestions);

    // Eliminar el error de la pregunta si existe
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[`question-${questionIndex}`];
      return updatedErrors;
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions[questionIndex].opciones[optionIndex][field] = value;
    setExamQuestions(updatedQuestions);

    // Eliminar el error del campo de texto si existe
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[`option-${questionIndex}-${optionIndex}`];
      return updatedErrors;
    });
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions[questionIndex].opciones = updatedQuestions[questionIndex].opciones.map((opcion, i) => ({
      ...opcion,
      correcta: i === optionIndex,
    }));
    setExamQuestions(updatedQuestions);

    // Eliminar el error del checkbox si existe
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[`correct-${questionIndex}`];
      return updatedErrors;
    });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...examQuestions];
    if (updatedQuestions[questionIndex].opciones.length < 4) {
      updatedQuestions[questionIndex].opciones.push({ texto: '', correcta: false });
      setExamQuestions(updatedQuestions);
    }
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions[questionIndex].opciones = updatedQuestions[questionIndex].opciones.filter((_, i) => i !== optionIndex);
    setExamQuestions(updatedQuestions);
  };

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
    setExpandedPanels((prev) => [...prev, updatedQuestions.length - 1]); // Expandir automáticamente la nueva pregunta
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions.splice(questionIndex, 1);
    setExamQuestions(updatedQuestions);
  };

  const handleSaveQuestions = async () => {
    const newErrors = {};
    const panelsToExpand = [];

    // Validar preguntas
    examQuestions.forEach((question, questionIndex) => {
      if (!question.texto.trim()) {
        newErrors[`question-${questionIndex}`] = 'La pregunta no puede estar vacía.';
        panelsToExpand.push(questionIndex);
      }

      question.opciones.forEach((opcion, optionIndex) => {
        if (!opcion.texto.trim()) {
          newErrors[`option-${questionIndex}-${optionIndex}`] = 'La opción no puede estar vacía.';
          panelsToExpand.push(questionIndex);
        }
      });

      const noCorrectOption = !question.opciones.some((opcion) => opcion.correcta);
      if (noCorrectOption) {
        newErrors[`correct-${questionIndex}`] = 'Debe seleccionar al menos una opción correcta.';
        panelsToExpand.push(questionIndex);
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setExpandedPanels([...new Set(panelsToExpand)]);
      return;
    }

    setErrors({});
    setExpandedPanels([]);

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

      setShowPopup(true);
    } catch (error) {
      console.error('Error al guardar las preguntas:', error);
      alert('Hubo un error al guardar las preguntas.');
    }
  };

  useImperativeHandle(ref, () => ({
    addQuestion: handleAddQuestion,
    saveQuestions: handleSaveQuestions,
  }));

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
        <Accordion
          key={index}
          expanded={expandedPanels.includes(index)}
          onChange={handleAccordionChange(index)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{question.texto || 'Nueva Pregunta'}</Typography>
            <IconButton
              color="error"
              onClick={() => handleRemoveQuestion(index)}
              sx={{ ml: 'auto' }}
            >
              <DeleteIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Tooltip
              title={errors[`question-${index}`] || ''}
              open={expandedPanels.includes(index) && !!errors[`question-${index}`]}
              arrow
            >
              <TextField
                label="Pregunta"
                variant="outlined"
                fullWidth
                value={question.texto}
                onChange={(e) => handleQuestionChange(index, 'texto', e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors[`question-${index}`]}
              />
            </Tooltip>
            {question.opciones.map((opcion, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {i === question.opciones.length - 1 && (
                  <Tooltip
                    title={errors[`correct-${index}`] || ''}
                    open={expandedPanels.includes(index) && !!errors[`correct-${index}`]}
                    arrow
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={opcion.correcta}
                          onChange={() => handleCorrectOptionChange(index, i)}
                          sx={{
                            '&.Mui-checked': {
                              color: '#FFB300',
                            },
                          }}
                        />
                      }
                    />
                  </Tooltip>
                )}
                {i !== question.opciones.length - 1 && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={opcion.correcta}
                        onChange={() => handleCorrectOptionChange(index, i)}
                        sx={{
                          '&.Mui-checked': {
                            color: '#FFB300',
                          },
                        }}
                      />
                    }
                  />
                )}
                <Tooltip
                  title={errors[`option-${index}-${i}`] || ''}
                  open={expandedPanels.includes(index) && !!errors[`option-${index}-${i}`]}
                  arrow
                >
                  <TextField
                    label={`Opción ${i + 1}`}
                    variant="outlined"
                    fullWidth
                    value={opcion.texto}
                    onChange={(e) => handleOptionChange(index, i, 'texto', e.target.value)}
                    sx={{ mr: 2 }}
                    error={!!errors[`option-${index}-${i}`]}
                  />
                </Tooltip>
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
      {showPopup && (
        <ConfirmationPopup
          message="Los cambios se han guardado correctamente."
          duration={3000}
          onClose={() => setShowPopup(false)}
        />
      )}
    </Box>
  );
});

export default ExamQuestions;