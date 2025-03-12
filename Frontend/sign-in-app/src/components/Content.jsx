import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import React from 'react';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { lecture_data } from './constants';

function Content({ currentLecture}) {
    const lecture = lecture_data[currentLecture];

    return ( 
        <Box bgcolor={'#101626'} flex={1} sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 144px)', overflow: 'hidden' }}>
            <AppBar position="static" sx={{ backgroundColor: '#273661'}}>
                <Container>
                    <Toolbar>
                        <LocalLibraryOutlinedIcon sx={{fontSize: 40}} />
                        <Typography component="div" sx={{ ml: 2, fontWeight:'bold' }}>
                            Aprendiendo
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="main" sx={{ p: 5, overflow: 'auto' }}>
                <Typography variant="h6" color="#CECACA" sx={{ mb: 3, textTransform: 'uppercase' }}>
                    {lecture.title}
                </Typography>
                <Typography color="white" variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                    {lecture.subtitle}
                </Typography>
                <Typography color="white" sx={{ textAlign: 'justify', lineHeight: 2 }}
                    dangerouslySetInnerHTML={{ __html: lecture.content }}>
                </Typography>
            </Box>
        </Box>
     );
}

export default Content;