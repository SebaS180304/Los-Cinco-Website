import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Homecontent from '../components/HomeContent';
import { Box, Container } from '@mui/material';

function Home() {
    return ( 
        <Box sx={{ display: 'flex', mt: '64px' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, display: 'flex', p: 3 }}>
                <Sidebar />
                <Homecontent />
            </Box>
        </Box>
     );
}

export default Home;