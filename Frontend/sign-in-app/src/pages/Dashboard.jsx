import React, { useEffect, useContext } from 'react';
import { Box, Breadcrumbs, Typography, Divider, Link } from '@mui/material';
import { CursosContext } from '../context/GlobalContext';
import axios from '../api/axios';
import NavbarAdmin from '../components/NavbarAdmin';
import AdminCourseCard from '../components/AdminCourseCard';

const Dashboard = () => {
  const { cursos, setCursos } = useContext(CursosContext);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('/CursoAdmin/All', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCursos(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
        setCursos([]);
      }
    };
    fetchCursos();
  }, [setCursos]);

  const handleAddCurso = (newCurso) => {
    setCursos((prevCursos) => [...prevCursos, newCurso]);
  };

  return (
    <Box sx={{ display: 'flex', mt: '64px' }}>
      <NavbarAdmin />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit">
            Cursos
          </Link>
        </Breadcrumbs>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Vista de Administrador
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Array.isArray(cursos) &&
            cursos.map((curso) => (
              <AdminCourseCard
              course={{
                  id: curso.idCurso,
                  title: curso.tituloCurso,
                  progress: curso.progress || 0,
                  category: curso.categoria || 'Indefinido',
                }}
                key={curso.idCurso}
                />
          ))}
          <AdminCourseCard isAddCard onAddCurso={handleAddCurso} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;