import React from 'react';
import Lectbar from '../components/LectBar';
import { Box, Stack } from '@mui/material';
import Model from '../components/Model';
import Content from '../components/Content';
import Bottombar from '../components/Bottombar';

function Lecture() {
    return ( 
        <div>
            <Lectbar />
            <Box sx={{ mt: 9}}>
                <Stack direction="row" spacing={2} justifyContent={'space-between'}>
                    <Content />
                    <Model />
                </Stack>
            </Box>
            <Bottombar />
        </div>
     );
}

export default Lecture;