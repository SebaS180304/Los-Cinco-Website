import React from 'react';
import { Box, Typography, Container, Card, CardContent, LinearProgress, Button, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CUSTOM_COLOR = '#FFB300';

function Homecontent() {
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
                                    Progreso: 20%
                                </Typography>
                                <LinearProgress variant="determinate" 
                                    value={20} 
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
                            <Box p={2}>
                                <Typography color="text.secondary">
                                    Tipo de Curso
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2}}>
                                    Título del Curso
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2}}>
                                    Lección Actual: Título de la Lección
                                </Typography>
                            </Box>
                            <Box>
                                <Button 
                                    component={Link} 
                                    to="/lecture" 
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
            </Box>
        </Box>
     );
}

export default Homecontent;