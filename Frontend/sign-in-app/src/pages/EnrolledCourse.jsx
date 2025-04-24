import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Dialog, Typography, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../components/Navbar';
import ProgressSection from '../components/ProgressSection';
import LessonAccordion from '../components/LessonAccordion';
import CourseHeader from '../components/CourseHeader';
import axios from '../api/axios';

const COURSE_URL = '/CursoEstudiante/Single?IdCurso=';

const CUSTOM_COLOR = '#FFB300';

const EnrolledCourse = () => {
    const { courseId } = useParams();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [lessonExpanded, setLessonExpanded] = useState(false);

    const [course, setCourse] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${COURSE_URL}${courseId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                // Guarda la data tal cual viene de la API sin transformación
                setCourse(response.data);
            } catch (error) {
                console.error('Error al obtener el curso: ', error.message);
            } finally {
                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    // Derivar las lecciones desde el objeto course
    const courseLessons = course?.lecciones || [];

    const handleLessonChange = (panel) => (event, isExpanded) => {
        setLessonExpanded(isExpanded ? panel : false);
    };

    // Si aún no se cargó la información de los endopoints, mostrar un loader
    if (loading) {
        return (
            <Dialog open={true} PaperProps={{ sx: { textAlign: 'center', padding: 4 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: CUSTOM_COLOR }} />
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Cargando Información...
                </Typography>
            </Dialog>
        );
    }

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
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Contenido del Curso
                    </Typography>
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