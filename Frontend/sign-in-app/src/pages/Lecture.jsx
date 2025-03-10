import React from 'react';
import Lectbar from '../components/LectBar';
import { Box, Stack } from '@mui/material';
import Model from '../components/Model';
import Content from '../components/Content';
import Bottombar from '../components/Bottombar';

function Lecture() {
    return ( 
        <div style={{ backgroundColor: '#060E25', height: '100vh' }}>
            <Lectbar />
            <Box>
                <Stack direction="row" spacing={2} justifyContent={'space-evenly'}>
                    <Model />
                    <Content />
                </Stack>
            </Box>
            <Bottombar />
        </div>
     );
}

export default Lecture;