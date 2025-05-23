import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { Box, Divider, List, ListItem, ListItemIcon, Stack, Typography, Button, useTheme, useMediaQuery, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, Breadcrumbs, MenuItem, InputAdornment, Switch, FormControlLabel, IconButton } from '@mui/material';
import { Link as LinkComp} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/NavbarAdmin';
import AdminBottBar from '../components/AdminBottBar';
import QuestionsDialog from '../components/QuestionsDialog';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckMark from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import categoryMapping from '../components/constants/categoryMapping';
import ConfirmationPopup from '../components/ConfirmationPopup';
import ExamQuestions from '../components/ExamQuestions';
import FileUploader from '../components/FileUploader';
import DownloadCoursePDF from '../components/DownloadCoursePDF';

const CUSTOM_COLOR = '#FFB300';

// Lista de detalles del curso
const CourseDetailsList = ({ courseLessons, editableCourse, setEditableCourse, isEditing, isMobile, selectedCategory, handleEditOrSave, handleCancel, handleCategoryChange }) => {
  return (
    <Box sx={{ pb: 2 }}>
      {!isEditing && !isMobile && (
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
      {isEditing && !isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
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
              Intentos Examen: 
            </Typography>
            <TextField
              id="category-select"
              type='number'
              variant="standard"
              value={editableCourse?.IntentosMax || 1}
              onChange={(e) => {
                const value = Math.max(1, Math.min(5, parseInt(e.target.value) || 1)); // Limitar entre 1 y 5
                setEditableCourse({ ...editableCourse, IntentosMax: value }); // Actualizar el estado
              }}
              InputProps={{
                readOnly: !isEditing, // Deshabilitar edición si no está en modo edición
                startAdornment: isEditing ? (
                  <InputAdornment position="start">
                    <EditIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ) : null, // Mostrar el ícono solo si isEditing es true
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                '& .MuiInputBase-root': { color: 'white' },
                '& .MuiSelect-select': { color: 'white' },
                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                '& .MuiSelect-icon': { color: 'white' },
                ml: 1,
              }}
            ></TextField>
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
function LessonAccordion({ lecture, panel, expanded, handleChange, handleOpenEdit, handleOpenQuestions, isMobile, handleOpenFileUploader, handleRemoveLesson }) {
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
              <IconButton
                color="error"
                onClick={() => handleRemoveLesson(lecture.IdLeccion)} // Llamar a la función para eliminar la lección
                sx={{ ml: 'auto' }} // Alinear a la derecha
              >
                <DeleteIcon />
              </IconButton>
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
        <Box sx={{ pt: 3 }}>
          {isMobile ? (
            // Vista móvil: Botones en columna
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                justifyContent: 'flex-end', 
                alignItems: 'stretch' // Alinear los botones al ancho completo
              }}
            >
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={() => handleOpenFileUploader(lecture)} // Abrir el diálogo de FileUploader
              >
                Subir Archivo
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => handleOpenEdit(lecture)}
              >
                Editar Lección
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={lecture.questions && lecture.questions.length > 0 ? <AssignmentOutlinedIcon /> : <AddIcon />}
                onClick={() => handleOpenQuestions(lecture)}
              >
                {lecture.questions && lecture.questions.length > 0 ? 'Editar Preguntas' : 'Agregar Preguntas'}
              </Button>
            </Box>
          ) : (
            // Vista escritorio: Botones en fila
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 2, 
                justifyContent: 'flex-end', 
                alignItems: 'center' // Alinear los botones en el centro verticalmente
              }}
            >
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
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={() => handleOpenFileUploader(lecture)} // Abrir el diálogo de FileUploader
              >
                Subir Archivo
              </Button>
            </Box>
          )}
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
    const examQuestionsRef = useRef(null);

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
    const [viewingExam, setViewingExam] = useState(false);
    const [fileUploaderOpen, setFileUploaderOpen] = useState(false); // Estado para controlar el diálogo de FileUploader

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
            Visible: response.data.visible,
            IntentosMax: response.data.intentosMax || 1,
          });
          if (response.data.tituloCurso === '') {
            setIsEditing(true); // Activar el modo de edición si no hay título
          }
          setEditableLessons(response.data.lecciones.map((lesson) => ({
            IdLeccion: lesson.idLeccion,
            TituloLeccion: lesson.tituloLeccion,
            Contenido: lesson.contenido,
            Url: lesson.url,
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

    // 

    // const categoryName = categoryMapping[editableCourse?.Categoria] || "Indefinido";
    const categoryOriginal = categoryMapping[originalCourse?.Categoria] || "Indefinida";
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
      if (editableCourse?.Categoria !== undefined) {
        const categoryName = categoryMapping[editableCourse.Categoria] || "Indefinido";
        setSelectedCategory(categoryName);
      }
    }, [editableCourse]);
  
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

    // 


    const handleOpenFileUploader = (lesson) => {
      setCurrentLecture(lesson); // Establecer la lección actual
      setFileUploaderOpen(true); // Abrir el diálogo
    };
  
    const handleCloseFileUploader = () => {
        setFileUploaderOpen(false); // Cerrar el diálogo
    };
    
    const handleUrl = (lessonId, fileUrl) => {
      // Encuentra la lección correspondiente por su ID
      const updatedLessons = editableLessons.map((lesson) =>
          lesson.IdLeccion === lessonId
              ? { ...lesson, Url: fileUrl } // Actualiza el campo Url de la lección
              : lesson
      );
  
      // Actualiza el estado local
      setEditableLessons(updatedLessons);
    };

    const handleOpenQuestions = (lecture) => {
      setCurrentLecture(lecture); // Establecer la lección actual
      setOpenQuestions(true); // Abrir el diálogo de preguntas
      if (!lecture.questions || lecture.questions.length === 0) {
        const updatedQuestions = [...(lecture.questions || [])];
        updatedQuestions.push({
          texto: '',
          opciones: [
            { texto: '', correcta: false },
            { texto: '', correcta: false },
          ],
        });
        setCurrentLecture({ ...lecture, questions: updatedQuestions });
      }
    };
    
    const handleCloseQuestions = () => {
      // currentLecture.questions = currentLecture.questions.filter((question) => question.texto.trim() !== ''); // Filtrar preguntas vacías
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

    const handleAddQuestionFromCourses = () => {
      if (examQuestionsRef.current) {
        examQuestionsRef.current.addQuestion(); // Llamar a la función addQuestion expuesta por ExamQuestions
      }
    };
    
    const handleSaveQuestionFromCourses = () => {
      if (examQuestionsRef.current) {
        examQuestionsRef.current.saveQuestions(); // Llamar a la función saveQuestions expuesta por ExamQuestions
      }
    };

    const handleRemoveQuestion = (questionIndex) => {
      const updatedQuestions = [...currentLecture.questions];
      updatedQuestions.splice(questionIndex, 1); // Eliminar la pregunta en el índice especificado
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
        console.log(currentLecture.IdLeccion);
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
            IntentosMax: editableCourse.IntentosMax,
            Visible: editableCourse.Visible,
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
    
        // Mostrar el pop-up de confirmación
        setShowPopup(true);
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
        alert('Hubo un error al guardar los cambios.');
      }
    };

    const handleVisibilityChange = async (event) => {
      const isChecked = event.target.checked;
      setEditableCourse({ ...editableCourse, Visible: isChecked });
      try {
        await axios.patch(
          '/CursoAdmin/Edit',
          {
            IdCurso: courseId,
            TituloCurso: editableCourse.TituloCurso,
            DescripcionCurso: editableCourse.DescripcionCurso,
            Categoria: editableCourse.Categoria,
            IntentosMax: editableCourse.IntentosMax,
            Visible: isChecked,
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        console.log('Visibilidad actualizada:', isChecked);
      } catch (error) {
        console.error('Error al actualizar la visibilidad:', error);
        alert('Hubo un error al actualizar la visibilidad.');
      }
    };

    const handleRemoveLesson = async (lessonId) => {
      try {
        // Eliminar la lección del backend
        await axios.delete(`/CursoAdmin/Lecciones/Eliminar?id_leccion=${lessonId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
  
        // Actualizar el estado local eliminando la lección
        const updatedLessons = editableLessons.filter((lesson) => lesson.IdLeccion !== lessonId);
        setEditableLessons(updatedLessons);
  
        alert('Lección eliminada exitosamente.');
      } catch (error) {
        console.error('Error al eliminar la lección:', error);
        alert('Hubo un error al eliminar la lección.');
      }
    };

    const IOSSwitch = styled((props) => (
      <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
      width: 42,
      height: 26,
      padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
          transform: 'translateX(16px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            backgroundColor: CUSTOM_COLOR,
            opacity: 1,
            border: 0,
            ...theme.applyStyles('dark', {
              backgroundColor: '#2ECA45',
            }),
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          color: theme.palette.grey[100],
          ...theme.applyStyles('dark', {
            color: theme.palette.grey[600],
          }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.7,
          ...theme.applyStyles('dark', {
            opacity: 0.3,
          }),
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
      },
      '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
        ...theme.applyStyles('dark', {
          backgroundColor: '#39393D',
        }),
      },
    }));

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
      <Box sx={{ display: 'flex', mt: '64px', mb: isMobile ? '64px': '0' }}>
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
            <FormControlLabel
              control={
                <IOSSwitch 
                  sx={{ m: 1 }}
                  onChange={handleVisibilityChange}
                  checked={editableCourse?.Visible || false}
                />
              }
              label="Visible"
            />
          </Box>
          <Box sx={{ backgroundColor: '#0c1633', borderRadius: '20px' }}>
            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={3}
              justifyContent="space-between"
              sx={{ px: 7, pt: 2 }}
            >
              <Box {...(!isMobile ? { flex: 3 } : {})} sx={{ mt: 2, pt: 5 }}>
              {!isEditing && isMobile && (
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
                {isEditing && isMobile && (
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
                    multiline
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
                    multiline
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
                  <Box sx={{ width: isMobile ? '100%' : '50%' }}>
                        <DownloadCoursePDF courseId={courseId} />
                    </Box>
                </Box>
              </Box>
              <Box {...(!isMobile ? { flex: 2 } : {})}>
                <CourseDetailsList courseLessons={courseLessons} editableCourse={editableCourse} setEditableCourse={setEditableCourse} isEditing={isEditing} isMobile={isMobile} selectedCategory={selectedCategory} handleEditOrSave={handleEditOrSave} handleCancel={handleCancel} handleCategoryChange={handleCategoryChange} />
              </Box>
            </Stack>
            {/* <Box sx={{ pt: 3 }}>
              <ProgressSection course={course} courseLessons={courseLessons} />
            </Box> */}
          </Box>
          <Box sx={{ pt: 7 }}>
          <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', // Cambiar la dirección según isMobile
                justifyContent: 'space-between', 
                alignItems: isMobile ? 'flex-start' : 'center', // Alinear los botones correctamente
                mb: 3 
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: isMobile ? 2 : 0 }}>
                Contenido del Curso
              </Typography>

              {/* Contenedor para los botones */}
              {isMobile ? (
                // Vista móvil: Botones en columna con el orden deseado
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2, 
                    width: '100%' // Ocupan todo el ancho en móvil
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<AssignmentOutlinedIcon />}
                    onClick={() => setViewingExam(!viewingExam)}
                  >
                    {viewingExam ? 'Ver Lecciones' : 'Ver Examen'}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={viewingExam ? handleAddQuestionFromCourses : handleOpenAdd}
                  >
                    {viewingExam ? 'Agregar Pregunta' : 'Agregar Lección'}
                  </Button>
                  {viewingExam && (
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveQuestionFromCourses}
                      sx={{
                        backgroundColor: '#FFB300',
                        color: '#ffffff',
                      }}
                    >
                      Guardar Cambios
                    </Button>
                  )}
                </Box>
              ) : (
                // Vista escritorio: Botones en fila con el orden original
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    flexDirection: 'row', 
                    width: 'auto' // Mantienen su tamaño automático en escritorio
                  }}
                >
                  {viewingExam && (
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveQuestionFromCourses}
                      sx={{
                        backgroundColor: '#FFB300',
                        color: '#ffffff',
                      }}
                    >
                      Guardar Cambios
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={viewingExam ? handleAddQuestionFromCourses : handleOpenAdd}
                  >
                    {viewingExam ? 'Agregar Pregunta' : 'Agregar Lección'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<AssignmentOutlinedIcon />}
                    onClick={() => setViewingExam(!viewingExam)}
                  >
                    {viewingExam ? 'Ver Lecciones' : 'Ver Examen'}
                  </Button>
                </Box>
              )}
            </Box>
            {viewingExam ? (
              <ExamQuestions ref={examQuestionsRef} courseId={courseId} />
            ) : (
              editableLessons.length === 0 ? (
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
                    handleOpenEdit={() => handleOpenEdit(lesson, index)}
                    handleOpenQuestions={handleOpenQuestions}
                    isMobile={isMobile}
                    handleOpenFileUploader={handleOpenFileUploader}
                    fileUploaderOpen={fileUploaderOpen}
                    handleCloseFileUploader={handleCloseFileUploader}
                    handleUrl={() => handleUrl(index, lesson.Url)}
                    handleRemoveLesson={handleRemoveLesson}
                  />
                ))
              )
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
            onRemoveQuestion={handleRemoveQuestion}
            isMobile={isMobile}
          />
          {/* Pop-up para subir archivos */}
          <FileUploader
              lesson={currentLecture}
              editableLessons={editableLessons}
              open={fileUploaderOpen} // Controlar visibilidad del diálogo
              onClose={handleCloseFileUploader} // Cerrar el diálogo
              onFileUploaded={(fileUrl) => {
                  handleUrl(currentLecture.IdLeccion, fileUrl); // Actualizar el estado local con el nuevo URL del archivo
              }}
              setShowPopup={setShowPopup}
          />
          {showPopup && (
            <ConfirmationPopup
              message="Los cambios se han guardado correctamente."
              duration={3000}
              onClose={() => setShowPopup(false)}
            />
          )}
        </Box>
        {isMobile && <AdminBottBar />}
      </Box>
    );
  }
  
  export default Courses;