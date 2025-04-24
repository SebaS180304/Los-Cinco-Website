import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Lectbar from '../components/LectBar';
import Bottombar from '../components/Bottombar';
import QuizContainer from '../components/QuizContainer';
import { lecture_data } from '../components/constants';

const Quiz = () => {
  const { id } = useParams();
  const lessonId = Number(id);
  const initialIndex = lecture_data.findIndex((lec) => lec.id === lessonId);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const lesson = lecture_data[currentLectureIndex];
  const questions = lesson.quiz || [];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Estado que indica que el quiz se ha completado.
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Callback que se pasa al QuizContainer y se invoca al finalizar el quiz.
  const handleQuizComplete = () => {
    setQuizCompleted(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        mb: '64px',
        mt: '64px',
        backgroundColor: '#0F172A',
      }}
    >
      <Lectbar
        selectedView="quiz"
        setSelectedView={() => {}}
        disableMedia={true}
        mode="quiz"
        isMobile={isMobile}
      />
      <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <QuizContainer
          questions={questions}
          onQuizComplete={handleQuizComplete}
          isLectureComplete={lesson.isCompleted === 1}
        />
      </Box>
      {/* Bottombar recibe quizCompleted para saber si se puede avanzar */}
      <Bottombar
        mode="quiz"
        currentLectureIndex={currentLectureIndex}
        setCurrentLectureIndex={setCurrentLectureIndex}
        quizCompleted={quizCompleted}
      />
    </Box>
  );
};

export default Quiz;