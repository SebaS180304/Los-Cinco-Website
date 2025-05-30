import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CUSTOM_COLOR = '#FFB300';
const SECONDARY_COLOR = '#0c1633';

const LessonAccordion = ({ lecture, lessons, panel, expanded, handleChange }) => {
    const isCompleted = Boolean(lecture?.completada);
    const iconColor = isCompleted ? CUSTOM_COLOR : SECONDARY_COLOR;
    const evaluationText = isCompleted ? 'Completada' : 'En Progreso';
    const buttonText = isCompleted ? 'Repasar' : 'Empezar';
    const buttonColor = isCompleted ? SECONDARY_COLOR : CUSTOM_COLOR;

    // Determinar si la lección anterior está completada
    const previousCompleted = (() => {
        if (!Array.isArray(lessons)) return true;
        const idx = lessons.findIndex(l => l.idLeccion === lecture?.idLeccion);
        // Si es la primera lección, asumimos que se puede empezar
        if (idx <= 0) return true;
        return Boolean(lessons[idx - 1].completada);
    })();

    return (
        <Accordion expanded={expanded === panel} onChange={handleChange(panel)} sx={{ mb: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${panel}-content`}
                id={`${panel}-header`}
                sx={{ 
                    flexDirection: 'row-reverse',
                    '& .MuiAccordionSummary-content': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 3 }}>
                    {lecture?.tituloLeccion}
                </Typography>
                <Chip
                    label={evaluationText}
                    variant="outlined"
                    sx={{
                        mr: 3,
                        color: iconColor,
                        borderColor: iconColor,
                        '& .MuiChip-label': {
                            fontWeight: 'medium'
                        }
                    }}
                />
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ borderRadius: '10px', border: '1px solid #000', p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 5, mx: 3 }}>
                        <LibraryBooksOutlinedIcon sx={{ color: iconColor, fontSize: 30 }} />
                        <Typography variant="body2" sx={{ ml: 3, fontWeight: 'bold' }}>
                            Lección
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 3 }}>
                            {lecture?.tituloLeccion}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mx: 3 }}>
                        <AssignmentOutlinedIcon sx={{ color: iconColor, fontSize: 30 }} />
                        <Typography variant="body2" sx={{ ml: 3, fontWeight: 'bold' }}>
                            Evaluación
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 1, mr: 1, textDecoration: 'underline' }}>
                            {evaluationText}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ pt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        component={Link} 
                        to={`/lesson/${lecture?.idLeccion}`} 
                        variant="contained"
                        disabled={!lecture?.completada && !previousCompleted}
                        sx={{
                            backgroundColor: buttonColor,
                            '&:hover': { backgroundColor: `${buttonColor}CC` },
                        }}
                    >
                        {buttonText}
                    </Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default LessonAccordion;