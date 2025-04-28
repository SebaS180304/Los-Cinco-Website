import axios from '../api/axios';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CUSTOM_COLOR = '#FFB300';
const LESSON_COMPLETE_URL = '/QuizEstudiante?id_leccion=';

const Bottombar = ({ mode, currentLectureIndex, setCurrentLectureIndex, quizCompleted, lessons, courseId }) => {
    const navigate = useNavigate();

    const isLastLesson = currentLectureIndex === lessons.length - 1;
    const currentLesson = lessons[currentLectureIndex];

    const shouldShowExamButton = () => {
        // Caso 1: Última lección sin preguntas
        if (isLastLesson && !currentLesson.preguntas) {
            return true;
        }
        // Caso 2: Quiz de la última lección completado
        if (isLastLesson && currentLesson.preguntas && quizCompleted) {
            return true;
        }
        return false;
    };

    const handleNext = async () => {
        if (mode === 'quiz') {
            // En quiz: habilitado solo cuando el quiz esté completado.
            if (quizCompleted) {
                if (isLastLesson) {
                    navigate(`/exam/${courseId}`);
                } else {
                    const nextId = lessons[currentLectureIndex + 1].idLeccion;
                    setCurrentLectureIndex(currentLectureIndex + 1);
                    navigate(`/lesson/${nextId}`);
                }
            }
        } else if (mode === 'lesson') {
            const currentLesson = lessons[currentLectureIndex];
            
            // Si la lección no tiene preguntas y no está completada, hacer el PATCH
            if (!currentLesson.preguntas && !currentLesson.completada) {
                try {
                    await axios.patch(`${LESSON_COMPLETE_URL}${currentLesson.idLeccion}`, null, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                    currentLesson.completada = true;
                } catch (error) {
                    console.error('Error al marcar la lección como completada:', error);
                }
            }

            if (isLastLesson && !currentLesson.preguntas) {
                navigate(`/exam/${courseId}`);
            } else if (currentLesson.preguntas) {
                navigate(`/quiz/${currentLesson.idLeccion}`);
            } else if (!isLastLesson) {
                const nextId = lessons[currentLectureIndex + 1].idLeccion;
                setCurrentLectureIndex(currentLectureIndex + 1);
                navigate(`/lesson/${nextId}`);
            }
        }
    };

    const handleBack = () => {
        if (mode === 'quiz') {
            // En quiz: regresar a la vista lesson de la lección actual.
            const currentId = lessons[currentLectureIndex].idLeccion;
            navigate(`/lesson/${currentId}`);
        } else if (mode === 'lesson') {
            // En lesson: si existe, redirige al quiz de la lección anterior.
            if (currentLectureIndex > 0) {
                const prevId = lessons[currentLectureIndex - 1].idLeccion;
                setCurrentLectureIndex(currentLectureIndex - 1);
                if (lessons[currentLectureIndex - 1].preguntas) {
                    navigate(`/quiz/${prevId}`);
                } else {
                    navigate(`/lesson/${prevId}`);
                }
            }
        }
    };

    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'black', height: '64px' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
                        {currentLectureIndex + 1}/{lessons.length} lecciones
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2}}>
                        <Button 
                            sx={{ color: CUSTOM_COLOR, border: `2px solid ${CUSTOM_COLOR}`, '&:hover': { opacity: 0.8 } }}
                            variant="outlined" 
                            onClick={handleBack}
                            disabled={mode === 'lesson' && currentLectureIndex === 0}
                        >
                            Atrás
                        </Button>
                        <Button 
                            sx={{ backgroundColor: CUSTOM_COLOR, '&:hover': { backgroundColor: `${CUSTOM_COLOR}CC`, color: 'black' } }} 
                            variant="contained"
                            onClick={handleNext}
                            disabled={mode === 'quiz' && !quizCompleted}
                        >
                            {shouldShowExamButton() ? 'Ir al Examen' : 'Siguiente'}
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Bottombar;