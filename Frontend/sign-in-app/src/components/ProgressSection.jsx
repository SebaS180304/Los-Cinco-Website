import React, { useState } from 'react';
import {   Accordion,   AccordionSummary,   AccordionDetails,   Box,   Typography,   LinearProgress,   Table,   TableHead,   TableBody,   TableRow,   TableCell,   Stack,   useMediaQuery,   useTheme } from '@mui/material';

const CUSTOM_COLOR = '#FFB300';

// Tabla para dispositivos móviles
const MobileTable = ({ course, totalLessons, completedLessons }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SECCIONES</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ESTATUS</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell sx={{ color: 'white' }}>{course.title}</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'right' }} />
            </TableRow>
            <TableRow>
                <TableCell sx={{ color: 'white' }}>Lecciones Completadas</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'right' }}>
                    {completedLessons}/{totalLessons}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{ color: 'white' }}>Examen Final</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'right' }}>No iniciado</TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

// Tabla para escritorio
const DesktopTable = ({ course, totalLessons, completedLessons }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SECCIONES</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>LECCIONES COMPLETADAS</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EXAMEN FINAL</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell sx={{ color: 'white' }}>{course.title}</TableCell>
                <TableCell sx={{ color: 'white' }}>
                    {completedLessons}/{totalLessons}
                </TableCell>
                <TableCell sx={{ color: 'white' }}>No iniciado</TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

// Información adicional
const AdditionalInfo = ({ isMobile }) => {
    if (isMobile) {
        return (
            <Stack direction="column" spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', color: 'white', textAlign: 'left', width: '50%' }}
                    >
                        Exámenes Aprobados
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ color: 'white', textAlign: 'right', width: '50%' }}
                    >
                        0/5
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', color: 'white', textAlign: 'left', width: '50%' }}
                    >
                        Calificación Promedio
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ color: 'white', textAlign: 'right', width: '50%' }}
                    >
                        0%
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', color: 'white', textAlign: 'left', width: '50%' }}
                    >
                        Calificación Examen
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ color: 'white', textAlign: 'right', width: '50%' }}
                    >
                        0%
                    </Typography>
                </Box>
            </Stack>
        );
    }
    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Stack direction="column" alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Exámenes Aprobados
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                    0/5
                </Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Calificación Promedio
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                    0%
                </Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Calificación Examen
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                    0%
                </Typography>
            </Stack>
        </Stack>
    );
};

const ProgressSection = ({ course, courseLessons }) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleExpansion = () => setExpanded(prev => !prev);

    const totalLessons = courseLessons.length;
    // Se consideran completadas las lecciones con progreso mayor a 60.
    const completedLessons = courseLessons.filter(lecture => lecture.progress > 60).length;
    const progressPercent = course.progress;

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
                            {progressPercent}%
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={progressPercent}
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
                    {isMobile ? (
                        <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', width: '100%' }}>
                            {expanded ? 'Hide details' : 'Show details'}
                        </Typography>
                    ) : (
                        <Typography variant="body1" sx={{ color: 'white', width: '150px' }}>
                            {expanded ? 'Hide details' : 'Show details'}
                        </Typography>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, mb: 5 }}>
                {isMobile ? (
                    <MobileTable course={course} totalLessons={totalLessons} completedLessons={completedLessons} />
                ) : (
                    <DesktopTable course={course} totalLessons={totalLessons} completedLessons={completedLessons} />
                )}
                <Box sx={{ mt: 2, width: '100%' }}>
                    <AdditionalInfo isMobile={isMobile} />
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default ProgressSection;
