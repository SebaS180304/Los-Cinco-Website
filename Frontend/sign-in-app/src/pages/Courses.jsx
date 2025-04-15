import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Divider, List, ListItem, ListItemIcon, Stack, Typography, Button, useTheme, useMediaQuery, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, Breadcrumbs, IconButton, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import { Link as LinkComp} from '@mui/material';
import Navbar from '../components/NavbarAdmin';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { CursosContext } from '../context/GlobalContext';
import ProgressSection from '../components/ProgressSection';

const CUSTOM_COLOR = '#FFB300';

const categories = [
  { value: 'seleccionar', label: 'Indefinido' },
  { value: 'programming', label: 'Programación' },
  { value: 'design', label: 'Diseño' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'add_new', label: 'Agregar nueva categoría' },
];

// Lista de detalles del curso
const CourseDetailsList = ({ courseLessons, course }) => {
  const [selectedCategory, setSelectedCategory] = useState(course?.category || 'seleccionar');
  const [customCategory, setCustomCategory] = useState('');

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (value === 'add_new') {
      const newCategory = prompt('Ingrese el nombre de la nueva categoría:');
      if (newCategory) {
        setCustomCategory(newCategory);
        setSelectedCategory(newCategory);
      }
    } else {
      setSelectedCategory(value);
    }
  };

  return (
    <Box sx={{ pb: 2 }}>
      <List>
        <React.Fragment>
          <ListItem sx={{ p: 2 }}>
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
              select
              value={selectedCategory}
              onChange={handleCategoryChange}
              fullWidth
              variant="standard"
              sx={{
                '& .MuiInputBase-root': { color: 'white' },
                '& .MuiSelect-select': { color: 'white' },
                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                '& .MuiSelect-icon': { color: 'white' },
                ml: 0.5,
              }}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              {customCategory && (
                <MenuItem value={customCategory}>{customCategory}</MenuItem>
              )}
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
                {lecture.title}
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
                <Typography variant="body2" sx={{ ml: 3 }}>
                    {lecture.title}
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
                    mx: 3,
                    maxHeight: '100px',
                    overflowY: 'auto',
                    padding: '8px',
                    border: '1px solid #ccc',
                    }}
                >
                    <Typography variant="body2">
                    {lecture.content || 'Sin contenido disponible'}
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
                <Typography variant="body2" sx={{ ml: 3 }}>
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
                        {index + 1}. {question.pregunta}
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
    const { cursos, setCursos } = useContext(CursosContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Verificar si el curso existe
    const course = cursos?.[courseId];
    const courseLessons = course?.lecciones || [];

    // Estados
    const [lessonExpanded, setLessonExpanded] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingContent, setEditingContent] = useState('');
    const [newLesson, setNewLesson] = useState({ title: '', content: '' });
    const [openQuestions, setOpenQuestions] = useState(false);
    const [currentLecture, setCurrentLecture] = useState(null);
    const [editedName, setEditedName] = useState(course?.nombre || '');
    const [editedDescription, setEditedDescription] = useState(course?.descripcion || '');

    const handleSaveName = () => {
        const updatedCursos = { ...cursos };
        updatedCursos[courseId].nombre = editedName;
        setCursos(updatedCursos);
    };

    const handleSaveDescription = () => {
        const updatedCursos = { ...cursos };
        updatedCursos[courseId].descripcion = editedDescription;
        setCursos(updatedCursos);
    };

    const handleOpenQuestions = (lecture) => {
        setCurrentLecture(lecture);
        setOpenQuestions(true);
    };

    const handleCloseQuestions = () => {
        setOpenQuestions(false);
        setCurrentLecture(null);
    };

    const handleSaveQuestions = (updatedQuestions) => {
        const updatedCursos = { ...cursos };
        const lectureIndex = updatedCursos[courseId].lecciones.findIndex(
            (l) => l.title === currentLecture.title
        );
        if (lectureIndex !== -1) {
            updatedCursos[courseId].lecciones[lectureIndex].questions = updatedQuestions;
            setCursos(updatedCursos);
        }
        handleCloseQuestions();
    };

    const handleLessonChange = (panel) => (event, isExpanded) => {
        setLessonExpanded(isExpanded ? panel : false);
    };

    const handleOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
        setNewLesson({ title: '', content: '' });
    };

    const handleAddLesson = () => {
        const updatedCursos = { ...cursos };
        if (!updatedCursos[courseId].lecciones) {
            updatedCursos[courseId].lecciones = [];
        }
        updatedCursos[courseId].lecciones.push(newLesson);
        setCursos(updatedCursos);
        handleCloseAdd();
    };

    const handleOpenEdit = (lesson, index) => {
        setEditingIndex(index);
        setEditingTitle(lesson.title);
        setEditingContent(lesson.content);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setEditingIndex(null);
        setEditingTitle('');
        setEditingContent('');
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            const updatedCursos = { ...cursos };
            updatedCursos[courseId].lecciones[editingIndex] = {
                title: editingTitle,
                content: editingContent,
            };
            setCursos(updatedCursos);
        }
        handleCloseEdit();
    };

    if (!course) {
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
          {/* Breadcrumbs */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <LinkComp underline="hover" color="inherit" component={Link} to="/dashboard">
              Inicio
            </LinkComp>
            <Typography color="text.primary">{course?.nombre}</Typography>
          </Breadcrumbs>
          <Box sx={{ backgroundColor: '#0c1633', borderRadius: '20px' }}>
            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={3}
              justifyContent="space-between"
              sx={{ px: 7, pt: 7 }}
            >
              <Box {...(!isMobile ? { flex: 3 } : {})} sx={{ mt: 2 }}>
               {/* Nombre del curso */}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', position: 'relative', py: 1 }}
                >
                  <EditIcon sx={{ color: 'white', fontSize: 30, mr: 1, my: 0.5 }} />
                  <TextField
                    variant="standard"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={handleSaveName}
                    inputRef={(input) => {
                      if (input) {
                          input.onmouseenter = () => input.focus(); // Hace focus al pasar el cursor
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          handleSaveName();
                          e.target.blur(); // Quita el focus del input
                          e.preventDefault(); // Evita el comportamiento predeterminado del Enter
                      }
                    }}
                    InputProps={{
                      style: { color: 'white', fontSize: '3rem' }, // Aumentar el tamaño de la fuente
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'none',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'white',
                      },
                    }}
                  />
                </Box>

                {/* Descripción del curso */}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', position: 'relative', pb: 2 }}
                >
                  <EditIcon sx={{ color: 'white', fontSize: 30, mr: 1, my: 0.5 }} />
                  <TextField
                    variant="standard"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    onBlur={handleSaveDescription}
                    fullWidth
                    placeholder="Agrega descripción del curso"
                    inputRef={(input) => {
                      if (input) {
                        input.onmouseenter = () => input.focus(); // Hace focus al pasar el cursor
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveDescription();
                        e.target.blur(); // Quita el focus del input
                        e.preventDefault(); // Evita el comportamiento predeterminado del Enter
                      }
                    }}
                    InputProps={{
                      style: { color: 'white', fontSize: '1rem' }, // Aumentar el tamaño de la fuente
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'none',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'white',
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
                <CourseDetailsList courseLessons={courseLessons} course={course} />
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
            {courseLessons.length === 0 ? (
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  No hay lecciones disponibles.
                </Typography>
              </Box>
            ) : (
              courseLessons.map((lecture, index) => (
                <LessonAccordion
                  key={index}
                  lecture={lecture}
                  panel={`panel-${index}`}
                  expanded={lessonExpanded}
                  handleChange={handleLessonChange}
                  handleOpenEdit={() => handleOpenEdit(lecture, index)} // Pasar índice
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
                value={newLesson.title}
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                label="Contenido de la lección"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={newLesson.content}
                onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
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
                rows={4}
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                  Guardar
                </Button>
              </Box>
            </DialogContent>
          </Dialog>

          {/* Pop-up para agregar/editar preguntas */}
          <Dialog open={openQuestions} onClose={handleCloseQuestions} maxWidth="md" fullWidth>
            <DialogTitle>Preguntas de Evaluación</DialogTitle>
            <DialogContent>
              {/* Acordeón para mostrar y editar preguntas */}
              {currentLecture?.questions?.map((question, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <TextField
                      label="Pregunta"
                      variant="outlined"
                      fullWidth
                      value={question.pregunta}
                      onChange={(e) => {
                        const updatedQuestions = [...currentLecture.questions];
                        updatedQuestions[index].pregunta = e.target.value;
                        setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
                      }}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    {question.opciones.map((opcion, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={opcion.correcta}
                              onChange={() => {
                                const updatedQuestions = [...currentLecture.questions];
                                updatedQuestions[index].opciones = updatedQuestions[index].opciones.map((opt, optIndex) => ({
                                  ...opt,
                                  correcta: optIndex === i,
                                }));
                                setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
                              }}
                            />
                          }
                          label=""
                        />
                        <TextField
                          label={`Opción ${i + 1}`}
                          variant="outlined"
                          fullWidth
                          value={opcion.texto}
                          onChange={(e) => {
                            const updatedQuestions = [...currentLecture.questions];
                            updatedQuestions[index].opciones[i].texto = e.target.value;
                            setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
                          }}
                          sx={{ mr: 2 }}
                        />
                        <IconButton
                          color="error"
                          onClick={() => {
                            const updatedQuestions = [...currentLecture.questions];
                            updatedQuestions[index].opciones = updatedQuestions[index].opciones.filter((_, optIndex) => optIndex !== i);
                            setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    ))}
                    {/* Botón para agregar una nueva opción */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          const updatedQuestions = [...currentLecture.questions];
                          updatedQuestions[index].opciones.push({ texto: '', correcta: false });
                          setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
                        }}
                      >
                        Agregar Opción
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}

              {/* Botón para guardar todas las preguntas */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const updatedQuestions = currentLecture?.questions || [];
                      updatedQuestions.push({ pregunta: '', opciones: [{ texto: '', correcta: false }, { texto: '', correcta: false }] });
                      setCurrentLecture({ ...currentLecture, questions: updatedQuestions });
                    }}
                  >
                    Agregar Pregunta
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleSaveQuestions(currentLecture.questions)}>
                  Guardar
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    );
  }
  
  export default Courses;