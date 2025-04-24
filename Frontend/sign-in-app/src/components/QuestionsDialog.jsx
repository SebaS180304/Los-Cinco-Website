import React from 'react';
import { Dialog, DialogTitle, DialogContent, Accordion, AccordionSummary, AccordionDetails, TextField, Box, Button, FormControlLabel, Checkbox, IconButton, Typography, Tooltip, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckMark from '@mui/icons-material/Check';

const QuestionsDialog = ({
  open,
  onClose,
  lecture,
  onQuestionChange,
  onOptionChange,
  onCorrectOptionChange,
  onAddOption,
  onRemoveOption,
  onAddQuestion,
  onSaveQuestions,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mr: 3, pb: 0 }}>
        <DialogTitle>Preguntas de Lección</DialogTitle>
          <Button
            variant="outlined"
            color="primary"
            onClick={onAddQuestion}
            startIcon={<AddIcon />}
            disabled={lecture?.questions?.length >= 10} // Limitar a 10 preguntas
          >
            Agregar Pregunta
          </Button>
        </Box>
      <DialogContent
        sx={{
          minHeight: '400px', // Altura mínima
          maxHeight: '500px', // Altura máxima
          overflowY: 'auto',  // Habilitar scroll si el contenido excede el tamaño máximo
        }}
      >
        {lecture?.questions?.map((question, index) => (
          <Accordion key={index}  defaultExpanded={index === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{question.texto || "Nueva Pregunta"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="Pregunta"
                variant="outlined"
                fullWidth
                value={question.texto}
                onChange={(e) => onQuestionChange(index, 'texto', e.target.value)}
                sx={{ mb: 2 }}
              />
              {question.opciones.map((opcion, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Tooltip title="Opción Correcta">
                        <Checkbox
                          checked={opcion.correcta}
                          onChange={() => onCorrectOptionChange(index, i)}
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
                    onChange={(e) => onOptionChange(index, i, 'texto', e.target.value)}
                    sx={{ mr: 2 }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => onRemoveOption(index, i)}
                    disabled={question.opciones.length <= 2} // Deshabilitar si hay menos de 2 opciones
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
              {question.opciones.length < 4 && ( // Mostrar el botón solo si hay menos de 4 opciones}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onAddOption(index)}
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
        <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', mb: 2, gap: 2, mr: 2 }}>
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
            onClick={onSaveQuestions}
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