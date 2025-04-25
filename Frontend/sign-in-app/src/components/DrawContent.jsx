import { Box, Card, CardContent, IconButton, Stack, Typography, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CUSTOM_COLOR = '#FFB300';
const SECONDARY_COLOR = '#0c1633';
const BG_COLOR = '#101626';

function Drawcontent({ onClose, lessons }) {
    const navigate = useNavigate();
    
    return ( 
        <Box sx={{ display: 'flex', mb: '64px', backgroundColor: BG_COLOR }}>
            <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Typography variant="h6" color="white" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                            Nombre del curso
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose}>
                        <CloseIcon style={{ color: 'white', fontSize: 40 }} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Stack spacing={2} mt={1} alignItems="center">
                        {lessons.map((l, idx) => {
                            const isCompleted = Boolean(l.completada);
                            return (
                                <Card key={idx} sx={{ backgroundColor: '#1E2A45', borderRadius: 2, width: '100%' }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {isCompleted ? (
                                                <CheckCircleIcon sx={{ color: CUSTOM_COLOR, mr: 1 }} />
                                            ) : (
                                                <CheckCircleOutlineIcon sx={{ color: SECONDARY_COLOR, mr: 1 }} />
                                            )}
                                            <Typography variant="body1" sx={{ color: 'white' }}>
                                                {l.tituloLeccion}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Stack>
                </Box>
            </Box>
            <Box sx={{ position: 'absolute', bottom: 0, backgroundColor: BG_COLOR, height: '80px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    onClick={() => navigate(`/enrolled/1`)}
                    sx={{ color: CUSTOM_COLOR , border: `2px solid ${CUSTOM_COLOR}`, '&:hover': { opacity: 0.8 }  }}
                    variant="outlined" 
                >
                    Ver página del curso
                </Button>
            </Box>
        </Box>
    );
}

export default Drawcontent;