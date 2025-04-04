import React from 'react';
import { Box, Typography, Divider, Tab, Tabs, Card, CardContent, CardMedia, CardActionArea, LinearProgress, Accordion, AccordionSummary, 
    AccordionDetails, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import courseBg from '../assets/images/courseBg.png';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import client from '../assets/images/client-course.jpg';
import mechanical from '../assets/images/mechanical-course.jpg';
import electronics from '../assets/images/electrical-course.jpg';
import security from '../assets/images/security-course.jpg';
import { course_data } from './constants';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

const courseBackground = [
    { text: 'Atención al Cliente', src: client },
    { text: 'Mecánica', src: mechanical },
    { text: 'Electrónica', src: electronics },
    { text: 'Seguridad', src: security },
];

const CUSTOM_COLOR = '#FFB300';

const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: CUSTOM_COLOR,
        height: '3px',
    },
});

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    color: 'rgba(0, 0, 0, 0.7)',
    '&.Mui-selected': {
        backgroundColor: `${CUSTOM_COLOR}10`,
        color: CUSTOM_COLOR,
        fontWeight: 'bold'
    },
}));


function CourseCard({ course }) {
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
            <CardActionArea>
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
}


function CourseAccordion({ course, panel, expanded, handleChange }) {
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
                            {course.category}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                            {course.title}
                        </Typography>
                    </Box>
                    <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {course.progress}%
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
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ borderRadius: '5px', border: '1px solid #000', p: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Lecciones
                    </Typography>
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <CheckCircleIcon sx={{ color: '#FFB300', fontSize: 30 }} />
                            <Typography variant="body2" sx={{ ml: 3 }}>
                                Lección 1: Título de la Lección
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Evaluaciones
                    </Typography>
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <StarsRoundedIcon sx={{ color: '#FFB300', fontSize: 30 }} />
                            <Typography variant="body2" sx={{ ml: 3, mr: 1 }}>
                                Evaluación 1: {course.title}
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'black' }} />
                            <Typography variant="body2" sx={{ ml: 1, mr: 1, fontWeight: 'bold' }}>
                                {course.progress}%
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <ArrowCircleRightRoundedIcon sx={{ color: '#FFB300', fontSize: 30 }} />
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 'bold',
                            color: '#FFB300',
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

function LearnContent() {
  const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setExpanded(false);
  };

 
  const inProgressCourses = course_data.filter(course => course.progress < 100);
  const completedCourses = course_data.filter(course => course.progress === 100);

  return ( 
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Mi Aprendizaje
      </Typography>
      <StyledTabs
        value={value}
        onChange={handleTabChange}
        aria-label="Learn Tabs"
        textColor="inherit"
      >
        <StyledTab label="En Progreso" id="tab-0" aria-controls="tabpanel-0" />
        <StyledTab label="Completado" id="tab-1" aria-controls="tabpanel-1" />
      </StyledTabs>
      <Divider sx={{ backgroundColor: 'black' }} />
      {value === 0 && (
        <Box
          role="tabpanel"
          id="tabpanel-0"
          aria-labelledby="tab-0"
          sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}
        >
          {inProgressCourses.map(course => (
            <CourseCard course={course} key={course.id} />
          ))}
        </Box>
      )}
      {value === 1 && (
        <Box
          role="tabpanel"
          id="tabpanel-1"
          aria-labelledby="tab-1"
          sx={{ mt: 2 }}
        >
          {completedCourses.map(course => (
            <CourseAccordion 
              course={course} 
              panel={`panel-${course.id}`} 
              key={course.id} 
              expanded={expanded} 
              handleChange={handleChange} 
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default LearnContent;