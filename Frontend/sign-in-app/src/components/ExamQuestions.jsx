import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Checkbox, FormControlLabel, Tooltip, } from '@mui/material';
import axios from '../api/axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
            <Typography variant="body1" sx={{ mb: 2 }}>
              {question.texto}
            </Typography>
            {question.opciones.map((opcion, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FormControlLabel
                  control={
                    <Tooltip title={opcion.correcta ? 'Opción Correcta' : 'Opción Incorrecta'}>
                      <Checkbox
                        checked={opcion.correcta}
                        disabled
                        sx={{
                          '&.Mui-checked': {
                            color: '#FFB300',
                          },
                        }}
                      />
                    </Tooltip>
                  }
                  label={opcion.texto}
                />
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ExamQuestions;