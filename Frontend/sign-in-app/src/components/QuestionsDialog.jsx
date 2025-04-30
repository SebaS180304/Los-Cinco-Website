import React, { useState, } from 'react';
import { Dialog, DialogTitle, DialogContent, Accordion, AccordionSummary, AccordionDetails, TextField, Box, Button, FormControlLabel, Checkbox, IconButton, Typography, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckMark from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionsDialog = ({ open, onClose, lecture, onQuestionChange, onOptionChange, onCorrectOptionChange, onAddOption, onRemoveOption, onAddQuestion, onSaveQuestions, onRemoveQuestion, isMobile }) => {
  const [errors, setErrors] = useState({}); // Estado para manejar los errores
  const [expandedPanels, setExpandedPanels] = useState([]); // Estado para manejar los paneles expandidos

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanels((prev) =>
      isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
    );
  };
  
  const handleAddQuestion = () => {
    onAddQuestion(); // Llamar a la función original para agregar la pregunta
    setExpandedPanels((prev) => [...prev, lecture.questions.length]); // Expandir automáticamente la nueva pregunta
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    // Eliminar el error del checkbox si existe
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[`correct-${questionIndex}`];
      return updatedErrors;
    });
  
    // Llamar a la función original para manejar el cambio
    onCorrectOptionChange(questionIndex, optionIndex);
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    // Eliminar el error del campo de texto si existe
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[`option-${questionIndex}-${optionIndex}`];
      return updatedErrors;
    });
  
    // Llamar a la función original para manejar el cambio
    onOptionChange(questionIndex, optionIndex, field, value);
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    // Eliminar el error de la pregunta si existe
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[`question-${questionIndex}`];
      return updatedErrors;
    });
  
    // Llamar a la función original para manejar el cambio
    onQuestionChange(questionIndex, field, value);
  };

  const handleSave = () => {
    const newErrors = {}; // Objeto para almacenar los errores
    const panelsToExpand = []; // Array para almacenar los paneles que deben expandirse

    // Validar preguntas
    lecture.questions.forEach((question, questionIndex) => {
      // Verificar si la pregunta no tiene texto
      if (!question.texto.trim()) {
        newErrors[`question-${questionIndex}`] = 'La pregunta no puede estar vacía.';
        panelsToExpand.push(questionIndex);
      }

      // Verificar si alguna opción está vacía
      question.opciones.forEach((opcion, optionIndex) => {
        if (!opcion.texto.trim()) {
          newErrors[`option-${questionIndex}-${optionIndex}`] = 'La opción no puede estar vacía.';
          panelsToExpand.push(questionIndex);
        }
      });

      // Verificar si no hay ninguna opción marcada como correcta
      const noCorrectOption = !question.opciones.some((opcion) => opcion.correcta);
      if (noCorrectOption) {
        newErrors[`correct-${questionIndex}`] = 'Debe seleccionar al menos una opción correcta.';
        panelsToExpand.push(questionIndex);
      }
    });

    // Si hay errores, actualiza el estado y no guarda
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setExpandedPanels([...new Set(panelsToExpand)]);
      return;
    }

    // Si no hay errores, limpia los errores y guarda
    setErrors({});
    setExpandedPanels([]);
    onSaveQuestions();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', // Cambiar a columna en móvil
          alignItems: isMobile ? 'flex-start' : 'center', // Alinear correctamente en móvil
          justifyContent: 'space-between', 
          mr: 3, 
          pb: 0 
        }}
      >
        <DialogTitle>Preguntas de Evaluación</DialogTitle>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddQuestion}
          startIcon={<AddIcon />}
          disabled={lecture?.questions?.length >= 10} // Limitar a 10 preguntas
          sx={{
            mt: isMobile ? 2 : 0, // Agregar margen superior en móvil para separar del texto
            ml: isMobile ? 3 : 0,
            alignSelf: isMobile ? 'stretch' : 'auto', // Alinear al ancho completo en móvil
          }}
        >
          Agregar Pregunta
        </Button>
      </Box>
      <DialogContent
        sx={{
          minHeight: '400px', // Altura mínima
          maxHeight: '500px', // Altura máxima
          overflowY: 'auto', // Habilitar scroll si el contenido excede el tamaño máximo
          position: 'relative', // Para el scroll
        }}
      >
        {lecture?.questions?.map((question, questionIndex) => (
          <Accordion
          key={questionIndex}
          expanded={expandedPanels.includes(questionIndex)} // Expandir si está en la lista
          onChange={handleAccordionChange(questionIndex)}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{question.texto || 'Nueva Pregunta'}</Typography>
              <IconButton
                color="error"
                onClick={() => onRemoveQuestion(questionIndex)}
                sx={{ ml: 'auto' }}
              >
                <DeleteIcon />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              <Tooltip
                title={errors[`question-${questionIndex}`] || ''}
                open={expandedPanels.includes(questionIndex) && !!errors[`question-${questionIndex}`]} // Mostrar solo si hay error
                arrow
              >
                <TextField
                  label="Pregunta"
                  variant="outlined"
                  fullWidth
                  value={question.texto}
                  onChange={(e) => handleQuestionChange(questionIndex, 'texto', e.target.value)}
                  sx={{ mb: 2 }}
                  error={!!errors[`question-${questionIndex}`]} // Resaltar en rojo si hay error
                />
              </Tooltip>
              {question.opciones.map((opcion, optionIndex) => (
                <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {/* Mostrar el Tooltip solo en el último checkbox */}
                  {optionIndex === question.opciones.length - 1 && (
                    <Tooltip
                      title={errors[`correct-${questionIndex}`] || ''}
                      open={expandedPanels.includes(questionIndex) && !!errors[`correct-${questionIndex}`]} // Mostrar solo si hay error
                      arrow
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={opcion.correcta}
                            onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
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
                  {/* Checkbox sin Tooltip para las demás opciones */}
                  {optionIndex !== question.opciones.length - 1 && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={opcion.correcta}
                          onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
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
                    title={errors[`option-${questionIndex}-${optionIndex}`] || ''}
                    open={expandedPanels.includes(questionIndex) && !!errors[`option-${questionIndex}-${optionIndex}`]} // Mostrar solo si hay error
                    arrow
                  >
                    <TextField
                      label={`Opción ${optionIndex + 1}`}
                      variant="outlined"
                      fullWidth
                      value={opcion.texto}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, 'texto', e.target.value)}
                      sx={{ mr: 2 }}
                      error={!!errors[`option-${questionIndex}-${optionIndex}`]} // Resaltar en rojo si hay error
                    />
                  </Tooltip>
                  <IconButton
                    color="error"
                    onClick={() => onRemoveOption(questionIndex, optionIndex)}
                    disabled={question.opciones.length <= 2} // Deshabilitar si hay menos de 2 opciones
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
              {question.opciones.length < 4 && ( // Mostrar el botón solo si hay menos de 4 opciones
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onAddOption(questionIndex)}
                    disabled={question.opciones.length >= 4} // Limitar a 4 opciones
                    startIcon={<AddIcon />}
                  >
                    Agregar Opción
                  </Button>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </DialogContent>
      <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: isMobile ? 'center' : 'end', mb: 2, gap: 2, mr: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          startIcon={<CloseIcon />}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSave} // Usar la nueva función de guardar con validaciones
          startIcon={<CheckMark />}
          sx={{
            backgroundColor: '#FFB300',
            color: '#ffffff',
          }}
        >
          Guardar
        </Button>
      </Box>
    </Dialog>
  );
};

export default QuestionsDialog;