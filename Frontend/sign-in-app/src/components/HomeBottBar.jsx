import React, { useState } from 'react'
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { Paper, BottomNavigationAction, BottomNavigation, Box, Divider } from '@mui/material';

const menuItems = [
    { text: 'Panel', icon: <CoPresentOutlinedIcon /> },
    { text: 'Aprender', icon: <SchoolOutlinedIcon /> },
    { text: 'Liga', icon: <ShieldOutlinedIcon /> },
    { text: 'Practicar', icon: <RocketLaunchOutlinedIcon /> }
];

function HomeBottBar() {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{width: '100%', position: 'fixed', bottom: 0}}>
        <Divider sx={{ backgroundColor: 'black'}} />
        <BottomNavigation showLabels value={value} onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            {menuItems.map((item) => (
                <BottomNavigationAction
                    key={item.text}
                    label={item.text}
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

export default HomeBottBar;
