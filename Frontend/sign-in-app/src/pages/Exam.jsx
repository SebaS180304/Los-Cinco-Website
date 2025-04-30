import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, CircularProgress, Dialog, Toolbar, Typography, LinearProgress, useMediaQuery, useTheme, Table, TableBody, TableHead, TableRow, TableCell, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from '../api/axios';
import Lectbar from '../components/LectBar';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Unity, useUnityContext } from "react-unity-webgl";

const LESSON_ARRAY_URL = '/CursoEstudiante/LeccionesIdCurso?id_curso=';
const QUIZ_URL = '/QuizEstudiante/Quiz';
const GRADES_URL = '/QuizEstudiante/Submitions?id_curso=';

const CUSTOM_COLOR = '#FFB300';

const Exam = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const courseId = Number(id);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [loading, setLoading] = useState(true);
    const [lessons, setLessons] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isGameLaunched, setIsGameLaunched] = useState(false);
    const [isPortrait, setIsPortrait] = useState(false);
    const [isExamActive, setIsExamActive] = useState(false);
    const [grades, setGrades] = useState(null);
    const [currentAttempt, setCurrentAttempt] = useState(grades ? grades.length + 1 : 1);
    const [currentGrade, setCurrentGrade] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    const { 
        unityProvider, 
        loadingProgression, 
        isLoaded, 
        sendMessage, 
        requestFullscreen,
        unload 
    } = useUnityContext({
        loaderUrl: "/assets/unity/FIxIt_Web.loader.js",
        dataUrl: "/assets/unity/FIxIt_Web.data",
        frameworkUrl: "/assets/unity/FIxIt_Web.framework.js",
        codeUrl: "/assets/unity/FIxIt_Web.wasm",
    });

    useEffect(() => {
        const fetchLessonsArray = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${LESSON_ARRAY_URL}${courseId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setLessons(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setErrorMsg("El curso no se encuentra disponible por el momento.");
                    setTimeout(() => {
                        navigate(-1);
                    }, 3000);
                } else {
                    console.error('Error al obtener el array de lecciones: ', error.message);
                }
            } finally {
                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            }
        };
        const fetchGrades = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${GRADES_URL}${courseId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setGrades(response.data);
            } catch (error) {
                console.error('Error al obtener las calificaciones: ', error.message);
            } finally {
                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            }
        }
        fetchGrades();
        fetchLessonsArray();
    }, [courseId, navigate]);

    useEffect(() => {
        if (isLoaded && isGameLaunched) {
            const jwtToken = localStorage.getItem('token'); 
            sendMessage("Receiver", "ReceiveToken", jwtToken);
            sendMessage("Receiver", "ReceiveCursoId", String(courseId));
            setIsExamActive(true);
            setCurrentGrade(null); // Resetear la calificación actual
            setCurrentAttempt(grades ? grades.length + 1 : 1); // Actualizar el número de intento
            console.log("Datos enviados a Unity:", { jwtToken, courseId });
        }
    }, [isLoaded, isGameLaunched, courseId, sendMessage, grades]);

    useEffect(() => {
        const mql = window.matchMedia("(orientation: portrait)");
        setIsPortrait(mql.matches);
        const handleOrientationChange = (e) => {
            setIsPortrait(e.matches);
        }
        mql.addEventListener("change", handleOrientationChange);
        return () => {
            mql.removeEventListener("change", handleOrientationChange);
        };
    }, []);

    // Mantener handleSubmitScore solo para el caso de cierre prematuro
    const handleSubmitScore = useCallback(async (score) => {
        try {
            await axios.post(QUIZ_URL, {
                id_curso: courseId,
                cal: score
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            
            // Actualizar el array de calificaciones localmente
            const newGrade = {
                cal: score,
                intento: currentAttempt,
                fecha: new Date().toISOString()
            };
            
            setGrades(prevGrades => [newGrade, ...(prevGrades || [])]);
            setCurrentGrade(score);
        } catch (error) {
            console.error('Error al enviar la puntuación: ', error.message);
        }
    }, [courseId, currentAttempt]); // Incluir las dependencias necesarias

    // Modificar handleExamClose para el cierre prematuro
    const handleExamClose = async () => {
        if (isExamActive) {
            const confirmClose = window.confirm(
                "¿Estás seguro de que deseas cerrar el examen? Si cierras ahora, se calificará con 0 este intento."
            );
            if (confirmClose) {
                try {
                    // Enviar calificación 0 a la API cuando se cierra prematuramente
                    await handleSubmitScore(0);
                    setIsGameLaunched(false);
                    setIsExamActive(false);
                } catch (error) {
                    console.error('Error al cerrar el examen: ', error.message);
                }
            }
        } else {
            setIsGameLaunched(false);
        }
    };

    useEffect(() => {
        const handleGameFinished = async (event) => {
            const { success, cal } = event.detail;
            console.log("Unity → React:", { success, cal });

            if (success) {
                try {
                    await handleSubmitScore(cal);
                    await unload();
                    setIsGameLaunched(false);
                    setIsExamActive(false);
                    alert(`¡Examen completado! Tu puntuación: ${cal}%`);
                } catch (err) {
                    console.error("Error al procesar el resultado del examen:", err);
                    alert("Error al guardar tu calificación. Por favor, contacta al administrador.");
                }
            } else {
                alert("Hubo un error procesando tu examen en Unity.");
            }
        };

        window.addEventListener("GameFinished", handleGameFinished);

        return () => {
            window.removeEventListener("GameFinished", handleGameFinished);
        };
    }, [courseId, currentAttempt, unload, handleSubmitScore]);

    if (loading) {
        return (
            <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#101626', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                <Dialog open={true} PaperProps={{ sx: { textAlign: 'center', padding: 4, bgcolor: '#212633' ,borderRadius: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: CUSTOM_COLOR }} />
                </Box>
                <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
                    Cargando Información de la Evaluación...
                </Typography>
                </Dialog>
            </Box>
        );
    }

    if (errorMsg) {
        return (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#101626', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <Dialog open={true} PaperProps={{ sx: { textAlign: 'center', padding: 4, bgcolor: '#212633', borderRadius: 2 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: CUSTOM_COLOR }} />
            </Box>
            <Typography variant="body1" sx={{ mt: 2, color: 'white' }}>
                {errorMsg}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'white' }}>
                Por favor, contacta al administrador del curso para más detalles.
            </Typography>
            </Dialog>
        </Box>
        );
    }

    return (
       <Box sx={{ display: 'flex', mt: '64px', backgroundColor: '#0F172A' }}>
            <Lectbar selectedView="quiz" setSelectedView={() => {}} lessons={lessons} disableMedia={true} mode="quiz" isMobile={isMobile} />
            <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'calc(100vh - 64px)' }}>
                <AppBar position="static" sx={{ backgroundColor: '#273661', boxShadow: 'none' }}>
                    <Toolbar>
                        <HistoryEduIcon sx={{ fontSize: 40 }} />
                        <Typography component="div" sx={{ ml: 2, fontWeight: 'bold' }}>
                            Examen Final
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box component="main" sx={{ 
                    p: { xs: 2, md: 3 }, 
                    overflow: 'auto', 
                    flexGrow: 1, 
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    width: '100%' 
                }}>
                    {!isGameLaunched ? (
                        <Box sx={{ width: '100%', maxWidth: '1200px', mt: '80px' }}>
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
                                        {isMobile ? (
                                            // Versión móvil de la tabla
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell sx={{ color: 'white', fontWeight: 'bold', border: 'none' }}>
                                                            MÁS RECIENTE
                                                        </TableCell>
                                                        <TableCell sx={{ color: 'white', border: 'none' }}>
                                                            Intento {grades.length} - {grades[0].cal}%
                                                        </TableCell>
                                                    </TableRow>

                                                    {grades.length > 1 && (
                                                        <>
                                                            <TableRow>
                                                                <TableCell sx={{ color: 'white', fontWeight: 'bold', border: 'none' }}>
                                                                    MÁS ALTO
                                                                </TableCell>
                                                                <TableCell sx={{ color: 'white', border: 'none' }}>
                                                                    {(() => {
                                                                        const highestGrade = grades.reduce((max, grade) => 
                                                                            grade.cal > max.cal ? grade : max
                                                                        , grades[0]);
                                                                        return `Intento ${grades.length - grades.indexOf(highestGrade)} - ${highestGrade.cal}%`;
                                                                    })()}
                                                                </TableCell>
                                                            </TableRow>

                                                            <TableRow>
                                                                <TableCell colSpan={2} sx={{ borderBottom: '2px solid #2D3748', padding: '8px 16px' }} />
                                                            </TableRow>

                                                            {grades.map((grade, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell sx={{ color: 'white' }}>
                                                                        Intento {grades.length - index}
                                                                    </TableCell>
                                                                    <TableCell sx={{ color: 'white' }}>
                                                                        {grade.cal}%
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        ) : (
                                            // Versión desktop de la tabla (mantener la original)
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }}></TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>INTENTO</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>PUNTAJE</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {/* Intento más reciente (siempre será el índice 0) */}
                                                    <TableRow>
                                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                            MÁS RECIENTE
                                                        </TableCell>
                                                        <TableCell sx={{ color: 'white' }}>
                                                            Intento {grades.length - 0}
                                                        </TableCell>
                                                        <TableCell sx={{ color: 'white' }}>
                                                            {grades[0].cal}%
                                                        </TableCell>
                                                    </TableRow>

                                                    {/* Intento más alto (si hay más de un intento) */}
                                                    {grades.length > 1 && (
                                                        <>
                                                            <TableRow>
                                                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                                    MÁS ALTO
                                                                </TableCell>
                                                                <TableCell sx={{ color: 'white' }}>
                                                                    {(() => {
                                                                        const highestIndex = grades.reduce((maxIndex, grade, index) => 
                                                                            grade.cal > grades[maxIndex].cal ? index : maxIndex
                                                                        , 0);
                                                                        return `Intento ${grades.length - highestIndex}`;
                                                                    })()}
                                                                </TableCell>
                                                                <TableCell sx={{ color: 'white' }}>
                                                                    {Math.max(...grades.map(grade => grade.cal))}%
                                                                </TableCell>
                                                            </TableRow>

                                                            {/* Separador */}
                                                            <TableRow>
                                                                <TableCell 
                                                                    colSpan={3} 
                                                                    sx={{ 
                                                                        borderBottom: '2px solid #2D3748',
                                                                        padding: '8px 16px'
                                                                    }}
                                                                />
                                                            </TableRow>

                                                            {/* Lista de todos los intentos (solo si hay más de 1) */}
                                                            {grades.map((grade, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell sx={{ color: 'white', border: 'none' }}></TableCell>
                                                                    <TableCell sx={{ color: 'white' }}>
                                                                        Intento {grades.length - index}
                                                                    </TableCell>
                                                                    <TableCell sx={{ color: 'white' }}>
                                                                        {grade.cal}%
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            )}
                    </Box>
                    ) : (
                        <Box sx={{ mt: '80px' }}>
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
                            <Unity unityProvider={unityProvider} style={{ width: "100%", height: "auto" }} />
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
       </Box>
    )
}

export default Exam;