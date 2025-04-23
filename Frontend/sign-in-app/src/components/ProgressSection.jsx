import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, LinearProgress } from '@mui/material';
import ProgressTables from './ProgressTables';

const CUSTOM_COLOR = '#FFB300';

const ProgressSection = ({ course, courseLessons, isMobile }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => setExpanded(prev => !prev);
    const totalLessons = courseLessons.length;
    const completedLessons = courseLessons.filter(lecture => lecture.completada === true).length;

    return (
        <Accordion expanded={expanded} onChange={toggleExpansion} sx={{ bgcolor: '#373e52', borderRadius: '20px' }}>
            <AccordionSummary aria-controls="progress-content" id="progress-header">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                        p: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            width: '100%',
                            justifyContent: isMobile ? 'center' : 'flex-start',
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                            {course?.porcentaje || 0}%
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={course?.porcentaje || 0}
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
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'white',
                            textAlign: isMobile ? 'center' : undefined,
                            width: isMobile ? '100%' : '150px',
                        }}
                    >
                        {expanded ? 'Ocultar Detalles' : 'Mostrar Detalles'}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
                <ProgressTables 
                    course={course} 
                    totalLessons={totalLessons} 
                    completedLessons={completedLessons} 
                    isMobile={isMobile} 
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default ProgressSection;
