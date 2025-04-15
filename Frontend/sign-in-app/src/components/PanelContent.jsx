import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardActionArea, LinearProgress, Button, Stack, Divider, Select, FormControl, InputLabel, MenuItem, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { course_data } from './constants';
import WeekProgressChart from './WeekProgressChart';
import CourseProgressChart from './CourseProgressChart';
import QuizProgressChart from './QuizProgressChart';

const CUSTOM_COLOR = '#FFB300';

const ProgressCharts = () => {
  const [select, setSelect] = useState('semanal');

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  let chartComponent;
  if (select === 'cursos') {
    chartComponent = <CourseProgressChart />;
  } else if (select === 'evaluaciones') {
    chartComponent = <QuizProgressChart />;
  } else {
    chartComponent = <WeekProgressChart />;
  }

  return (
    <Box flex={2} sx={{ maxWidth: '100%', borderRadius: '16px', border: '1px solid #000', p: 4 }}>
      <Stack spacing={1} divider={<Divider flexItem sx={{ border: '1px solid #000' }} />}>
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
            <Box flex={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {select === 'semanal'
                  ? 'Lecciones'
                  : select === 'cursos'
                  ? 'Cursos'
                  : 'Evaluaciones'}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                <InputLabel id="charts-dropdown-label" sx={{ color: 'initial', '&.Mui-focused': { color: CUSTOM_COLOR } }}>
                  Gráfico
                </InputLabel>
                <Select
                  labelId="charts-dropdown-label"
                  id="charts-dropdown"
                  value={select}
                  onChange={handleChange}
                  label="Gráfico"
                  autoWidth
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'initial',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: CUSTOM_COLOR,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: CUSTOM_COLOR,
                    },
                  }}
                >
                  <MenuItem value="semanal">Semanal</MenuItem>
                  <MenuItem value="cursos">Cursos</MenuItem>
                  <MenuItem value="evaluaciones">Evaluaciones</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Box>
        <Box>
          {chartComponent}
        </Box>
      </Stack>
    </Box>
  );
};

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: '100%', borderRadius: '16px', border: '1px solid #000' }}>
            <CardContent>
                <Stack spacing={2} divider={<Divider flexItem sx={{ border: '1px solid #000' }} />}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Progreso: <strong>{course.progress}%</strong>
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={course.progress}
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
                    <CardActionArea onClick={() => navigate(`/enrolled/${course.id}`)}>
                        <Box p={2}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
                                <Box flex={2}>
                                    <Typography color="text.secondary">
                                        Categoría: {course.category}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Título: {course.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        Descripción: {course.description}
                                    </Typography>
                                </Box>
                                <Box
                                    flex={1}
                                    sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                                >
                                    <ArrowForwardIosRoundedIcon sx={{ fontSize: 40, color: 'black' }} />
                                </Box>
                            </Stack>
                        </Box>
                    </CardActionArea>
                    <Box>
                        <Button
                            component={Link}
                            to="/lesson"
                            variant="contained"
                            fullWidth
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                backgroundColor: CUSTOM_COLOR,
                                '&:hover': {
                                    backgroundColor: `${CUSTOM_COLOR}CC`,
                                },
                            }}
                        >
                            Continuar
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

const PanelContent = ({ onVerAprender }) => {
    const firstCourse = course_data[0];

    return ( 
        <Box sx={{ flexGrow: 1 }}>
            <Box p={3}>
                <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', mb: 3}}>
                    Sigue Aprendiendo
                </Typography>
                <CourseCard course={firstCourse} />
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 'bold',
                        color: '#FFB300',
                        cursor: 'pointer',
                        transition: 'opacity 0.3s ease',
                        textDecoration: 'underline',
                        '&:hover': { opacity: 0.7 },
                        mt: 2,
                        p: 1
                    }}
                    onClick={onVerAprender}
                >
                    Ver todo el progreso de Aprendizaje
                </Typography>
                <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', mb: 3, mt: 5}}>
                    Sigue tu Progreso
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8.5}>
                        <ProgressCharts />
                    </Grid>
                    <Grid item xs={12} md={3.5}>
                        <Box sx={{ borderRadius: '16px', border: '1px solid #000', p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Sección de Ligas
                            </Typography>
                            <Typography variant="body1">
                                Aquí los técnicos podrán visualizar su posición dentro del ranking de su grupo asignado por su instructor. La puntuación se obtiene por medio de los ejercicios de repaso y evaluaciones.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
     );
}

export default PanelContent;