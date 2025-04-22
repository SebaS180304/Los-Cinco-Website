import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, LinearProgress, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import categoryMapping from './constants/categoryMapping';

const CUSTOM_COLOR = '#FFB300';

const CourseAccordion = ({ course, panel, expanded, handleChange }) => {
    const navigate = useNavigate();
    const categoryName = categoryMapping[course?.categoria] || "Indefinida";
    return (
        <Accordion
            expanded={expanded === panel}
            onChange={handleChange(panel)}
            sx={{ mb: 2 }}
        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`${panel}-content`}
                id={`${panel}-header`}
            >
                <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
                    <Box flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography color="text.secondary">
                            {categoryName}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                            {course?.tituloCurso}
                        </Typography>
                    </Box>
                    <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {course?.porcentaje || 0}%
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
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ borderRadius: '5px', border: '1px solid #000', p: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Lecciones
                    </Typography>
                    <Box sx={{ p: 2 }}>
                        {/* Aquí se listan las lecciones utilizando course.lecciones */}
                        {course?.lecciones?.map(lesson => (
                          <Box key={lesson?.idLeccion} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <CheckCircleIcon sx={{ color: CUSTOM_COLOR, fontSize: 30 }} />
                              <Typography variant="body2" sx={{ ml: 3 }}>
                                  {lesson?.tituloLeccion}
                              </Typography>
                          </Box>
                        ))}
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Evaluaciones
                    </Typography>
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <StarsRoundedIcon sx={{ color: CUSTOM_COLOR, fontSize: 30 }} />
                            <Typography variant="body2" sx={{ ml: 3, mr: 1 }}>
                                {course?.tituloCurso}
                            </Typography>
                            <Divider orientation="vertical" flexIte m sx={{ backgroundColor: 'black' }} />
                            <Typography variant="body2" sx={{ ml: 1, mr: 1, fontWeight: 'bold' }}>
                                {course?.calificacionExamen || 0}%
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <ArrowCircleRightRoundedIcon sx={{ color: CUSTOM_COLOR, fontSize: 30 }} />
                    <Typography
                        variant="body1"
                        onClick={() => navigate(`/enrolled/${course?.idCurso}`)}
                        sx={{
                            fontWeight: 'bold',
                            color: CUSTOM_COLOR,
                            cursor: 'pointer',
                            transition: 'opacity 0.3s ease',
                            textDecoration: 'underline',
                            '&:hover': { opacity: 0.7 },
                            ml: 2
                        }}
                    >
                        Ver Contenidos
                    </Typography>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}

export default CourseAccordion;