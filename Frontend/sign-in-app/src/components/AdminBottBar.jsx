import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Divider } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
    { text: 'Cursos', icon: <DashboardOutlinedIcon />, path: '/dashboard' },
    { text: 'Alumnos', icon: <GroupOutlinedIcon />, path: '/students' },
];

function AdminBottBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
            <Divider sx={{ backgroundColor: 'black' }} />
            <BottomNavigation
                showLabels
                value={location.pathname} // Sincroniza con la ruta actual
                onChange={(event, newValue) => handleNavigation(newValue)}
            >
                {menuItems.map((item) => (
                    <BottomNavigationAction
                        key={item.text}
                        label={item.text}
                        value={item.path} // Usa la ruta como valor
                        icon={item.icon}
                        sx={{
                            '&.Mui-selected': { color: '#FFB300' },
                        }}
                    />
                ))}
            </BottomNavigation>
        </Box>
    );
}

export default AdminBottBar;