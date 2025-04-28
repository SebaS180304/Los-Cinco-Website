import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PanelContent from '../components/PanelContent';
import LearnContent from '../components/LearnContent';
import LeagueContent from '../components/LeagueContent';
import PracticeContent from '../components/PracticeContent';
import { Box, CircularProgress, Dialog, Typography, useMediaQuery, useTheme } from '@mui/material';
import LearnBottBar from '../components/LearnBottBar';
import axios from '../api/axios';

const RECENT_URL = '/CursoEstudiante/Recent';
const COURSES_URL = '/CursoEstudiante/All';
const WEEK_URL = 'CursoEstudiante/Estadisticas'

const CUSTOM_COLOR = '#FFB300';

function Learn() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [selectedTab, setSelectedTab] = useState('Panel');

    const [recentCourse, setRecentCourse] = useState(null);
    const [allCourses, setAllCourses] = useState(null);
    const [weekProgress, setWeekProgress] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentCourse = async () => {
            try {
                setLoading(true);
                const response = await axios.get(RECENT_URL, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setRecentCourse(response.data);
            } catch (error) {
                console.error('Error al obtener el curso más reciente: ', error.message);
            } finally {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            }
        };

        const fetchAllCourses = async () => {
            try {
                const response = await axios.get(COURSES_URL, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setAllCourses(response.data);
            } catch (error) {
                console.error('Error al obtener la información del curso: ', error.message);
            } finally {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            }
        };

        const fetchWeekProgress = async () => {
            try {
                const response = await axios.get(WEEK_URL, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setWeekProgress(response.data.estadisticas);
            } catch (error) {
                console.error('Error al obtener el progreso semanal: ', error.message);
            } finally {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            }
        }
        fetchRecentCourse();
        fetchAllCourses();
        fetchWeekProgress();
    }, []);

    const renderContent = () => {
        switch (selectedTab) {
            // Aquí se usan los datos de la API (recentCourse) para afectar a PanelContent/CourseCard
            // También se usan los datos de la API (allCourses) para afectar a PanelContent/ProgressCharts tanto a QuizProgressChart como a CourseProgressChart
            // También se usan los datos de la API (weekProgress) para afectar a PanelContent/ProgressCharts/WeekProgressChart
            case 'Panel': return <PanelContent onVerAprender={() => setSelectedTab('Aprender')} course={allCourses} recentCourse={recentCourse} weekProgress={weekProgress} />;
            // Aquí se usan los datos de la API (allCourses) para afectar a LearnContent/ tanto a LearnCourseCard como a CourseAccordion
            case 'Aprender': return <LearnContent course={allCourses} />;
            case 'Liga': return <LeagueContent />;
            case 'Practicar': return <PracticeContent />;
            default: return <PanelContent onVerAprender={() => setSelectedTab('Aprender')} course={allCourses} recentCourse={recentCourse} weekProgress={weekProgress} />;
        }
    };

    // Si aún no se cargó la información de los endopoints, mostrar un loader
    if (loading) {
      return (
          <Dialog open={true} PaperProps={{ sx: { textAlign: 'center', padding: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: CUSTOM_COLOR }} />
              </Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                  Cargando Información...
              </Typography>
          </Dialog>
      );
    }

    return ( 
        <Box sx={{ display: 'flex', mt: '64px' }}>
            <Navbar />
            {isMobile ? (
                <Box component="main" sx={{ flexGrow: 1, display: 'flex', pb: 7 }}>
                    {renderContent()}
                    <LearnBottBar selectedTab={selectedTab} onChange={setSelectedTab} />
                </Box>
            ) : (
                <Box component="main" sx={{ flexGrow: 1, display: 'flex', ml: '300px' }}>
                    { /* Aquí se usan los datos de la API (recentCourse) para afectar a Sidebar */}
                    <Sidebar selectedTab={selectedTab} onChange={setSelectedTab} course={recentCourse} />
                    {renderContent()}
                </Box>
            )}
        </Box>
    );
}

export default Learn;