import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Homecontent from '../components/HomeContent';
import { Box, Container } from '@mui/material';

function Home() {
    return ( 
        <Box>
            <Navbar />
            <Container maxWidth='xl'>
                <Box sx={{ display: 'flex', gap: 2}}>
                    <Sidebar />
                    <Homecontent />
                </Box>
            </Container>
        </Box>
     );
}

export default Home;