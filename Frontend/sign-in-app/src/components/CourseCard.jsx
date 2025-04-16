import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea, LinearProgress, Button, Stack, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

{ /* Se necesita informacion del curso mas reciente para mostrar su nombre, categoria, progreso y descripcion. Para esto es necesario conseguir la 
    informacion de cual fue la ultima leccion realizada por el usuario de la tabla lecciones_completadas y verificar de que curso pertenece esa 
    leccion y mandar los datos de dicho curso. Tambien se necesita la informacion de la leccion actual, es decir, es necesario saber el id de la 
    leccion mas reciente para poder mandar al usuario a donde lo dejo por ultima vez. */ }

const CUSTOM_COLOR = '#FFB300';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: '100%', borderRadius: '16px', border: '1px solid #000' }}>
            <CardContent>
                <Stack spacing={2} divider={<Divider flexItem sx={{ border: '1px solid #000' }} />}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Progreso: <strong>{course.progress}%</strong>
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={course.progress}
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
                    <CardActionArea onClick={() => navigate(`/enrolled/${course.id}`)}>
                        <Box p={2}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
                                <Box flex={2}>
                                    <Typography color="text.secondary">
                                        Categoría: {course.category}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Título: {course.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        Descripción: {course.description}
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
                            to="/lesson"
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