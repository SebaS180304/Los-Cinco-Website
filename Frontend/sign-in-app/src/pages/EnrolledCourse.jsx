import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box, Divider, List, ListItem, ListItemIcon, Stack, Typography, Button, LinearProgress, useTheme, useMediaQuery, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import { course_data, lecture_data } from '../components/constants';

const CUSTOM_COLOR = '#FFB300';

const CourseDetailsList = ({ courseLessons, course }) => {
    return (
        <Box sx={{ pb: 2 }}>
            <List>
                <React.Fragment>
                    <ListItem sx={{ p: 2 }}>
                        <ListItemIcon sx={{ color: CUSTOM_COLOR }}>
                            <LibraryBooksOutlinedIcon />
                        </ListItemIcon>
                        <Typography variant="body1">
                            Lecciones: <strong>{courseLessons.length}</strong>
                        </Typography>
                    </ListItem>
                    <Divider sx={{ backgroundColor: 'black' }} />
                    <ListItem sx={{ p: 2 }}>
                        <ListItemIcon sx={{ color: CUSTOM_COLOR }}>
                            <AssignmentOutlinedIcon />
                        </ListItemIcon>
                        <Typography variant="body1">
                            Evaluaciones: <strong>{courseLessons.length}</strong>
                        </Typography>
                    </ListItem>
                    <Divider sx={{ backgroundColor: 'black' }} />
                    <ListItem sx={{ p: 2 }}>
                        <ListItemIcon sx={{ color: CUSTOM_COLOR }}>
                            <CategoryOutlinedIcon />
                        </ListItemIcon>
                        <Typography variant="body1">
                            Categoría: {<strong>{course?.category}</strong> || 'N/A'}
                        </Typography>
                    </ListItem>
                    <Divider sx={{ backgroundColor: 'black' }} />
                </React.Fragment>
            </List>
        </Box>
    );
};

function LessonAccordion({ lecture, panel, expanded, handleChange }) {
    return (
        <Accordion
            expanded={expanded === panel}
            onChange={handleChange(panel)}
            sx={{ mb: 2 }}
        >
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
                <Box sx={{ borderRadius: '5px', border: '1px solid #000', p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 5, mx: 5 }}>
                        <LibraryBooksOutlinedIcon sx={{ color: '#FFB300', fontSize: 30 }} />
                        <Typography variant="body2" sx={{ ml: 3, fontWeight: 'bold' }}>
                            Lección
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 3 }}>
                            {lecture.title}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mx: 5 }}>
                        <AssignmentOutlinedIcon sx={{ color: '#FFB300', fontSize: 30 }} />
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
                <Box sx={{ pt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button 
                        component={Link} 
                        to="/lesson" 
                        variant="contained"
                        sx={{
                            backgroundColor: CUSTOM_COLOR, mb: 2,
                            '&:hover': {
                                backgroundColor: `${CUSTOM_COLOR}CC`
                            }
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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [lessonExpanded, setLessonExpanded] = React.useState(false);

    const course = course_data.find(c => c.id === parseInt(courseId));
    const courseLessons = lecture_data.filter(lecture => lecture.course === course.title);

    const handleLessonChange = (panel) => (event, isExpanded) => {
        setLessonExpanded(isExpanded ? panel : false);
    };

    return ( 
        <Box sx={{ display: 'flex', mt: '64px' }}>
            <Navbar />
            <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
                <Stack
                    direction={isMobile ? 'column' : 'row'}
                    spacing={3}
                    justifyContent="space-between"
                    sx={{ width: '100%' }}
                >
                    <Box {...(!isMobile ? { flex: 3 } : {})} sx={{ mt: 2 }}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}>
                            {course?.title || 'Curso no encontrado'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Button 
                                component={Link} 
                                to="/lesson" 
                                variant="contained"
                                startIcon={<ArrowForwardIcon />}
                                sx={{
                                    backgroundColor: CUSTOM_COLOR,
                                    '&:hover': {
                                        backgroundColor: `${CUSTOM_COLOR}CC`
                                    }
                                }}
                            >
                                Continuar Curso
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<DownloadIcon />}
                                href="/manual.pdf"
                                download="manual.pdf"
                            >
                                Descargar Curso
                            </Button>
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                            Progreso del Curso
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LinearProgress
                                variant="determinate" 
                                value={course?.progress || 0} 
                                sx={{ 
                                    height: '20px',
                                    borderRadius: '10px',
                                    backgroundColor: `${CUSTOM_COLOR}40`,
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: '10px',
                                        backgroundColor: CUSTOM_COLOR,
                                    },
                                    width: '100%'
                                }}
                            />
                            <EmojiEventsOutlinedIcon sx={{ color: `${CUSTOM_COLOR}70`, ml: 2, fontSize: '40px' }} />
                        </Box>
                    </Box>
                    <Box {...(!isMobile ? { flex: 2 } : {})}>
                        <CourseDetailsList courseLessons={courseLessons} course={course} />
                    </Box>
                </Stack>
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