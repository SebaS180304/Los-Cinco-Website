import React, { useState } from 'react';
import Lectbar from '../components/LectBar';
import { Box, Stack } from '@mui/material';
import Media from '../components/Media';
import Content from '../components/Content';
import Bottombar from '../components/Bottombar';
import { lecture_data } from '../components/constants';

function Lecture() {
    const [currentLecture, setCurrentLecture] = useState(0);
    const lecture = lecture_data[currentLecture];

    return ( 
        <div>
            <Lectbar />
            <Box sx={{ mt: 9}}>
                <Stack direction="row" justifyContent={'space-between'}>
                    <Content currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} />
                    <Media mediaType={lecture.mediaType} src={lecture.src} />
                </Stack>
            </Box>
            <Bottombar currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} />
        </div>
     );
}

export default Lecture;