import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Agregar contenido', icon: <AddBoxIcon />, path: '/add-content' },
    { text: 'Modificar estudiantes', icon: <EditIcon />, path: '/edit-students' },
    { text: 'Modificar cursos', icon: <EditIcon />, path: '/edit-courses' },
    { text: 'Estadísticas Estudiantes', icon: <BarChartIcon />, path: '/student-stats' },
    { text: 'Vista de alumno', icon: <VisibilityIcon />, path: '/student-view' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', mt: '75px' }, // Ajusta el margen superior
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            sx={{
              backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;