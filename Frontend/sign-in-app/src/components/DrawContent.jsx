import { Accordion, AccordionSummary, AccordionDetails, Box, IconButton, Typography, List, ListItem, Divider } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { lecture_data } from './constants';

function Drawcontent({ onClose }) {
    const groupedLectures = lecture_data.reduce((acc, lecture) => {
        if (!acc[lecture.title]) {
            acc[lecture.title] = [];
        }
        acc[lecture.title].push(lecture);
        return acc;
    }, {});

    return ( 
        <Box bgcolor="#101626" p={2} sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="h6" color="white" sx={{ p: 2, textTransform: 'uppercase', fontWeight: 'bold' }}>
                    Nombre del Curso
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon style={{ color: 'white', fontSize: 40}} />
                </IconButton>
            </Box>
            
            {Object.entries(groupedLectures).map(([title, lectures]) => (
                <Accordion 
                    key={title}
                    sx={{
                        backgroundColor: '#1e2738',
                        color: 'white',
                        '& .MuiAccordionSummary-expandIconWrapper': {
                            color: 'white'
                        }
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-${title}-content`}
                        id={`panel-${title}-header`}
                    >
                        <Typography>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List sx={{ width: '100%' }}>
                            {lectures.map((lecture, index) => (
                                <React.Fragment key={lecture.id}>
                                    <ListItem>
                                        <Typography color="white">{lecture.subtitle}</Typography>
                                    </ListItem>
                                    {index < lectures.length - 1 && (
                                        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
                                    )}
                                </React.Fragment>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
     );
}

export default Drawcontent;