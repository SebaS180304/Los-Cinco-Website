import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PanelContent from '../components/PanelContent';
import LearnContent from '../components/LearnContent';
import LeagueContent from '../components/LeagueContent';
import PracticeContent from '../components/PracticeContent';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import LearnBottBar from '../components/LearnBottBar';
import axios from '../api/axios';

const RECENT_URL = '/CursoEstudiante/Recent';
const COURSES_URL = '/CursoEstudiante/All';

function Learn() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedTab, setSelectedTab] = useState('Panel');
    const [recentCourse, setRecentCourse] = useState(null);
    const [allCourses, setAllCourses] = useState(null);

    useEffect(() => {
        const fetchRecentCourse = async () => {
            try {
                const response = await axios.get(RECENT_URL, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setRecentCourse(response.data);
            } catch (error) {
                console.error('Error al obtener el curso más reciente: ', error.message);
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
            }
        };

        fetchRecentCourse();
        fetchAllCourses();
    }, []);

    const renderContent = () => {
        switch (selectedTab) {
            // Aquí se usan los datos de la API (recentCourse) para afectar a PanelContent/CourseCard
            // También se usan los datos de la API (allCourses) para afectar a PanelContent/ProgressCharts tanto a QuizProgressChart como a CourseProgressChart
            case 'Panel': return <PanelContent onVerAprender={() => setSelectedTab('Aprender')} course={allCourses} recentCourse={recentCourse} />;
            // Aquí se usan los datos de la API (allCourses) para afectar a LearnContent/ tanto a LearnCourseCard como a CourseAccordion
            case 'Aprender': return <LearnContent course={allCourses} />;
            case 'Liga': return <LeagueContent />;
            case 'Practicar': return <PracticeContent />;
            default: return <PanelContent onVerAprender={() => setSelectedTab('Aprender')} course={allCourses} recentCourse={recentCourse} />;
        }
    };

    // Si aún no se cargó la data de las APIs, muestra un loader
    if (!recentCourse && !allCourses) return <div>Cargando...</div>;

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