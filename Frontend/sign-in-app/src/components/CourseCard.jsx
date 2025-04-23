import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea, LinearProgress, Button, Stack, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import categoryMapping from './constants/categoryMapping';

const CUSTOM_COLOR = '#FFB300';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
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
                        <Box p={2}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
                                <Box flex={2}>
                                    <Typography color="text.secondary">
                                        Categoría: {categoryName}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Título: {course?.tituloCurso}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        Lección Actual: {currentLesson ? currentLesson?.tituloLeccion : "Curso finalizado"}
                                    </Typography>
                                </Box>
                                <Box
                                    flex={1}
                                    sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                                >
                                    <ArrowForwardIosRoundedIcon sx={{ fontSize: 40, color: 'black' }} />
                                </Box>
                            </Stack>
                        </Box>
                    </CardActionArea>
                    <Box>
                        <Button
                            component={Link}
                            to={`/lesson/${currentLesson?.idLeccion}`}
                            variant="contained"
                            fullWidth
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                backgroundColor: CUSTOM_COLOR,
                                '&:hover': {
                                    backgroundColor: `${CUSTOM_COLOR}CC`,
                                },
                            }}
                        >
                            Continuar
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CourseCard;