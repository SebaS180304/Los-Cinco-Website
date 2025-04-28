import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea, LinearProgress, Button, Stack, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import categoryMapping from './constants/categoryMapping';

const CUSTOM_COLOR = '#FFB300';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    if (!course) {
        return (
            <Card sx={{ maxWidth: '100%', borderRadius: '16px', border: '1px solid #000' }}>
                <CardContent>
                    <Stack spacing={2} divider={<Divider flexItem sx={{ border: '1px solid #000' }} />}>
                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Sin progreso...</strong>
                            </Typography>
                            <LinearProgress
                            variant="determinate"
                            value={0}
                            sx={{
                                height: '20px',
                                borderRadius: '10px',
                                backgroundColor: `#E0E0E0`,
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: '10px',
                                    backgroundColor: '#9E9E9E',
                                },
                            }}
                        />
                        </Box>
                        <CardActionArea disabled>
                            <Box sx={{ py: 6, px: 2, textAlign: 'center' }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase'}}>
                                    No hay curso disponible
                                </Typography>
                            </Box>
                        </CardActionArea>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Button
                                variant="outlined"
                                startIcon={<HistoryEduIcon />}
                                disabled
                                sx={{
                                    color: CUSTOM_COLOR,
                                    border: `2px solid ${CUSTOM_COLOR}`,
                                    '&:hover': { opacity: 0.8 },
                                    flex: 1
                                }}
                            >
                                Examen
                            </Button>
                            <Divider orientation="vertical" flexItem sx={{ border: '1px solid #000', mx: 2 }} />
                            <Button
                                disabled
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    backgroundColor: CUSTOM_COLOR,
                                    '&:hover': { backgroundColor: `${CUSTOM_COLOR}CC` },
                                    flex: 1
                                }}
                            >
                                Continuar
                            </Button>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    const currentLesson = course?.lecciones?.find(leccion => !leccion.completada);
    const categoryName = categoryMapping[course?.categoria] || "Indefinida";

    return (
        <Card sx={{ maxWidth: '100%', borderRadius: '16px', border: '1px solid #000' }}>
            <CardContent>
                <Stack spacing={2} divider={<Divider flexItem sx={{ border: '1px solid #000' }} />}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Progreso: <strong>{course?.porcentaje || 0}%</strong>
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={course?.porcentaje || 0}
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
                    </Box>
                    <CardActionArea onClick={() => navigate(`/enrolled/${course?.idCurso}`)}>
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography color="text.secondary">
                                    Categoría: {categoryName}
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    Título: {course?.tituloCurso}
                                </Typography>
                                <Typography variant="body1">
                                    Lección Actual: {currentLesson ? currentLesson?.tituloLeccion : "Curso finalizado"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ArrowForwardIosRoundedIcon sx={{ fontSize: 40, color: 'black' }} />
                            </Box>
                        </Box>
                    </CardActionArea>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
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
                                flex: 1
                            }}
                        >
                            Examen
                        </Button>
                        <Divider orientation="vertical" flexItem sx={{ border: '1px solid #000', mx: 2 }} />
                        <Button
                            component={Link}
                            to={`/lesson/${currentLesson?.idLeccion}`}
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                backgroundColor: CUSTOM_COLOR,
                                '&:hover': { backgroundColor: `${CUSTOM_COLOR}CC` },
                                flex: 1
                            }}
                        >
                            Continuar
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default CourseCard;