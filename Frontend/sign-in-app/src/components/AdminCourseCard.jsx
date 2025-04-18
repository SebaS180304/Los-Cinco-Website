import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, Grid, CardActionArea, CardContent, CardMedia, Divider, LinearProgress, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import AddIcon from '@mui/icons-material/Add';
import client from '../assets/images/client-course.jpg';
import mechanical from '../assets/images/mechanical-course.jpg';
import electronics from '../assets/images/electrical-course.jpg';
import security from '../assets/images/security-course.jpg';
import courseBg from '../assets/images/courseBg.png';

const CUSTOM_COLOR = '#FFB300';

const courseBackground = [
    { text: 'Atención al Cliente', src: client },
    { text: 'Mecánica', src: mechanical },
    { text: 'Electrónica', src: electronics },
    { text: 'Seguridad', src: security },
];

const AdminCourseCard = ({ course, isAddCard, onAddCurso }) => {
    const navigate = useNavigate();
    const [newCurso, setNewCurso] = useState('');
    const [showInput, setShowInput] = useState(false);
    const cardRef = useRef(null);

    const handleAddCurso = async () => {
        if (newCurso.trim()) {
            try {
                const response = await axios.post(
                    '/CursoAdmin/Nuevo',
                    { TituloCurso: newCurso, DescripcionCurso: '', Categoria: 1 },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
                const newCursoId = response.data.idCurso;
                onAddCurso({ idCurso: newCursoId, tituloCurso: newCurso, progress: 0, categoria: 1 });
                setNewCurso('');
                setShowInput(false);
                navigate(`/courses/${newCursoId}`);
            } catch (error) {
                console.error('Error al crear el curso:', error);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setShowInput(false); // Cierra el input si el clic ocurre fuera de la tarjeta
            }
        };

        if (showInput) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showInput]);

    if (isAddCard) {
        return (
            <Card
                ref={cardRef}
                onClick={() => {
                    if (!showInput) {
                        setShowInput(true);
                        setNewCurso('');
                    }
                }}
                sx={{
                    width: '100%',
                    maxWidth: '425px',
                    height: '260px',
                    borderRadius: '16px',
                    border: '1px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ":hover": {
                        backgroundColor: showInput ? 'transparent' : `${CUSTOM_COLOR}20`,
                    },
                    cursor: showInput ? 'auto' : 'pointer',
                    transition: 'background-color 0.3s',
                    '&:active': {
                        backgroundColor: showInput ? 'transparent' : `${CUSTOM_COLOR}40`,
                    },
                }}
            >
                {showInput ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, width: '100%', height: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', m: 2, pt: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Crear nuevo curso
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <TextField
                                value={newCurso}
                                onChange={(e) => setNewCurso(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCurso()}
                                placeholder="Título del curso"
                                variant="outlined"
                                inputRef={(input) => {
                                    if (showInput && input) {
                                        input.focus();
                                    }
                                }}
                                InputProps={{
                                    sx: { height: '40px', px: 2 },
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 3 }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setShowInput(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddCurso}
                                sx={{ backgroundColor: CUSTOM_COLOR }}
                            >
                                Agregar
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <AddIcon sx={{ fontSize: 50, color: CUSTOM_COLOR }} />
                )}
            </Card>
        );
    }

    const bgImage = courseBackground.find(item => item.text === course.category)?.src || courseBg;

    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: '425px',
                borderRadius: '16px',
                border: '1px solid #000',
            }}
        >
            <CardActionArea onClick={() => navigate(`/courses/${course.id}`)}>
                <CardMedia 
                    component="img" 
                    height="125px" 
                    image={bgImage} 
                    alt="course background" 
                    sx={{ opacity: 0.5, borderRadius: '16px 16px 0 0' }}
                />
                <CardContent sx={{ p: 1.5 }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {course.title}
                        </Typography>
                        <Typography color="text.secondary">
                            {course.category}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <Divider sx={{ backgroundColor: 'black' }} />
            <CardContent sx={{ p: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        Progreso: <strong>{course.progress}%</strong>
                    </Typography>
                    <LinearProgress 
                        variant="determinate" 
                        value={course.progress} 
                        sx={{
                            width: '50%',
                            height: '10px',
                            borderRadius: '10px',
                            backgroundColor: `${CUSTOM_COLOR}40`,
                            '& .MuiLinearProgress-bar': {
                                borderRadius: '10px',
                                backgroundColor: CUSTOM_COLOR
                            }
                        }} 
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default AdminCourseCard;