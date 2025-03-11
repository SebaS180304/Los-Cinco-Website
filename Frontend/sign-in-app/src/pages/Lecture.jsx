import React, { useState } from 'react';
import Lectbar from '../components/LectBar';
import { Box, Stack } from '@mui/material';
import Model from '../components/Model';
import Content from '../components/Content';
import Bottombar from '../components/Bottombar';

function Lecture() {
    const [currentLecture, setCurrentLecture] = useState(0);

    return ( 
        <div>
            <Lectbar />
            <Box sx={{ mt: 9}}>
                <Stack direction="row" spacing={2} justifyContent={'space-between'}>
                    <Content currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} />
                    <Model />
                </Stack>
            </Box>
            <Bottombar currentLecture={currentLecture} setCurrentLecture={setCurrentLecture} />
        </div>
     );
}

export default Lecture;