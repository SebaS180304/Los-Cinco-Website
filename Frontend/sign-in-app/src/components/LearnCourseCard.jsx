import React from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, LinearProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

const LearnCourseCard = ({ course }) => {
    const navigate = useNavigate();
    const categoryName = categoryMapping[course?.categoria] || "Indefinida";
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
            <CardActionArea onClick={() => navigate(`/enrolled/${course?.idCurso}`)}>
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
                            {course?.tituloCurso}
                        </Typography>
                        <Typography color="text.secondary">
                            {categoryName}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <Divider sx={{ backgroundColor: 'black' }} />
            <CardContent sx={{ p: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        Progreso: <strong>{course?.porcentaje || 0}%</strong>
                    </Typography>
                    <LinearProgress 
                        variant="determinate" 
                        value={course?.porcentaje || 0} 
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
    )
}

export default LearnCourseCard;