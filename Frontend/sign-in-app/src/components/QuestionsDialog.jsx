import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

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
      <DialogTitle>Preguntas de Evaluación</DialogTitle>
      <DialogContent>
        {lecture?.questions?.map((question, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <TextField
                label="Pregunta"
                variant="outlined"
                fullWidth
                value={question.pregunta}
                onChange={(e) => onQuestionChange(index, 'pregunta', e.target.value)}
              />
            </AccordionSummary>
            <AccordionDetails>
              {question.opciones.map((opcion, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    label={`Opción ${i + 1}`}
                    variant="outlined"
                    fullWidth
                    value={opcion.texto}
                    onChange={(e) => onOptionChange(index, i, 'texto', e.target.value)}
                    sx={{ mr: 2 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={opcion.correcta}
                        onChange={() => onCorrectOptionChange(index, i)}
                      />
                    }
                    label="Correcta"
                  />
                  <IconButton
                    color="error"
                    onClick={() => onRemoveOption(index, i)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onAddOption(index)}
                >
                  Agregar Opción
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onAddQuestion}
            startIcon={<AddIcon />}
          >
            Agregar Pregunta
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onSaveQuestions}
          >
            Guardar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionsDialog;