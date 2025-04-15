import React, { useState, useEffect } from 'react';
import Lectbar from '../components/LectBar';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import Media from '../components/Media';
import Content from '../components/Content';
import Bottombar from '../components/Bottombar';
import { lecture_data } from '../components/constants';

function Lecture() {
    const [currentLecture, setCurrentLecture] = useState(0);
    const [selectedView, setSelectedView] = useState('content');
    const lecture = lecture_data[currentLecture];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const disableMedia = lecture.mediaType === 'none' || lecture.src === '';

    useEffect(() => {
        if (disableMedia && selectedView === 'model') {
            setSelectedView('content');
        }
    }, [disableMedia, selectedView]);

    return (
        <Box sx={{ display: 'flex', mt: '64px', mb: '64px'}}>
            <Lectbar 
                selectedView={selectedView} 
                setSelectedView={setSelectedView} 
                disableMedia={disableMedia} 
            />
            <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {isMobile ? (
                    selectedView === 'content' ? 
                        <Content currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} /> :
                        <Media mediaType={lecture.mediaType} src={lecture.src} />
                ) : (
                    <Stack direction="row" justifyContent={'space-between'}>
                        <Content currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} />
                        <Media mediaType={lecture.mediaType} src={lecture.src} />
                    </Stack>
                )}
            </Box>
            <Bottombar currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} />
        </Box>
    );
}

export default Lecture;