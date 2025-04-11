import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea, LinearProgress, Button, Stack, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { course_data } from './constants';

const CUSTOM_COLOR = '#FFB300';

function PanelContent( { onVerAprender }) {
    const firstCourse = course_data[0];
    const navigate = useNavigate();

    return ( 
        <Box sx={{ flexGrow: 1 }}>
            <Box p={3}>
                <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', mb: 3}}>
                    Continúa tu Aprendizaje
                </Typography>
                <Card sx={{ maxWidth: '100%', borderRadius: '16px', border: '1px solid #000' }}>
                    <CardContent>
                        <Stack spacing={2} divider={<Divider flexItem sx={{border: '1px solid #000'}} />}>
                            <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Progreso: <strong>{firstCourse.progress}%</strong>
                                </Typography>
                                <LinearProgress variant="determinate" 
                                    value={firstCourse.progress} 
                                    sx={{ 
                                        height: '20px',
                                        borderRadius: '10px',
                                        backgroundColor: `${CUSTOM_COLOR}40`,
                                        '& .MuiLinearProgress-bar': {
                                            borderRadius: '10px',
                                            backgroundColor: CUSTOM_COLOR
                                        }
                                    }} 
                                />
                            </Box>
                                <CardActionArea onClick={ () => navigate(`/enrolled/${firstCourse.id}`)}>
                                    <Box p={2}>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
                                            <Box flex={2}>
                                                <Typography color="text.secondary">
                                                    Categoría: {firstCourse.category}
                                                </Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2}}>
                                                    Título: {firstCourse.title}
                                                </Typography>
                                                <Typography variant="body1" sx={{ mb: 2}}>
                                                    Descripción: {firstCourse.description}
                                                </Typography>
                                            </Box>
                                            <Box flex={1} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
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
                                            backgroundColor: `${CUSTOM_COLOR}CC`
                                        }
                                    }}
                                >
                                    Continuar
                                </Button>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 'bold',
                        color: '#FFB300',
                        cursor: 'pointer',
                        transition: 'opacity 0.3s ease',
                        textDecoration: 'underline',
                        '&:hover': { opacity: 0.7 },
                        mt: 2,
                        p: 1
                    }}
                    onClick={onVerAprender}
                >
                    Ver todo el progreso de Aprendizaje
                </Typography>
            </Box>
        </Box>
     );
}

export default PanelContent;