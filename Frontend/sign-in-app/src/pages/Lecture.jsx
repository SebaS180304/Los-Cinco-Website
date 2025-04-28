import React, { useState, useEffect } from 'react';
import Lectbar from '../components/LectBar';
import { Box, CircularProgress, Dialog, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Media from '../components/Media';
import Content from '../components/Content';
import Bottombar from '../components/Bottombar';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const LESSON_URL = '/CursoEstudiante/Leccion?id_leccion='
const LESSON_ARRAY_URL = '/CursoEstudiante/Lecciones?id_leccion='

const CUSTOM_COLOR = '#FFB300';

function Lecture() {
    const { id } = useParams();
    const lessonId = Number(id);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [selectedView, setSelectedView] = useState('content');
    const [loading, setLoading] = useState(true);
    const [lesson, setLesson] = useState(null);
    const [lessons, setLessons] = useState(null);
    const [lessonsArray, setLessonsArray] = useState([]);
    const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${LESSON_URL}${lessonId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setLesson(response.data);
            } catch (error) {
                console.error('Error al obtener la lección: ', error.message);
            } finally {
                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            }
        };
        const fetchLessonsArray = async () => {
            try {
                const response = await axios.get(`${LESSON_ARRAY_URL}${lessonId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setLessons(response.data);
                setLessonsArray(response.data.lecciones);
            } catch (error) {
                console.error('Error al obtener el array de lecciones: ', error.message);
            } finally {
                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            }
        };
        fetchLesson();
        fetchLessonsArray();
    }, [lessonId]);

    useEffect(() => {
        if (lessonsArray?.length > 0) {
            const initialIndex = lessonsArray.findIndex((lec) => lec.idLeccion === lessonId);
            setCurrentLectureIndex(initialIndex >= 0 ? initialIndex : 0);
        }
    }, [lessonsArray, lessonId]);

    const disableMedia = lesson?.tipo === 0 || lesson?.url === 'NA';

    useEffect(() => {
        if (disableMedia && selectedView === 'model') {
            setSelectedView('content');
        }
    }, [disableMedia, selectedView]);

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
                        Cargando Información de la Lección...
                    </Typography>
                </Dialog>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', mt: '64px', mb: '64px', width: '100%', backgroundColor: '#0F172A' }}>
            <Lectbar 
                selectedView={selectedView} 
                setSelectedView={setSelectedView} 
                disableMedia={disableMedia}
                mode='lesson'
                isMobile={isMobile}
                lessons={lessons}
            />
            <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {isMobile ? (
                    selectedView === 'content' ? 
                        <Content currentLecture={lesson} isMobile={isMobile} /> :
                        <Media mediaType={lesson?.tipo} src={lesson?.url} isMobile={isMobile} />
                ) : (
                    <Stack direction="row" justifyContent={'space-between'}>
                        <Content currentLecture={lesson} isMobile={isMobile} />
                        <Media mediaType={lesson?.tipo} src={lesson?.url} isMobile={isMobile} />
                    </Stack>
                )}
            </Box>
            {/* Modificar el Bottombar para que solo se muestre cuando tengamos datos */}
            {lessonsArray?.length > 0 && (
                <Bottombar 
                    mode="lesson" 
                    currentLectureIndex={currentLectureIndex} 
                    setCurrentLectureIndex={setCurrentLectureIndex} 
                    quizCompleted={lessonsArray[currentLectureIndex]?.completada}
                    lessons={lessonsArray}
                />
            )}
        </Box>
    );
}

export default Lecture;