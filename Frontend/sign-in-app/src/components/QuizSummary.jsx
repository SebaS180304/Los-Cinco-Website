import React from 'react';
import { AppBar, Box, Toolbar, Typography, Stack, Card, CardContent, Button } from '@mui/material';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CUSTOM_COLOR = '#FFB300';

const QuizSummary = ({ questions }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'calc(100vh - 128px)' }}>
      <AppBar position="static" sx={{ backgroundColor: '#273661', boxShadow: 'none' }}>
        <Toolbar>
          <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 40 }} />
          <Typography component="div" sx={{ ml: 2, fontWeight: 'bold' }}>
            Evaluación Completada
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, overflow: 'auto', flex: 1 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
            Resumen de la Evaluación
        </Typography>
        <Stack spacing={2} mt={3} alignItems="center">
          {questions.map((q, idx) => {
            const correctOptions = q.opciones.filter(opt => opt.correcta);
            return (
              <Card key={q.idPregunta} sx={{ backgroundColor: '#1E2A45', borderRadius: 2, width: '80%', p: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {idx + 1}. {q.texto}
                  </Typography>
                  {correctOptions.map((opt) => (
                    <Box key={opt.idOpcion} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <CheckCircleIcon sx={{ color: CUSTOM_COLOR, mr: 1 }} />
                      <Typography variant="body1" sx={{ color: 'white' }}>
                        {opt.texto}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default QuizSummary;