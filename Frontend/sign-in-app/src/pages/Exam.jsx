import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, CircularProgress, Dialog, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from '../api/axios';
import Lectbar from '../components/LectBar';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const LESSON_ARRAY_URL = '/CursoEstudiante/LeccionesIdCurso?id_curso=';

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
        fetchLessonsArray();
    }, [courseId, navigate]);

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
            <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'calc(100vh - 128px)' }}>
                <AppBar position="static" sx={{ backgroundColor: '#273661', boxShadow: 'none' }}>
                    <Toolbar>
                        <HistoryEduIcon sx={{ fontSize: 40 }} />
                        <Typography component="div" sx={{ ml: 2, fontWeight: 'bold' }}>
                            Examen Final
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box component="main" sx={{ p: 3, overflow: 'auto', flexGrow: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>
                        Has terminado todas las lecciones del curso.
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>
                        ¡Ahora puedes realizar el examen final de curso!
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<HistoryEduIcon />}
                        sx={{
                            color: CUSTOM_COLOR,
                            border: `2px solid ${CUSTOM_COLOR}`,
                            '&:hover': { opacity: 0.8 },
                        }}
                    >
                        Comenzar Examen
                    </Button>
                </Box>
            </Box>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'black', height: '64px' }}>
            <Toolbar>
            </Toolbar>
        </AppBar>
       </Box>
    )
}

export default Exam