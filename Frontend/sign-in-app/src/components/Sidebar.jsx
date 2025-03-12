import React, { useState } from 'react';
import { Box, Container, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

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
                <List>
                    {menuItems.map(({ text, icon }) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={() => setSelectedItem(text)}
                                sx={{
                                    bgcolor: selectedItem === text ? 'rgba(255, 152, 0, 0.1)' : 'transparent',
                                    boxShadow: selectedItem === text ? 'inset 0 0 5px rgba(0,0,0,0.1)' : 'none',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 152, 0, 0.1)',
                                        '& .MuiListItemText-primary': {
                                            color: 'warning.main',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'warning.main',
                                        }
                                    },
                                    transition: 'all 0.3s ease',
                                    '& .MuiListItemText-primary': {
                                        color: selectedItem === text ? 'warning.main' : 'inherit',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: selectedItem === text ? 'warning.main' : 'inherit',
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
            </Drawer>
        </Box>
    );
}

export default Sidebar;