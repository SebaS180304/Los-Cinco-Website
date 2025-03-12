import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Homecontent() {
    return ( 
        <Container maxWidth='xl'>
            <Box p={5}>
                <Typography variant="h4" component="h1" sx={{fontWeight: 'bold'}}>
                    Keep Learning
                </Typography>

            </Box>
        </Container>
     );
}

export default Homecontent;