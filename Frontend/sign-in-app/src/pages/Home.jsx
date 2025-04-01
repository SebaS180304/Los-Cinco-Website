import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Homecontent from '../components/HomeContent';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import HomeBottBar from '../components/HomeBottBar';

function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return ( 
        <Box sx={{ display: 'flex', mt: '64px' }}>
            <Navbar />
            {isMobile ? (
                <Box component="main" sx={{ flexGrow: 1, display: 'flex', pb: 7 }}>
                    <Homecontent />
                    <HomeBottBar />
                </Box>
            ) : (
                <Box component="main" sx={{ flexGrow: 1, display: 'flex', p: 3 }}>
                    <Sidebar />
                    <Homecontent />
                </Box>
            )}
        </Box>
     );
}

export default Home;