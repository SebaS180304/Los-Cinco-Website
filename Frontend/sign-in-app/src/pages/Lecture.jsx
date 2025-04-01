import React, { useState } from 'react';
import Lectbar from '../components/LectBar';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import Model from '../components/Model';
import Content from '../components/Content';
import Bottombar from '../components/Bottombar';

function Lecture() {
    const [currentLecture, setCurrentLecture] = useState(0);
    const [selectedView, setSelectedView] = useState('content');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ display: 'flex', mt: '64px', mb: '64px'}}>
            <Lectbar selectedView={selectedView} setSelectedView={setSelectedView} />
            <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {isMobile ? (
                    selectedView === 'content' ? 
                        <Content currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} /> :
                        <Model />
                ) : (
                    <Stack direction="row" justifyContent={'space-between'}>
                        <Content currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} />
                        <Model />
                    </Stack>
                )}
            </Box>
            <Bottombar currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} />
        </Box>
    );
}

export default Lecture;