import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Button, CircularProgress, Dialog, Typography, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../components/Navbar';
import ProgressSection from '../components/ProgressSection';
import LessonAccordion from '../components/LessonAccordion';
import CourseHeader from '../components/CourseHeader';
import axios from '../api/axios';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const COURSE_URL = '/CursoEstudiante/Single?IdCurso=';

const CUSTOM_COLOR = '#FFB300';

const EnrolledCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [lessonExpanded, setLessonExpanded] = useState(false);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${COURSE_URL}${courseId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCourse(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setErrorMsg("El curso no se encuentra disponible por el momento.");
                    setTimeout(() => {
                        navigate(-1);
                    }, 3000);
                } else {
                    console.error('Error al obtener el curso: ', error.message);
                }
            } finally {
                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId, navigate]);

    // Si aún no se cargó la información de los endopoints, mostrar un loader
    if (loading) {
        return (
            <Dialog open={true} PaperProps={{ sx: { textAlign: 'center', padding: 4 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: CUSTOM_COLOR }} />
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Cargando Información del Curso...
                </Typography>
            </Dialog>
        );
    }

    // Mostrar el mensaje de error en un Dialog similar al loader
    if (errorMsg) {
        return (
            <Dialog open={true} PaperProps={{ sx: { textAlign: 'center', padding: 4 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: CUSTOM_COLOR }} />
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    {errorMsg}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Serás redirigido a la página anterior.
                </Typography>
            </Dialog>
        );
    }

    // Derivar las lecciones desde el objeto course
    const courseLessons = course?.lecciones || [];

    const handleLessonChange = (panel) => (event, isExpanded) => {
        setLessonExpanded(isExpanded ? panel : false);
    };

    const currentLesson = courseLessons.find(leccion => !leccion.completada);

    return (
        <Box sx={{ display: 'flex', mt: '64px' }}>
            <Navbar />
            <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box sx={{ backgroundColor: '#0c1633', borderRadius: '20px' }}>
                    <CourseHeader 
                        course={course} 
                        courseLessons={courseLessons} 
                        isMobile={isMobile} 
                    />
                    <Box sx={{ pt: 3 }}>
                        <ProgressSection 
                            course={course} 
                            courseLessons={courseLessons} 
                            isMobile={isMobile} 
                        />
                    </Box>
                </Box>
                <Box sx={{ pt: 7 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3  }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Contenido del Curso
                        </Typography>
                        <Button
                            component={Link}
                            to={`/exam/${course?.idCurso}`}
                            variant="outlined"
                            startIcon={<HistoryEduIcon />}
                            disabled={!!currentLesson}
                            sx={{
                                color: CUSTOM_COLOR,
                                border: `2px solid ${CUSTOM_COLOR}`,
                                '&:hover': { opacity: 0.8 },
                                ml: 'auto',
                            }}
                        >
                            Examen
                        </Button>
                    </Box>
                    {courseLessons.map(lecture => (
                        <LessonAccordion 
                            key={lecture.idLeccion}
                            lecture={lecture}
                            lessons={courseLessons}
                            panel={`panel-${lecture.idLeccion}`}
                            expanded={lessonExpanded}
                            handleChange={handleLessonChange}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default EnrolledCourse;