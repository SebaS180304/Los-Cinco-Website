import React, { useState, useEffect } from 'react';
import Lectbar from '../components/LectBar';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import Media from '../components/Media';
import Content from '../components/Content';
import Bottombar from '../components/Bottombar';
import { lecture_data } from '../components/constants';
import { useParams } from 'react-router-dom';

function Lecture() {
    const { id } = useParams();
    const lessonId = Number(id);
    const initialIndex = lecture_data.findIndex((lec) => lec.id === lessonId);
    const [currentLectureIndex, setCurrentLectureIndex] = useState(
        initialIndex >= 0 ? initialIndex : 0
    );

    const [selectedView, setSelectedView] = useState('content');

    const lecture = lecture_data[currentLectureIndex];

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
                mode='lesson' 
            />
            <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {isMobile ? (
                    selectedView === 'content' ? 
                        <Content currentLecture={currentLectureIndex} /> :
                        <Media mediaType={lecture.mediaType} src={lecture.src} />
                ) : (
                    <Stack direction="row" justifyContent={'space-between'}>
                        <Content currentLecture={currentLectureIndex} />
                        <Media mediaType={lecture.mediaType} src={lecture.src} />
                    </Stack>
                )}
            </Box>
            {/* BottomBar en modo lesson */}
            <Bottombar 
                mode="lesson" 
                currentLectureIndex={currentLectureIndex} 
                setCurrentLectureIndex={setCurrentLectureIndex} 
                quizCompleted={false} 
            />
        </Box>
    );
}

export default Lecture;