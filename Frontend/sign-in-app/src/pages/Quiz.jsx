import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import Lectbar from '../components/LectBar';
import Bottombar from '../components/Bottombar';

const questions = [
  {
    text: "Pregunta Prueba 1",
    options: ["Respuesta 1", "Respuesta 2 (correcta)", "Respuesta 3", "Respuesta 4"],
    correct: 1,
  },
  {
    text: "Pregunta Prueba 2",
    options: ["Respuesta 1", "Respuesta 2", "Respuesta 3", "Respuesta 4 (correcta)"],
    correct: 3,
  },
  {
    text: "Pregunta Prueba 3",
    options: ["Respuesta 1 (correcta)", "Respuesta 2 ", "Respuesta 3", "Respuesta 4"],
    correct: 0,
  }
];

const Quiz = ({ onFinish }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  const handleSubmit = () => {
    const wasCorrect = selected === question.correct;
    setIsCorrect(wasCorrect);
    setSubmitted(true);
    if (wasCorrect) setScore(score + 1);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setSubmitted(false);
      setIsCorrect(false);
    } else {
      setFinished(true);
    }
  };

  const handleTryAgain = () => {
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <Box sx={{ display: 'flex', mt: '64px', mb: '64px', backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <Lectbar selectedView="quiz" setSelectedView={() => {}} disableMedia={true} />
      <Box component="main" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center',textAlign: 'center',  width: '100%' }}>
        <Box
          sx={{
            maxWidth: 800,
            mx: 'auto',
            p: 2,
            backgroundColor: '#0F172A',
            color: 'white',
            minHeight: 'calc(100vh - 128px)'
          }}
        >
          {finished ? (
            <Box textAlign="center">
              <Typography variant="h4" gutterBottom sx={{ color: '#FFB300' ,fontSize: '40px'}}>
                ¡Felicidades!
              </Typography>
              <Typography variant="h6">
                Tu puntuación: {score} / {questions.length}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  backgroundColor: '#FFB300',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#e6a800'
                  }
                }}
                onClick={onFinish}
              >
                SIGUIENTE LECCIÓN
              </Button>
            </Box>
          ) : (
            <>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#FFB300', fontSize: '32px' }}>
            {question.text}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'white', mt: 1 }}>
            Pregunta {current + 1} de {questions.length}
            </Typography>

              <Stack spacing={3} mt={3} alignItems="center">
                {question.options.map((opt, i) => {
                    let bg = '#1E2A45';
                    if (submitted) {
                    if (i === question.correct) bg = '#4CAF50';
                    else if (i === selected) bg = '#F44336';
                    } else if (i === selected) {
                    bg = '#27364F';
                    }

                    return (
                    <Box
                        key={i}
                        onClick={() => !submitted && setSelected(i)}
                        sx={{
                        width: '100%',
                        maxWidth: 400,
                        backgroundColor: bg,
                        color: 'white',
                        px: 15,
                        py: 1,
                        borderRadius: 2,
                        cursor: !submitted ? 'pointer' : 'default',
                        fontWeight: 500,
                        fontSize: '18px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        minHeight: 56,
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: !submitted ? '#2b3b5a' : bg,
                        },
                        }}
                    >
                        {opt}
                    </Box>
                    );
                })}
            </Stack>

              <Box mt={4} textAlign="center">
                {!submitted ? (
                  <Button
                    variant="contained"
                    disabled={selected === null}
                    onClick={handleSubmit}
                    sx={{
                      backgroundColor: '#FFB300',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: '#e6a800'
                      }
                    }}
                  >
                    ENVIAR
                  </Button>
                ) : isCorrect ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#43A047'
                      }
                    }}
                  >
                    ¡CORRECTO! SIGUIENTE
                  </Button>
                ) : (
                  <>
                    <Typography sx={{ mt: 2, color: '#F44336' }}>
                      Respuesta incorrecta. Inténtalo de nuevo.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleTryAgain}
                      sx={{
                        mt: 2,
                        backgroundColor: '#F44336',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#D32F2F'
                        }
                      }}
                    >
                      REINTENTAR
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Bottombar
        currentLecture={0}
        setCurrentLecture={() => {}}
        isLast={true}
        hideNavigation={true}
      />
    </Box>
  );
};

export default Quiz;
