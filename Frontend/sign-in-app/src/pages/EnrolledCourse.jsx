import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Divider, List, ListItem, ListItemIcon, Stack, Typography, Button, useTheme, useMediaQuery, Accordion, AccordionSummary, AccordionDetails,  CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import { course_data, lecture_data } from '../components/constants';
import ProgressSection from '../components/ProgressSection';

const CUSTOM_COLOR = '#FFB300';

// Lista de detalles del curso
const CourseDetailsList = ({ courseLessons, course }) => (
    <Box sx={{ pb: 2 }}>
        <List>
            <React.Fragment>
                <ListItem sx={{ p: 2 }}>
                    <ListItemIcon sx={{ color: CUSTOM_COLOR }}>
                        <LibraryBooksOutlinedIcon />
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                        Lecciones: <strong>{courseLessons.length}</strong>
                    </Typography>
                </ListItem>
                <Divider sx={{ backgroundColor: 'white' }} />
                <ListItem sx={{ p: 2 }}>
                    <ListItemIcon sx={{ color: CUSTOM_COLOR }}>
                        <AssignmentOutlinedIcon />
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                        Evaluaciones: <strong>{courseLessons.length}</strong>
                    </Typography>
                </ListItem>
                <Divider sx={{ backgroundColor: 'white' }} />
                <ListItem sx={{ p: 2 }}>
                    <ListItemIcon sx={{ color: CUSTOM_COLOR }}>
                        <CategoryOutlinedIcon />
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                        Categoría: <strong>{course?.category}</strong>
                    </Typography>
                </ListItem>
                <Divider sx={{ backgroundColor: 'white' }} />
            </React.Fragment>
        </List>
    </Box>
);

// Acordeón para cada lección
function LessonAccordion({ lecture, panel, expanded, handleChange }) {
    return (
        <Accordion expanded={expanded === panel} onChange={handleChange(panel)} sx={{ mb: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${panel}-content`}
                id={`${panel}-header`}
            >
                <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
                    <Box flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CircularProgress
                                variant="determinate"
                                value={lecture.progress || 0}
                                thickness={6}
                                sx={{
                                    color: CUSTOM_COLOR,
                                    width: '50px',
                                    height: '50px',
                                }}
                            />
                            <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 3 }}>
                                {lecture.title}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ borderRadius: '10px', border: '1px solid #000', p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 5, mx: 3 }}>
                        <LibraryBooksOutlinedIcon sx={{ color: CUSTOM_COLOR, fontSize: 30 }} />
                        <Typography variant="body2" sx={{ ml: 3, fontWeight: 'bold' }}>
                            Lección
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 3 }}>
                            {lecture.title}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mx: 3 }}>
                        <AssignmentOutlinedIcon sx={{ color: CUSTOM_COLOR, fontSize: 30 }} />
                        <Typography variant="body2" sx={{ ml: 3, fontWeight: 'bold' }}>
                            Evaluación
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 3 }}>
                            {lecture.title}
                        </Typography>
                        <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'black', ml: 1 }} />
                        <Typography variant="body2" sx={{ ml: 1, mr: 1, fontWeight: 'bold' }}>
                            {lecture.progress}%
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ pt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        component={Link} 
                        to="/lesson" 
                        variant="contained"
                        sx={{
                            backgroundColor: CUSTOM_COLOR,
                            '&:hover': { backgroundColor: `${CUSTOM_COLOR}CC` }
                        }}
                    >
                        Empezar
                    </Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}

function EnrolledCourse() {
    const { courseId } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [lessonExpanded, setLessonExpanded] = React.useState(false);

    const course = course_data.find(c => c.id === parseInt(courseId));
    const courseLessons = lecture_data.filter(lecture => lecture.course === course.title);

    const handleLessonChange = (panel) => (event, isExpanded) => {
        setLessonExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ display: 'flex', mt: '64px' }}>
            <Navbar />
            <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box sx={{ backgroundColor: '#0c1633', borderRadius: '20px' }}>
                    <Stack
                        direction={isMobile ? 'column' : 'row'}
                        spacing={3}
                        justifyContent="space-between"
                        sx={{ px: 7, pt: 7 }}
                    >
                        <Box {...(!isMobile ? { flex: 3 } : {})} sx={{ mt: 2 }}>
                            <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 2, mb: 2, color: 'white' }}>
                                {course?.title || 'Curso no encontrado'}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    gap: 2,
                                    mb: 2
                                }}
                            >
                                <Button 
                                    component={Link} 
                                    to="/lesson" 
                                    variant="contained"
                                    startIcon={<ArrowForwardIcon />}
                                    sx={{
                                        color: 'black', 
                                        fontWeight: 'bold', 
                                        width: isMobile ? '100%' : '50%',
                                        backgroundColor: CUSTOM_COLOR,
                                        '&:hover': { backgroundColor: `${CUSTOM_COLOR}CC` }
                                    }}
                                >
                                    Continuar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<DownloadIcon />}
                                    href="/manual.pdf"
                                    download="manual.pdf"
                                    sx={{
                                        color: 'black', 
                                        fontWeight: 'bold', 
                                        width: isMobile ? '100%' : '50%',
                                        '&:hover': { backgroundColor: `CC` }
                                    }}
                                >
                                    Descargar
                                </Button>
                            </Box>
                        </Box>
                        <Box {...(!isMobile ? { flex: 2 } : {})}>
                            <CourseDetailsList courseLessons={courseLessons} course={course} />
                        </Box>
                    </Stack>
                    <Box sx={{ pt: 3 }}>
                        <ProgressSection course={course} courseLessons={courseLessons} />
                    </Box>
                </Box>
                <Box sx={{ pt: 7 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Lección Actual
                    </Typography>
                    {courseLessons[0] && (
                        <LessonAccordion 
                            lecture={courseLessons[0]}
                            panel={`panel-${courseLessons[0].id}`}
                            expanded={lessonExpanded}
                            handleChange={handleLessonChange}
                        />
                    )}
                </Box>
                <Box sx={{ pt: 7 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Contenido del Curso
                    </Typography>
                    {courseLessons.slice(1).map(lecture => (
                        <LessonAccordion 
                            key={lecture.id}
                            lecture={lecture}
                            panel={`panel-${lecture.id}`}
                            expanded={lessonExpanded}
                            handleChange={handleLessonChange}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default EnrolledCourse;