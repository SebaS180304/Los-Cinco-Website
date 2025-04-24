import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { lecture_data } from './constants';

const CUSTOM_COLOR = '#FFB300';

function Bottombar({ mode, currentLectureIndex, setCurrentLectureIndex, quizCompleted }) {
    const navigate = useNavigate();

    const handleNext = () => {
        if (mode === 'quiz') {
            // En quiz: habilitado solo cuando el quiz esté completado.
            if (quizCompleted && currentLectureIndex < lecture_data.length - 1) {
                const nextId = lecture_data[currentLectureIndex + 1].id;
                setCurrentLectureIndex(currentLectureIndex + 1);
                navigate(`/lesson/${nextId}`);
            }
        } else if (mode === 'lesson') {
            // En lesson: redirige al quiz de la lección actual.
            const currentId = lecture_data[currentLectureIndex].id;
            navigate(`/quiz/${currentId}`);
        }
    };

    const handleBack = () => {
        if (mode === 'quiz') {
            // En quiz: regresar a la vista lesson de la lección actual.
            const currentId = lecture_data[currentLectureIndex].id;
            navigate(`/lesson/${currentId}`);
        } else if (mode === 'lesson') {
            // En lesson: si existe, redirige al quiz de la lección anterior.
            if (currentLectureIndex > 0) {
                const prevId = lecture_data[currentLectureIndex - 1].id;
                setCurrentLectureIndex(currentLectureIndex - 1);
                navigate(`/quiz/${prevId}`);
            }
        }
    };

    return ( 
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'black', height: '64px' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
                        {currentLectureIndex + 1}/{lecture_data.length} lecciones
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
                            disabled={mode === 'quiz' && (!quizCompleted || currentLectureIndex === lecture_data.length - 1)}
                        >
                            Siguiente
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
     );
}

export default Bottombar;