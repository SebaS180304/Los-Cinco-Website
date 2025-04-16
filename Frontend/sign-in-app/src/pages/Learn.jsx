import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PanelContent from '../components/PanelContent';
import LearnContent from '../components/LearnContent';
import LeagueContent from '../components/LeagueContent';
import PracticeContent from '../components/PracticeContent';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import LearnBottBar from '../components/LearnBottBar';
import { course_data } from '../components/constants';

function Learn() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedTab, setSelectedTab] = useState('Panel');

    const renderContent = () => {
        switch (selectedTab) {
            case 'Panel': return <PanelContent onVerAprender={() => setSelectedTab('Aprender')} course={course_data} />;
            case 'Aprender': return <LearnContent course={course_data} />;
            case 'Liga': return <LeagueContent />;
            case 'Practicar': return <PracticeContent />;
            default: return <PanelContent onVerAprender={() => setSelectedTab('Aprender')} course={course_data} />;
        }
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
                    <Sidebar selectedTab={selectedTab} onChange={setSelectedTab} course={course_data} />
                    {renderContent()}
                </Box>
            )}
        </Box>
    );
}

export default Learn;