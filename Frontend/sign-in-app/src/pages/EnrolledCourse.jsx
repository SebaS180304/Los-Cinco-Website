import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../components/Navbar';
import { course_data, lecture_data } from '../components/constants';
import ProgressSection from '../components/ProgressSection';
import LessonAccordion from '../components/LessonAccordion';
import CourseHeader from '../components/CourseHeader';

const EnrolledCourse = () => {
    const { courseId } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [lessonExpanded, setLessonExpanded] = useState(false);

    const course = course_data.find(c => c.id === parseInt(courseId));
    const courseLessons = lecture_data.filter(lecture => lecture.course === course?.title);

    const handleLessonChange = (panel) => (event, isExpanded) => {
        setLessonExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ display: 'flex', mt: '64px' }}>
            <Navbar />
            <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box sx={{ backgroundColor: '#0c1633', borderRadius: '20px' }}>
                    <CourseHeader course={course} courseLessons={courseLessons} isMobile={isMobile} />
                    <Box sx={{ pt: 3 }}>
                        <ProgressSection course={course} courseLessons={courseLessons} isMobile={isMobile} />
                    </Box>
                </Box>
                <Box sx={{ pt: 7 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Contenido del Curso
                    </Typography>
                    {courseLessons.map(lecture => (
                        <LessonAccordion 
                            key={lecture.id}
                            lecture={lecture}
                            panel={`panel-${lecture.id}`}
                            expanded={lessonExpanded}
                            handleChange={handleLessonChange}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default EnrolledCourse;