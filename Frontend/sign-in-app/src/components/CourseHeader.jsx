import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';
import CourseDetails from './CourseDetails';

const CUSTOM_COLOR = '#FFB300';

const CourseHeader = ({ course, courseLessons, isMobile }) => {
    const buttonStyles = {
        fontWeight: 'bold',
        color: 'black',
        width: isMobile ? '100%' : '50%',
    };

    return (
        <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={3}
            justifyContent="space-between"
            sx={{ px: 7, pt: 7 }}
        >
            <Box {...(!isMobile ? { flex: 3 } : {})} sx={{ mt: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 2, mb: 2, color: 'white' }}>
                    {course?.tituloCurso}
                </Typography>
                <Typography variant="body1" sx={{ mt: 3, mb: 2, color: 'white' }}>
                    {course?.descripcionCurso}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: 2,
                        mb: 2,
                    }}
                >
                    <Button
                        component={Link}
                        to="/lesson"
                        variant="contained"
                        startIcon={<ArrowForwardIcon />}
                        sx={{
                            ...buttonStyles,
                            backgroundColor: CUSTOM_COLOR,
                            '&:hover': { backgroundColor: `${CUSTOM_COLOR}CC` },
                        }}
                    >
                        Continuar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        href="/manual.pdf"
                        download="manual.pdf"
                        sx={{
                            ...buttonStyles,
                            '&:hover': { backgroundColor: `CC` },
                        }}
                    >
                        Descargar
                    </Button>
                </Box>
            </Box>
            <Box {...(!isMobile ? { flex: 2 } : {})}>
                <CourseDetails courseLessons={courseLessons} course={course} />
            </Box>
        </Stack>
    );
};

export default CourseHeader;