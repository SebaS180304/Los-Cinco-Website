import React, { useEffect, useContext, useState } from 'react';
import { Box, Breadcrumbs, Typography, Divider, Link, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CursosContext } from '../context/GlobalContext';
import axios from '../api/axios';
import NavbarAdmin from '../components/NavbarAdmin';
import AdminCourseCard from '../components/AdminCourseCard';
import ConfirmationPopup from '../components/ConfirmationPopup';

const Dashboard = () => {
  const { cursos, setCursos } = useContext(CursosContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Estado para controlar el diálogo
  const [selectedCursoId, setSelectedCursoId] = useState(null); // ID del curso seleccionado para eliminar
  const [showPopup, setShowPopup] = useState(false);

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

  const handleDeleteCurso = async () => {
    try {
      await axios.delete(`http://localhost:5011/CursoAdmin/Eliminar?id_curso=${selectedCursoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCursos((prevCursos) => prevCursos.filter((curso) => curso.idCurso !== selectedCursoId));
      setShowPopup(true);
      setDeleteDialogOpen(false); // Cerrar el diálogo después de eliminar
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
      alert('Hubo un error al eliminar el curso.');
    }
  };

  const handleOpenDeleteDialog = (idCurso) => {
    setSelectedCursoId(idCurso); // Guardar el ID del curso seleccionado
    setDeleteDialogOpen(true); // Abrir el diálogo
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false); // Cerrar el diálogo sin eliminar
    setSelectedCursoId(null); // Limpiar el ID seleccionado
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
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Panel de Cursos
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Array.isArray(cursos) &&
            cursos.map((curso) => (
              <AdminCourseCard
                course={{
                  id: curso.idCurso,
                  title: curso.tituloCurso,
                  description: curso.descripcionCurso,
                  category: curso.categoria,
                  visible: curso.visible || false,
                }}
                key={curso.idCurso}
                onDeleteCurso={handleOpenDeleteDialog} // Abrir el diálogo de confirmación
              />
            ))}
          <AdminCourseCard isAddCard onAddCurso={handleAddCurso} />
        </Box>
      </Box>

      {/* Diálogo de confirmación */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿Estás seguro de eliminar este curso?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción no se puede deshacer. Si eliminas este curso, toda su información será eliminada permanentemente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteCurso} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      {showPopup && (
        <ConfirmationPopup
          message="Los cambios se han guardado correctamente."
          duration={3000}
          onClose={() => setShowPopup(false)}
        />
      )}
    </Box>
  );
};

export default Dashboard;