import { AppBar, Box, Toolbar, Typography, Button, Container } from '@mui/material';
import React from 'react';

function Bottombar() {
    return ( 
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'black', zIndex: 1100 }}>
            <Container maxWidth='xxl'>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
                            # / # complete
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2}}>
                            <Button color="warning" variant="outlined" sx={{ borderWidth: 2 }}>
                                Back
                            </Button>
                            <Button color="warning" variant="contained">
                                Next
                            </Button>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
     );
}

export default Bottombar;