import React from 'react';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { BottomNavigationAction, BottomNavigation, Box, Divider } from '@mui/material';

const menuItems = [
    { text: 'Panel', icon: <CoPresentOutlinedIcon /> },
    { text: 'Aprender', icon: <SchoolOutlinedIcon /> },
];

function LearnBottBar({ selectedTab, onChange }) {
  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
        <Divider sx={{ backgroundColor: 'black' }} />
        <BottomNavigation 
            showLabels 
            value={selectedTab} 
            onChange={(event, newValue) => onChange(newValue)}
        >
            {menuItems.map((item) => (
                <BottomNavigationAction
                    key={item.text}
                    label={item.text}
                    value={item.text}
                    icon={item.icon}
                    sx={{
                        '&.Mui-selected': { color: '#FFB300' }
                    }}
                />
            ))}
        </BottomNavigation>
    </Box>
  );
}

export default LearnBottBar;
