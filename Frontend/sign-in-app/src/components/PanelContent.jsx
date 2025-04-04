import React from 'react';
import { Box, Typography, Card, CardContent, LinearProgress, Button, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CUSTOM_COLOR = '#FFB300';

function PanelContent( { onVerAprender }) {
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
                                    Progreso: <strong>20%</strong>
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