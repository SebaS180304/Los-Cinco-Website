import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import CourseDetails from './CourseDetails';
import DownloadCoursePDF from './DownloadCoursePDF';

const CUSTOM_COLOR = '#FFB300';

const CourseHeader = ({ course, courseLessons, isMobile }) => {
    // Verificar si hay lecciones
    const hasLessons = courseLessons?.length > 0;
    const currentLesson = hasLessons ? course?.lecciones?.find(leccion => !leccion.completada) : null;
    const areAllLessonsCompleted = hasLessons && course?.lecciones?.every(leccion => leccion.completada);
    const lastLesson = hasLessons ? course?.lecciones?.[course.lecciones.length - 1] : null;

    return (
        <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={3}
            justifyContent="space-between"
            sx={{ px: 7, pt: 7 }}
        >
            <Box {...(!isMobile ? { flex: 3 } : {})} sx={{ mt: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 2, mb: 2, color: 'white' }}>
                    {course?.tituloCurso}
                </Typography>
                <Typography variant="body1" sx={{ mt: 3, mb: 2, color: 'white' }}>
                    {course?.descripcionCurso}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: 2,
                        width: '100%',
                    }}
                >
                    <Box sx={{ width: isMobile ? '100%' : '50%' }}>
                        <DownloadCoursePDF courseId={course.idCurso} disabled={!hasLessons} />
                    </Box>
                    <Button
                        component={Link}
                        to={`/lesson/${areAllLessonsCompleted ? lastLesson?.idLeccion : currentLesson?.idLeccion}`}
                        variant={areAllLessonsCompleted ? "outlined" : "contained"}
                        endIcon={areAllLessonsCompleted ? <RefreshIcon /> : <ArrowForwardIcon />}
                        disabled={!hasLessons}
                        sx={{
                            ...(areAllLessonsCompleted 
                                ? {
                                    color: CUSTOM_COLOR,
                                    border: `2px solid ${CUSTOM_COLOR}`,
                                    '&:hover': { opacity: 0.8 }
                                }
                                : {
                                    backgroundColor: CUSTOM_COLOR,
                                    '&:hover': { backgroundColor: `${CUSTOM_COLOR}CC`, color: 'black' }
                                }
                            ),
                            width: isMobile ? '100%' : '50%',
                            '&.Mui-disabled': {
                                color: 'rgba(255, 255, 255, 0.3)',
                                borderColor: 'rgba(255, 255, 255, 0.3)'
                            }
                        }}
                    >
                        {areAllLessonsCompleted ? 'Repasar' : 'Continuar'}
                    </Button>
                </Box>
            </Box>
            <Box {...(!isMobile ? { flex: 2 } : {})}>
                <CourseDetails courseLessons={courseLessons} course={course} />
            </Box>
        </Stack>
    );
};

export default CourseHeader;