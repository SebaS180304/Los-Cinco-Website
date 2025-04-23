import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { Box, Divider, List, ListItem, ListItemIcon, Stack, Typography, Button, useTheme, useMediaQuery, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, Breadcrumbs, IconButton, FormControlLabel, Checkbox, MenuItem, InputAdornment } from '@mui/material';
import { Link as LinkComp} from '@mui/material';
import Navbar from '../components/NavbarAdmin';
import QuestionsDialog from '../components/QuestionsDialog';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckMark from '@mui/icons-material/Check';
import categoryMapping from '../components/constants/categoryMapping';
import ConfirmationPopup from '../components/ConfirmationPopup';

const CUSTOM_COLOR = '#FFB300';

// Lista de detalles del curso
const CourseDetailsList = ({ courseLessons, handleSaveChanges, editableCourse, setEditableCourse, isEditing, setIsEditing, originalCourse, setOriginalCourse }) => {
  const categoryName = categoryMapping[editableCourse?.Categoria] || "Indefinida";
  const categoryOriginal = categoryMapping[originalCourse?.Categoria] || "Indefinida";
  const [selectedCategory, setSelectedCategory] = useState(categoryName);

  const handleEditOrSave = () => {
    if (isEditing) {
      // Si está en modo edición, guarda los cambios y desactiva el modo edición
      handleSaveChanges();
      setIsEditing(false);
    } else {
      // Si no está en modo edición, guarda los valores originales y activa el modo edición
      setOriginalCourse({ ...editableCourse });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditableCourse({ ...originalCourse }); // Restaura el curso original
    setSelectedCategory(categoryOriginal); // Restaura la categoría original
    setIsEditing(false); // Desactiva el modo edición
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    const selectedKey = Object.entries(categoryMapping).find(([key, value]) => value === selectedValue)?.[0];
    if (selectedKey !== undefined) {
      setSelectedCategory(selectedValue); // Actualizar el valor seleccionado
      setEditableCourse({ ...editableCourse, Categoria: parseInt(selectedKey, 10) }); // Guardar el key como número en editableCourse.Categoria
    }
  };

  return (
    <Box sx={{ pb: 2 }}>
      {!isEditing && (
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditOrSave}
            sx={{
              mb: '1rem',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' }, // Efecto de hover
            }}
          >
            Editar Curso
          </Button>
        </Box>
      )}
      {isEditing && (
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<CloseIcon />}
            color="primary"
            onClick={handleCancel}
            sx={{
              mb: '1rem',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' }, // Efecto de hover
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckMark />}
            onClick={handleEditOrSave}
            sx={{
              mb: '1rem',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              backgroundColor: CUSTOM_COLOR,
              color: '#ffffff',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#FFA000',
              },
            }}
          >
            Guardar
          </Button>
        </Box>
      )}
      <List>
        <React.Fragment>
          <ListItem sx={{ p: 2, pt: 0 }}>
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
              Categoría:
            </Typography>
            <TextField
              id="category-select"
              select={isEditing}
              value={selectedCategory}
              onChange={handleCategoryChange}
              fullWidth
              variant="standard"
              InputProps={{
                readOnly: !isEditing, // Deshabilitar edición si no está en modo edición
                startAdornment: isEditing ? (
                  <InputAdornment position="start">
                    <EditIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ) : null, // Mostrar el ícono solo si isEditing es true
              }}
              sx={{
                '& .MuiInputBase-root': { color: 'white' },
                '& .MuiSelect-select': { color: 'white' },
                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                '& .MuiSelect-icon': { color: 'white' },
                ml: 1,
              }}
            >
              {Object.entries(categoryMapping).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </ListItem>
          <Divider sx={{ backgroundColor: 'white' }} />
        </React.Fragment>
      </List>
    </Box>
  );
};

