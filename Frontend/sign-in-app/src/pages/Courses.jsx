import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { CursosContext } from '../context/GlobalContext';
import EstadisticasAlumnos from '../components/EstadisticasAlumnos';
import Lecciones from '../components/Lecciones';
import CursosSimilares from '../components/CursosSimilares';
import PreguntasQuiz from '../components/PreguntasQuiz';
import NavbarAdmin from '../components/NavbarAdmin';

const Courses = () => {
  const { courseId } = useParams();
  const { cursos } = useContext(CursosContext);

  const curso = cursos[courseId];

  if (!curso) {
    return <Typography variant="h4">Curso no encontrado</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', mt: '64px' }}>
      <NavbarAdmin />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4">Curso: {curso.nombre}</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <EstadisticasAlumnos />
          </Grid>
          <Grid item xs={12} md={6}>
            <Lecciones courseId={courseId} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CursosSimilares />
          </Grid>
          <Grid item xs={12} md={6}>
            <PreguntasQuiz courseId={courseId} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Courses;