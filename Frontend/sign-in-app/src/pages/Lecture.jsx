import React, { useState, useEffect } from 'react';
import Lectbar from '../components/LectBar';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import Media from '../components/Media';
import Content from '../components/Content';
import Bottombar from '../components/Bottombar';
import { lecture_data } from '../components/constants';

import Quiz from './quiz';

function Lecture() {
    const [currentLecture, setCurrentLecture] = useState(0);
    const [selectedView, setSelectedView] = useState('content');
    const lecture = lecture_data[currentLecture];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isQuiz = !!lecture.quiz;

    const disableMedia = lecture.mediaType === 'none' || lecture.src === '';

    useEffect(() => {
        if (disableMedia && selectedView === 'model') {
            setSelectedView('content');
        }
    }, [disableMedia, selectedView, isQuiz]);

    return (
        <Box sx={{ display: 'flex', mt: '64px', mb: '64px', width: '100vw', overflowX: 'hidden',backgroundColor: '#0F172A'}}>
            <Lectbar 
                selectedView={selectedView} 
                setSelectedView={setSelectedView} 
                disableMedia={disableMedia} 
            />
            <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {isQuiz ? (
                    <Quiz
                        questions={lecture.quiz}
                        onFinish={() => setCurrentLecture(prev => prev + 1)} // pasa al siguiente tema cuando terminas el quiz
                    />
                ) : isMobile ? (
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
            

            {/* <Bottombar currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} /> */}
            <Bottombar
            currentLecture={currentLecture}
            setCurrentLecture={setCurrentLecture}
            isLast={currentLecture === lecture_data.length - 1}
            hideNavigation={isQuiz}
            />
        </Box>
    );
}

export default Lecture;