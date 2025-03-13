import React, { useState } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, LinearProgress, Typography } from '@mui/material';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

const CUSTOM_COLOR = '#FFB300';

const menuItems = [
    { text: 'Panel', icon: <CoPresentOutlinedIcon /> },
    { text: 'Aprender', icon: <SchoolOutlinedIcon /> },
    { text: 'Liga', icon: <ShieldOutlinedIcon /> },
    { text: 'Practicar', icon: <RocketLaunchOutlinedIcon /> }
];

function Sidebar() {
    const [selectedItem, setSelectedItem] = useState('Panel');

    return (
        <Box component="nav">
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        width: '300px',
                        boxSizing: 'border-box',
                        position: 'static',
                        mt: 2
                    }
                }}
            >
                <Divider/>
                <List>
                    {menuItems.map(({ text, icon }) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={() => setSelectedItem(text)}
                                sx={{
                                    bgcolor: selectedItem === text ? `${CUSTOM_COLOR}40` : 'transparent',
                                    boxShadow: selectedItem === text ? 'inset 0 0 5px rgba(0,0,0,0.1)' : 'none',
                                    '&:hover': {
                                        bgcolor: `${CUSTOM_COLOR}40`,
                                        '& .MuiListItemText-primary': {
                                            color: CUSTOM_COLOR,
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: CUSTOM_COLOR,
                                        }
                                    },
                                    transition: 'all 0.3s ease',
                                    '& .MuiListItemText-primary': {
                                        color: selectedItem === text ? CUSTOM_COLOR : 'inherit',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: selectedItem === text ? CUSTOM_COLOR : 'inherit',
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Box p={2}>
                    <LinearProgress 
                        variant="determinate" 
                        value={20} 
                        sx={{ 
                            height: '20px',
                            borderRadius: '10px',
                            backgroundColor: `${CUSTOM_COLOR}40`,
                            '& .MuiLinearProgress-bar': {
                                borderRadius: '10px',
                                backgroundColor: CUSTOM_COLOR
                            }
                        }} 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Progreso del curso actual: 20%
                    </Typography>
                </Box>
                <Divider />
            </Drawer>
        </Box>
    );
}

export default Sidebar;