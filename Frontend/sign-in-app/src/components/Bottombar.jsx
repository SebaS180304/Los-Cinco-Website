import { AppBar, Box, Toolbar, Typography, Button, Container } from '@mui/material';
import React from 'react';
import { lecture_data } from './constants';
import { useNavigate } from 'react-router-dom'; //

function Bottombar({ currentLecture, setCurrentLecture, showQuiz, setShowQuiz, isLast, hideNavigation = false }) {
    const navigate = useNavigate();
    const handleNext = () => {
        // if (currentLecture < lecture_data.length - 1) {
        //     setCurrentLecture(currentLecture + 1);
        // }
            if (isLast) {
                navigate('/quiz'); // * redirige al quiz
            } else {
                setCurrentLecture(prev => prev + 1);
            }
    };
    

    const handleBack = () => {
        if (currentLecture > 0) {
            setCurrentLecture(currentLecture - 1);
        }
    };

    return ( 
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'black', height: '64px' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
                        {currentLecture + 1}/{lecture_data.length} lecciones
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2}}>
                    {!hideNavigation && (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button 
                            sx={{ color: '#FFB300', border: '2px solid #FFB300' }}
                            variant="outlined" 
                            onClick={handleBack}
                            disabled={currentLecture === 0}
                            >
                            Atrás
                            </Button>
                            <Button 
                            sx={{ backgroundColor: '#FFB300'}} 
                            variant="contained"
                            onClick={handleNext}
                            >
                            {isLast ? 'Ir al Quiz' : 'Siguiente'}
                            </Button>
                        </Box>
                    )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
     );
}

export default Bottombar;