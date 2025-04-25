import React, { useState } from 'react';
import { Box, Typography, Divider, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import LearnCourseCard from './LearnCourseCard';
import CourseAccordion from './CourseAccordion';

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

const LearnContent = ({ course }) => {
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setExpanded(false);
  };
 
  const inProgressCourses = course?.filter(item => item?.porcentaje < 100);
  const completedCourses = course?.filter(item => item?.porcentaje === 100);

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
          {inProgressCourses.length === 0 ? (
            <Typography>
              No hay cursos en progreso disponibles.
            </Typography>
          ) : (
            inProgressCourses.map(item => (
              <LearnCourseCard course={item} key={item?.idCurso} />
            ))
          )}
        </Box>
      )}
      {value === 1 && (
        <Box
          role="tabpanel"
          id="tabpanel-1"
          aria-labelledby="tab-1"
          sx={{ mt: 2 }}
        >
          {completedCourses.length === 0 ? (
            <Typography>
              No hay cursos completados disponibles.
            </Typography>
          ) : (
            completedCourses.map(item => (
              <CourseAccordion 
                course={item} 
                panel={`panel-${item?.idCurso}`} 
                key={item?.idCurso} 
                expanded={expanded} 
                handleChange={handleChange} 
              />
            ))
          )}
        </Box>
      )}
    </Box>
  );
}

export default LearnContent;