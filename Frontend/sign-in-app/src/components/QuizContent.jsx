import React from 'react';
import { AppBar, Box, LinearProgress, Toolbar, Typography, Stack, Button } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

const CUSTOM_COLOR = '#FFB300';

const QuizContent = ({ question, current, total, selected, submitted, isCorrect, onSelect, onSubmit, onNext, onTryAgain }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'calc(100vh - 128px)' }}>
      <AppBar position="static" sx={{ backgroundColor: '#273661', boxShadow: 'none' }}>
        <Toolbar>
          <AssignmentOutlinedIcon sx={{ fontSize: 40 }} />
          <Typography component="div" sx={{ ml: 2, fontWeight: 'bold' }}>
            Evaluación
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, overflow: 'auto' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
          {question.texto}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ color: 'white', mr: 2 }}>
            {current + 1} / {total}
          </Typography>
          <Box>
            <LinearProgress
              variant="determinate"
              value={((current + 1) / total) * 100}
              sx={{
                height: 10,
                borderRadius: 5,
                width: '100px',
                backgroundColor: `${CUSTOM_COLOR}40`,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: CUSTOM_COLOR,
                },
              }}
            />
          </Box>
        </Box>
        <Stack spacing={3} mt={3} alignItems="center">
          {question.opciones.map((opt, i) => {
            const defaultBg = '#1E2A45';
            let borderStyle = '1px solid transparent';
            if (submitted) {
              if (i === selected) {
                borderStyle = opt.correcta
                  ? '4px solid #4CAF50'
                  : '4px solid #F44336';
              }
            } else if (i === selected) {
              borderStyle = '2px solid ' + CUSTOM_COLOR;
            }
  
            return (
              <Button
                key={opt.idOpcion}
                variant="contained"
                onClick={() => !submitted && onSelect(i)}
                sx={{
                  width: '80%',
                  backgroundColor: defaultBg,
                  color: 'white',
                  p: 2,
                  borderRadius: 2,
                  border: borderStyle,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border 0.2s ease-in-out',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: !submitted ? '#2b3b5a' : defaultBg
                  }
                }}
              >
                <Typography variant="body1" sx={{ textTransform: 'none' }}>
                  {opt.texto}
                </Typography>
              </Button>
            );
          })}
        </Stack>
        <Box mt={4} textAlign="center">
          {!submitted ? (
            <Button
              variant="contained"
              disabled={selected === null}
              onClick={onSubmit}
              sx={{
                backgroundColor: CUSTOM_COLOR,
                color: 'white',
                '&:hover': {
                  backgroundColor: `${CUSTOM_COLOR}CC`, color: 'black'
                }
              }}
            >
              ENVIAR
            </Button>
          ) : isCorrect ? (
            <Button
              variant="contained"
              onClick={onNext}
              sx={{
                backgroundColor: '#4CAF50',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#43A047'
                }
              }}
            >
              ¡CORRECTO! SIGUIENTE <ArrowForwardIcon sx={{ ml: 1 }} />
            </Button>
          ) : (
            <>
              <Typography sx={{ mt: 2, color: '#F44336' }}>
                Respuesta incorrecta. Inténtalo de nuevo.
              </Typography>
              <Button
                variant="contained"
                onClick={onTryAgain}
                sx={{
                  mt: 2,
                  backgroundColor: '#F44336',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#D32F2F'
                  }
                }}
              >
                <CloseIcon sx={{ mr: 1 }} /> REINTENTAR
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default QuizContent;