// Acordeón para cada lección
function LessonAccordion({ lecture, panel, expanded, handleChange, handleOpenEdit, handleOpenQuestions, isMobile }) {
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
                {lecture.TituloLeccion}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ borderRadius: '10px', border: '1px solid #000', p: 2 }}>
          <Box
          sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              gap: 2,
              p: 0,
          }}
          >
            {/* Primera columna */}
            <Box sx={{ flex: 1, p: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mx: 3 }}>
                <LibraryBooksOutlinedIcon sx={{ color: CUSTOM_COLOR, fontSize: 30 }} />
                <Typography variant="body2" sx={{ ml: 3, fontWeight: 'bold' }}>
                    Lección:
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                    {lecture.TituloLeccion}
                </Typography>
              </Box>
              {/* Contenido de la lección con límite y scroll */}
              <Box sx={{ display: 'flex', alignItems: 'top', mb: 0, mx: 3 }}>
                <LibraryBooksOutlinedIcon sx={{ color: CUSTOM_COLOR, fontSize: 30 }} />
                <Typography variant="body2" sx={{ ml: 3, fontWeight: 'bold' }}>
                    Contenido:
                </Typography>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mb: 0,
                    mx: 2,
                    width: '100%',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    padding: '8px',
                    border: '1px solid #ccc',
                    }}
                >
                    <Typography variant="body2">
                    {lecture.Contenido || 'Sin contenido disponible'}
                    </Typography>
                </Box>
              </Box>
            </Box>

            {/* Segunda columna */}
            <Box sx={{ flex: 1, p: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mx: 3 }}>
                <AssignmentOutlinedIcon sx={{ color: CUSTOM_COLOR, fontSize: 30 }} />
                <Typography variant="body2" sx={{ ml: 3, fontWeight: 'bold' }}>
                    Evaluación:
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                    {lecture.questions?.length || 0} preguntas
                </Typography>
              </Box>
              {/* Preguntas de evaluación */}
              <Box sx={{ display: 'flex', alignItems: 'top', mb: 0, mx: 3 }}>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mb: 0,
                    mx: 3,
                    width: '100%',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    padding: '8px',
                    border: '1px solid #ccc',
                    }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Preguntas de Evaluación
                  </Typography>
                  {lecture.questions && lecture.questions.length > 0 ? (
                    lecture.questions.map((question, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                        {index + 1}. {question.texto || 'Pregunta sin nombre'}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2">Sin preguntas disponibles</Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ pt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={lecture.questions && lecture.questions.length > 0 ? <AssignmentOutlinedIcon /> : <AddIcon />}
            onClick={() => handleOpenQuestions(lecture)}
          >
            {lecture.questions && lecture.questions.length > 0 ? 'Editar Preguntas' : 'Agregar Preguntas'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleOpenEdit(lecture)}
          >
            Editar Lección
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

function Courses() {
    const { courseId } = useParams();
    // const [cursos, setCursos] = useState([]);
    const [course, setCourse] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Verificar si el curso existe
    const courseLessons = course?.lecciones || [];

    const [editableCourse, setEditableCourse] = useState(null); // Estado temporal para el curso editable
    const [editableLessons, setEditableLessons] = useState([]); // Estado temporal para las lecciones editables

    // Estados
    const [lessonExpanded, setLessonExpanded] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingContent, setEditingContent] = useState('');
    const [newLesson, setNewLesson] = useState({ TituloLeccion: '', Contenido: '' });
    const [openQuestions, setOpenQuestions] = useState(false);
    const [currentLecture, setCurrentLecture] = useState(null); // Lección actual para editar preguntas
    const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar el modo de edición
    const [originalCourse, setOriginalCourse] = useState(null); // Guardar el curso original

    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(false); // Estado para manejar errores

    const [showPopup, setShowPopup] = useState(false);

    // Obtener detalles del curso
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/CursoAdmin/Single?IdCurso=${courseId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setCourse(response.data);
          setError(false);
          setEditableCourse({
            TituloCurso: response.data.tituloCurso,
            DescripcionCurso: response.data.descripcionCurso,
            Categoria: response.data.categoria,
          });
          if (response.data.tituloCurso === '') {
            setIsEditing(true); // Activar el modo de edición si no hay título
          }
          setEditableLessons(response.data.lecciones.map((lesson) => ({
            IdLeccion: lesson.idLeccion,
            TituloLeccion: lesson.tituloLeccion,
            Contenido: lesson.contenido,
            questions: lesson.preguntas || [],
          })));
        } catch (error) {
          console.error('Error al obtener el curso:', error);
          setError(true);
        } finally {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setLoading(false);
        }
      };
      fetchCourse();
    }, [courseId]);

    const handleOpenQuestions = (lecture) => {
      if (!lecture.questions || lecture.questions.length === 0) {
        lecture.questions = [
          {
            texto: '',
            opciones: [
              { texto: '', correcta: false },
              { texto: '', correcta: false },
            ],
          },
        ];
      }
      setCurrentLecture(lecture); // Establecer la lección actual
      setOpenQuestions(true); // Abrir el diálogo de preguntas
    };
    
    const handleCloseQuestions = () => {
      setOpenQuestions(false); // Cerrar el diálogo de preguntas
      setCurrentLecture(null); // Limpiar la lección actual
    };
    
    const handleQuestionChange = (questionIndex, field, value) => {
      const updatedQuestions = [...currentLecture.questions];
      updatedQuestions[questionIndex][field] = value;
      setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
    };
    
    const handleOptionChange = (questionIndex, optionIndex, field, value) => {
      const updatedQuestions = [...currentLecture.questions];
      updatedQuestions[questionIndex].opciones[optionIndex][field] = value;
      setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
    };
    
    const handleCorrectOptionChange = (questionIndex, optionIndex) => {
      const updatedQuestions = [...currentLecture.questions];
      updatedQuestions[questionIndex].opciones = updatedQuestions[questionIndex].opciones.map((opcion, i) => ({
        ...opcion,
        correcta: i === optionIndex,
      }));
      setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
    };
    
    const handleAddOption = (questionIndex) => {
      const updatedQuestions = [...currentLecture.questions];
      if (updatedQuestions[questionIndex].opciones.length < 4) {
        updatedQuestions[questionIndex].opciones.push({ texto: '', correcta: false });
        setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
      }
    };
    
    const handleRemoveOption = (questionIndex, optionIndex) => {
      const updatedQuestions = [...currentLecture.questions];
      updatedQuestions[questionIndex].opciones = updatedQuestions[questionIndex].opciones.filter((_, i) => i !== optionIndex);
      setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
    };
    
    const handleAddQuestion = () => {
      const updatedQuestions = [...(currentLecture?.questions || [])];
      updatedQuestions.push({
        texto: '',
        opciones: [
          { texto: '', correcta: false },
          { texto: '', correcta: false },
        ],
      });
      setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
    };
    
    const handleSaveQuestions = async () => {
      try {
        // Validar que haya preguntas en la lección actual
        if (!currentLecture || !currentLecture.questions) {
          console.error('No hay preguntas para guardar.');
          return;
        }
    
        // Preparar las preguntas en el formato esperado por la API
        const payload = currentLecture.questions.map((question) => ({
          texto: question.texto,
          opciones: question.opciones.map((opcion) => ({
            texto: opcion.texto,
            correcta: opcion.correcta,
          })),
        }));
    
        // Enviar las preguntas a la API
        await axios.post(
          `/Quiz/Leccion?id_leccion=${currentLecture.IdLeccion}`,
          payload,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
    
        // Actualizar las lecciones localmente
        const updatedLessons = editableLessons.map((lesson) =>
          lesson.IdLeccion === currentLecture.IdLeccion
            ? { ...lesson, questions: currentLecture.questions }
            : lesson
        );
        setEditableLessons(updatedLessons);
    
        // Cerrar el pop-up
        handleCloseQuestions();
        console.log('Preguntas guardadas exitosamente en la API.');
      } catch (error) {
        console.error('Error al guardar las preguntas en la API:', error);
        alert('Hubo un error al guardar las preguntas.');
      }
    };

    // ---

    const handleLessonChange = (panel) => (event, isExpanded) => {
        setLessonExpanded(isExpanded ? panel : false);
    };

    const handleOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
        setNewLesson({ TituloLeccion: '', Contenido: '' });
    };

    const handleAddLesson = async () => {
      try {
        // Validar los datos antes de enviar la solicitud
        if (!newLesson.TituloLeccion || !newLesson.Contenido) {
          alert('Por favor, completa todos los campos antes de agregar la lección.');
          return;
        }
    
        console.log({
          TituloLeccion: newLesson.TituloLeccion,
          Contenido: newLesson.Contenido,
          IdCurso: courseId
        });
    
        // Crear la nueva lección en el backend
        const response = await axios.post(
          `/CursoAdmin/Leccion/Nuevo?IdCurso=${courseId}`,
          {
            TituloLeccion: newLesson.TituloLeccion,
            Contenido: newLesson.Contenido,
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
    
        // Agregar la nueva lección con el ID asignado por el backend
        const updatedLessons = [...editableLessons];
        updatedLessons.push({
          IdLeccion: response.data.idLeccion, // ID asignado por el backend
          TituloLeccion: newLesson.TituloLeccion,
          Contenido: newLesson.Contenido,
        });
    
        // Actualizar el estado con las lecciones modificadas
        setEditableLessons(updatedLessons);
    
        // Limpiar el formulario de nueva lección
        setNewLesson({ TituloLeccion: '', Contenido: '' });
    
        // Cerrar el diálogo de agregar lección
        handleCloseAdd();

        // Mostrar el pop-up de confirmación
        setShowPopup(true);
      } catch (error) {
        console.error('Error al agregar la lección:', error.response?.data || error.message);
        alert('Hubo un error al agregar la lección.');
      }
    };

    const handleOpenEdit = (lesson, index) => {
        setEditingIndex(index);
        setEditingTitle(lesson.TituloLeccion);
        setEditingContent(lesson.Contenido);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setEditingIndex(null);
        setEditingTitle('');
        setEditingContent('');
    };

    const handleSaveEdit = async () => {
      if (editingIndex !== null) {
        try {
          // Crear una copia de la lección editada
          const updatedLesson = {
            ...editableLessons[editingIndex],
            TituloLeccion: editingTitle,
            Contenido: editingContent,
          };
    
          // Enviar la lección editada al backend
          await axios.patch(
            '/CursoAdmin/Leccion/Edit',
            updatedLesson,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
          );
    
          // Actualizar el estado local con la lección editada
          const updatedLessons = [...editableLessons];
          updatedLessons[editingIndex] = updatedLesson;
          setEditableLessons(updatedLessons);
    
          // Cerrar el diálogo de edición
          handleCloseEdit();
    
          // Mostrar el pop-up de confirmación
          setShowPopup(true);
        } catch (error) {
          console.error('Error al guardar la lección editada:', error);
          alert('Hubo un error al guardar la lección.');
        }
      }
    };
    
    const handleSaveChanges = async () => {
      try {
        // Actualizar el curso
        await axios.patch(
          '/CursoAdmin/Edit',
          {
            IdCurso: courseId,
            TituloCurso: editableCourse.TituloCurso,
            DescripcionCurso: editableCourse.DescripcionCurso,
            Categoria: editableCourse.Categoria,
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
    
        // Actualizar las lecciones
        for (const lesson of editableLessons) {
          await axios.patch(
            '/CursoAdmin/Leccion/Edit',
            lesson,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
          );
        }
    
        // Mostrar el pop-up de confirmación
        setShowPopup(true);
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
        alert('Hubo un error al guardar los cambios.');
      }
    };

    if (loading) {
      return (
          <Dialog open={true} PaperProps={{ sx: { textAlign: 'center', padding: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                  Cargando curso...
              </Typography>
          </Dialog>
      );
    }

    if (error) {
      return (
          <Box sx={{ display: 'flex', mt: '64px' }}>
              <Navbar />
              <Box component="main" sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: 'black' }}>
                      Curso no encontrado
                  </Typography>
              </Box>
          </Box>
      );
    }
  
    return (
      <Box sx={{ display: 'flex', mt: '64px' }}>
        <Navbar />
        <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Breadcrumbs */}
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <LinkComp underline="hover" color="inherit" component={Link} to="/dashboard">
                Cursos
              </LinkComp>
              <Typography color="text.primary">{course?.tituloCurso || 'Nuevo Curso'}</Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ backgroundColor: '#0c1633', borderRadius: '20px' }}>
            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={3}
              justifyContent="space-between"
              sx={{ px: 7, pt: 2 }}
            >
              <Box {...(!isMobile ? { flex: 3 } : {})} sx={{ mt: 2, pt: 5 }}>
               {/* Nombre del curso */}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', position: 'relative', py: 1 }}
                >
                  {isEditing && ( // Mostrar el ícono solo si está en modo edición
                    <EditIcon sx={{ color: 'white', fontSize: 30, mr: 1.5, my: 0 }} />
                  )}
                  <TextField
                    variant="standard"
                    value={editableCourse?.TituloCurso || ''}
                    onChange={(e) => setEditableCourse({ ...editableCourse, TituloCurso: e.target.value })}
                    // onBlur={handleSaveName}
                    inputRef={(input) => {
                      if (input && isEditing) {
                          input.onmouseenter = () => input.focus(); // Hace focus al pasar el cursor
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          e.target.blur(); // Quita el focus del input
                          e.preventDefault(); // Evita el comportamiento predeterminado del Enter
                      }
                    }}
                    fullWidth
                    placeholder={isMobile ?  "Agrega nombre" : "Agrega el nombre del curso"}
                    InputProps={{
                      readOnly: !isEditing,
                      style: { color: 'white', fontSize: '3rem' }, // Aumentar el tamaño de la fuente
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: isEditing ? 'white' : 'transparent',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: isEditing ? 'white' : 'transparent',
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: isEditing ? 'white' : 'transparent',
                      },
                      '& .MuiInput-underline:hover:after': {
                        borderBottomColor: isEditing ? 'white' : 'transparent',
                      },
                    }}
                  />
                </Box>

                {/* Descripción del curso */}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', position: 'relative', pb: 2 }}
                >
                  {isEditing && ( // Mostrar el ícono solo si está en modo edición
                    <EditIcon sx={{ color: 'white', fontSize: 30, mr: 1.5, my: 0 }} />
                  )}
                  <TextField
                    variant="standard"
                    value={editableCourse?.DescripcionCurso || ''}
                    onChange={(e) => setEditableCourse({ ...editableCourse, DescripcionCurso: e.target.value })}
                    fullWidth
                    placeholder={isMobile ? "Agrega descripción" : "Agrega la descripción del curso"}
                    inputRef={(input) => {
                      if (input) {
                        input.onmouseenter = () => input.focus(); // Hace focus al pasar el cursor
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.target.blur(); // Quita el focus del input
                        e.preventDefault(); // Evita el comportamiento predeterminado del Enter
                      }
                    }}
                    InputProps={{
                      readOnly: !isEditing,
                      style: { color: 'white', fontSize: '1rem' }, // Aumentar el tamaño de la fuente
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: isEditing ? 'white' : 'transparent',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: isEditing ? 'white' : 'transparent',
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: isEditing ? 'white' : 'transparent',
                      },
                      '& .MuiInput-underline:hover:after': {
                        borderBottomColor: isEditing ? 'white' : 'transparent',
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2,
                    mb: 2,
                  }}
                >
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
                      '&:hover': { backgroundColor: `CC` },
                    }}
                  >
                    PDF
                  </Button>
                </Box>
              </Box>
              <Box {...(!isMobile ? { flex: 2 } : {})}>
                <CourseDetailsList courseLessons={courseLessons} handleSaveChanges={handleSaveChanges} editableCourse={editableCourse} setEditableCourse={setEditableCourse} isEditing={isEditing} setIsEditing={setIsEditing} originalCourse={originalCourse} setOriginalCourse={setOriginalCourse} />
              </Box>
            </Stack>
            {/* <Box sx={{ pt: 3 }}>
              <ProgressSection course={course} courseLessons={courseLessons} />
            </Box> */}
          </Box>
          <Box sx={{ pt: 7 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Contenido del Curso
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenAdd}
              >
                Agregar Lección
              </Button>
            </Box>
            {editableLessons.length === 0 ? (
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  No hay lecciones disponibles.
                </Typography>
              </Box>
            ) : (
              editableLessons.map((lesson, index) => (
                <LessonAccordion
                  key={index}
                  lecture={lesson}
                  panel={`panel-${index}`}
                  expanded={lessonExpanded}
                  handleChange={handleLessonChange}
                  handleOpenEdit={() => handleOpenEdit(lesson, index)} // Pasar índice
                  handleOpenQuestions={handleOpenQuestions}
                  isMobile={isMobile}
                />
              ))
            )}
          </Box>
          {/* Dialog para agregar nueva lección */}
          <Dialog open={openAdd} onClose={handleCloseAdd} maxWidth="sm" fullWidth>
            <DialogTitle>Añadir Nueva Lección</DialogTitle>
            <DialogContent>
              <TextField
                label="Título de la lección"
                variant="outlined"
                fullWidth
                value={newLesson.TituloLeccion}
                onChange={(e) => setNewLesson({ ...newLesson, TituloLeccion: e.target.value })}
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                label="Contenido de la lección"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={newLesson.Contenido}
                onChange={(e) => setNewLesson({ ...newLesson, Contenido: e.target.value })}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddLesson}>
                  Añadir
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
          {/* Dialog para editar lección */}
          <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
            <DialogTitle>Editar Lección</DialogTitle>
            <DialogContent>
              <TextField
                label="Título de la lección"
                variant="outlined"
                fullWidth
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                label="Contenido de la lección"
                variant="outlined"
                fullWidth
                multiline
                rows={7}
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
                <Button variant="outlined" color="primary" onClick={handleCloseEdit}>
                  Cancelar
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                  Guardar
                </Button>
              </Box>
            </DialogContent>
          </Dialog>

          {/* Pop-up para agregar/editar preguntas */}
          <QuestionsDialog
            open={openQuestions}
            onClose={handleCloseQuestions}
            lecture={currentLecture}
            onQuestionChange={handleQuestionChange}
            onOptionChange={handleOptionChange}
            onCorrectOptionChange={handleCorrectOptionChange}
            onAddOption={handleAddOption}
            onRemoveOption={handleRemoveOption}
            onAddQuestion={handleAddQuestion}
            onSaveQuestions={handleSaveQuestions}
          />
          {showPopup && (
            <ConfirmationPopup
              message="Los cambios se han guardado correctamente."
              duration={3000}
              onClose={() => setShowPopup(false)}
            />
          )}
        </Box>
      </Box>
    );
  }
  
  export default Courses;