import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Typography, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import AddIcon from '@mui/icons-material/Add';
import client from '../assets/images/client-course.jpg';
import mechanical from '../assets/images/mechanical-course.jpg';
import electronics from '../assets/images/electrical-course.jpg';
import security from '../assets/images/security-course.jpg';
import courseBg from '../assets/images/courseBg.png';
import categoryMapping from './constants/categoryMapping';

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
    const categoryName = categoryMapping[course?.category] || "Indefinida";

    const handleAddCurso = async () => {
        try {
            const response = await axios.post(
                '/CursoAdmin/Nuevo',
                { TituloCurso: newCurso, DescripcionCurso: '', Categoria: 4, Visible: false },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            const newCursoId = response.data.idCurso;
            onAddCurso({ idCurso: newCursoId, tituloCurso: newCurso, progress: 0, categoria: 4, visible: false });
            setNewCurso('');
            navigate(`/courses/${newCursoId}`);
        } catch (error) {
            console.error('Error al crear el curso:', error);
        }
    };

    if (isAddCard) {
        return (
            <Card
                onClick={() => {
                    setNewCurso('');
                    handleAddCurso();
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
                        backgroundColor: `${CUSTOM_COLOR}20`,
                    },
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    '&:active': {
                        backgroundColor: `${CUSTOM_COLOR}40`,
                    },
                }}
            >
                <AddIcon sx={{ fontSize: 50, color: CUSTOM_COLOR }} />
            </Card>
        );
    }

    const bgImage = courseBackground.find(item => item.text === categoryName)?.src || courseBg;

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
                        <Typography variant="h5" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {course.title || 'Curso Indefinido'}
                        </Typography>
                        <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {course.description || 'Sin descripción'}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <Divider sx={{ backgroundColor: 'black' }} />
            <CardContent sx={{ p: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                        Categoría: <strong>{categoryName}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        Visibilidad: <strong>{course.visible ? 'Publicado' : 'Sin publicar'}</strong>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AdminCourseCard;