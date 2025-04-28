import React from 'react';
import { Box, Divider, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import categoryMapping from './constants/categoryMapping';

const CUSTOM_COLOR = '#FFB300';

const CourseDetails = ({ courseLessons, course }) => {
    const details = [
        { icon: <LibraryBooksOutlinedIcon />, label: 'Lecciones', value: courseLessons.length },
        { 
            icon: <CategoryOutlinedIcon />, 
            label: 'Categoría', 
            value: course ? (categoryMapping[course.categoria] || "Indefinida") : "Indefinida" 
        },
    ];

    return (
        <Box sx={{ pb: 2 }}>
            <List>
                {details.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem sx={{ p: 2 }}>
                            <ListItemIcon sx={{ color: CUSTOM_COLOR }}>
                                {item.icon}
                            </ListItemIcon>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                                {item.label}: <strong>{item.value}</strong>
                            </Typography>
                        </ListItem>
                        {index < details.length - 1 && <Divider sx={{ backgroundColor: 'white' }} />}
                    </React.Fragment>
                ))}
                <Divider sx={{ backgroundColor: 'white' }} />
            </List>
        </Box>
    );
};

export default CourseDetails;