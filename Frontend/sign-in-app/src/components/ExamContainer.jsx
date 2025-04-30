import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    LinearProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import { Unity } from 'react-unity-webgl';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GradesTable from './GradesTable';

const CUSTOM_COLOR = '#FFB300';

const ExamContainer = ({
    isGameLaunched,
    setIsGameLaunched,
    isPortrait,
    isMobile,
    grades,
    isLoaded,
    loadingProgression,
    unityProvider,
    requestFullscreen,
    handleExamClose
}) => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'calc(100vh - 64px)' }}>
            <AppBar position="static" sx={{ backgroundColor: '#273661', boxShadow: 'none' }}>
                <Toolbar>
                    <HistoryEduIcon sx={{ fontSize: 40 }} />
                    <Typography component="div" sx={{ ml: 2, fontWeight: 'bold' }}>
                        Examen Final
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ p: 3, overflow: 'auto' }}>
                {!isGameLaunched ? (
                    <Box sx={{ width: '100%', maxWidth: '1200px' }}>
                        <Typography 
                            variant={isMobile ? "h6" : "h5"} 
                            fontWeight="bold" 
                            gutterBottom 
                            sx={{ color: 'white' }}
                        >
                            Has terminado todas las lecciones del curso.
                        </Typography>
                        <Typography 
                            variant={isMobile ? "h5" : "h4"} 
                            fontWeight="bold" 
                            gutterBottom 
                            sx={{ color: 'white' }}
                        >
                            ¡Ahora puedes realizar el examen final de curso!
                        </Typography>
                        {isPortrait && (
                            <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                                Por favor, gira tu dispositivo a modo horizontal para realizar tu examen.
                            </Typography>
                        )}
                        <Button
                            variant="outlined"
                            onClick={()=> setIsGameLaunched(true)}
                            startIcon={<HistoryEduIcon />}
                            disabled={isPortrait}
                            sx={{
                                color: CUSTOM_COLOR,
                                mb: 2,
                                border: `2px solid ${CUSTOM_COLOR}`,
                                '&:hover': { opacity: 0.8 },
                            }}
                        >
                            Comenzar Examen
                        </Button>
                                            
                        {/* Tabla de calificaciones */}
                        {grades && grades.length > 0 && (
                            <Accordion 
                                expanded={expanded} 
                                onChange={handleAccordionChange}
                                sx={{ 
                                    width: '100%',
                                    bgcolor: '#373e52', 
                                    borderRadius: '20px',
                                    mt: 3,
                                    '&:before': {
                                        display: 'none',
                                    }
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                    sx={{ 
                                        borderRadius: expanded ? '20px 20px 0 0' : '20px',
                                    }}
                                >
                                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                        Historial de Intentos {grades.length > 0 && `(${grades.length})`}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <GradesTable grades={grades} isMobile={isMobile} />
                                </AccordionDetails>
                            </Accordion>
                        )}
                    </Box>
                ) : (
                    <Box>
                        {!isLoaded && (
                            <>
                                <LinearProgress
                                    variant="determinate"
                                    value={Math.round(loadingProgression * 100)}
                                    sx={{
                                        height: '20px',
                                        borderRadius: '10px',
                                        backgroundColor: `${CUSTOM_COLOR}40`,
                                        '& .MuiLinearProgress-bar': {
                                            borderRadius: '10px',
                                            backgroundColor: CUSTOM_COLOR,
                                        },
                                    }}
                                />
                                <Typography variant="body1" sx={{ mt: 2, color: 'white' }}>
                                    Cargando el examen... {Math.round(loadingProgression * 100)}%
                                </Typography>
                            </>
                        )}
                        <Unity unityProvider={unityProvider} style={{ width: "80%", height: "auto" }} />
                        <Box sx={{ 
                            display: 'flex', 
                            gap: 2, 
                            justifyContent: 'center',
                            mt: 2 
                        }}>
                            <Button
                                variant="outlined"
                                onClick={() => requestFullscreen(true)}
                                startIcon={<FullscreenIcon />}
                                sx={{
                                    color: CUSTOM_COLOR,
                                    border: `2px solid ${CUSTOM_COLOR}`,
                                    '&:hover': { opacity: 0.8 },
                                }}
                            >
                                Pantalla Completa
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleExamClose}
                                startIcon={<HistoryEduIcon />}
                                sx={{
                                    color: CUSTOM_COLOR,
                                    border: `2px solid ${CUSTOM_COLOR}`,
                                    '&:hover': { opacity: 0.8 },
                                }}
                            >
                                Cerrar Examen
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ExamContainer;