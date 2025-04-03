import React from 'react';
import { Box, Typography, Divider, Tab, Tabs, Card, CardContent, CardMedia, CardActionArea, LinearProgress, Accordion, AccordionSummary, 
    AccordionDetails, Stack} from '@mui/material';
import { styled } from '@mui/material/styles';
import courseBg from '../assets/images/courseBg.png';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';

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

function CourseCard() {
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
                    image={courseBg} 
                    alt="course background" 
                    sx={{ opacity: 0.5, borderRadius: '16px 16px 0 0' }}
                />
                <CardContent sx={{ p: 1.5 }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Título del Curso
                        </Typography>
                        <Typography color="text.secondary">
                            Tipo de Curso
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <Divider sx={{ backgroundColor: 'black' }} />
            <CardContent sx={{ p: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        Progreso: 20%
                    </Typography>
                    <LinearProgress 
                        variant="determinate" 
                        value={20} 
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

function CourseAccordion({ panel, expanded, handleChange }) {
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
                            Tipo de Curso
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                            Título del Curso
                        </Typography>
                    </Box>
                    <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            100%
                        </Typography>
                        <LinearProgress 
                            variant="determinate" 
                            value={100} 
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
                                Lección 1: Titulo de la Lección
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
                                Evaluación 1: Titulo del Curso
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'black' }} />
                            <Typography variant="body2" sx={{ ml: 1, mr: 1, fontWeight: 'bold' }}>
                                100%
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <Typography
                        variant="body1"
                        sx={{ 
                            fontWeight: 'bold', 
                            color: '#FFB300', 
                            cursor: 'pointer', 
                            transition: 'opacity 0.3s ease', 
                            '&:hover': { opacity: 0.7 }
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
  };

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
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </Box>
      )}
      {value === 1 && (
        <Box 
          role="tabpanel" 
          id="tabpanel-1" 
          aria-labelledby="tab-1" 
          sx={{ mt: 2 }}
        >
          <CourseAccordion panel="panel1" expanded={expanded} handleChange={handleChange} />
          <CourseAccordion panel="panel2" expanded={expanded} handleChange={handleChange} />
          <CourseAccordion panel="panel3" expanded={expanded} handleChange={handleChange} />
          <CourseAccordion panel="panel4" expanded={expanded} handleChange={handleChange} />
          <CourseAccordion panel="panel5" expanded={expanded} handleChange={handleChange} />
          <CourseAccordion panel="panel6" expanded={expanded} handleChange={handleChange} />
        </Box>
      )}
    </Box>
  );
}

export default LearnContent;