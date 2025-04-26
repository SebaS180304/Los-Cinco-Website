import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, useTheme, useMediaQuery, Dialog, CircularProgress, Typography } from '@mui/material';
import Lectbar from '../components/LectBar';
import Bottombar from '../components/Bottombar';
import QuizContainer from '../components/QuizContainer';
import axios from '../api/axios';

const QUIZ_URL = '/QuizEstudiante?id_leccion=';
const LESSON_ARRAY_URL = '/CursoEstudiante/Lecciones?id_leccion=';

const CUSTOM_COLOR = '#FFB300';

const Quiz = () => {
  const { id } = useParams();
  const lessonId = Number(id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [lessonsArray, setLessonsArray] = useState([]);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Obtener el quiz y el array de lecciones en paralelo
        const [quizResponse, lessonsArrayResponse] = await Promise.all([
          axios.get(`${QUIZ_URL}${lessonId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          axios.get(`${LESSON_ARRAY_URL}${lessonId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
        ]);

        setQuiz(quizResponse.data);
        setLessonsArray(lessonsArrayResponse.data);
        
        // Validar si el quiz ya está completado
        if (quizResponse.data?.completado) {
          setQuizCompleted(true);
        }

      } catch (error) {
        console.error('Error al obtener datos:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lessonId]);

  useEffect(() => {
    if (lessonsArray?.length > 0) {
      const initialIndex = lessonsArray.findIndex((lec) => lec.idLeccion === lessonId);
      setCurrentLectureIndex(initialIndex >= 0 ? initialIndex : 0);
    }
  }, [lessonsArray, lessonId]);

  const handleQuizComplete = async () => {
    try {
      await axios.patch(`${QUIZ_URL}${lessonId}`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setQuizCompleted(true);
    } catch (error) {
      console.error('Error al actualizar el estado del quiz:', error.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#101626',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <Dialog 
          open={true} 
          PaperProps={{ 
            sx: { 
              textAlign: 'center', 
              padding: 4,
              bgcolor: '#212633',
              borderRadius: 2
            } 
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress sx={{ color: CUSTOM_COLOR }} />
          </Box>
          <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
            Cargando Quiz...
          </Typography>
        </Dialog>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', mb: '64px', mt: '64px', backgroundColor: '#0F172A' }}>
      <Lectbar
        selectedView="quiz"
        setSelectedView={() => {}}
        disableMedia={true}
        mode="quiz"
        isMobile={isMobile}
        lessons={lessonsArray}
      />
      <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <QuizContainer
          questions={quiz?.preguntas || []}
          onQuizComplete={handleQuizComplete}
          isLectureComplete={lessonsArray[currentLectureIndex]?.completada}
        />
      </Box>
      {lessonsArray?.length > 0 && (
        <Bottombar
          mode="quiz"
          currentLectureIndex={currentLectureIndex}
          setCurrentLectureIndex={setCurrentLectureIndex}
          quizCompleted={quizCompleted}
          lessons={lessonsArray}
        />
      )}
    </Box>
  );
};

export default Quiz;