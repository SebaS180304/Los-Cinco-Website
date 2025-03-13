import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Divider, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // Importa la imagen del logo
import { CursosContext } from '../context/GlobalContext'; // Importa el contexto de cursos

const NavbarAdmin = () => {
  const { cursos } = useContext(CursosContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ background: 'white', boxShadow: 'none' }}> {/* Cambia el fondo a blanco */}
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box component="img" src={logo} alt="Logo" sx={{ height: '40px' }} />
            <Typography variant="h6" component={Link} to="/dashboard" sx={{ ml: 2, textDecoration: 'none', color: 'black' }}>
              Inicio
            </Typography>
            <Typography
              variant="h6"
              sx={{ ml: 2, textDecoration: 'none', color: 'black', cursor: 'pointer' }}
              onClick={handleMenuOpen}
            >
              Cursos
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {Object.keys(cursos).length > 0 ? (
                Object.values(cursos).map((curso, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={`/courses/${index}`}
                    onClick={handleMenuClose}
                  >
                    {curso.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No hay cursos</MenuItem>
              )}
            </Menu>
          </Box>
          <Button variant="contained" color="warning" startIcon={<PersonIcon />}>
            Admin
          </Button>
        </Toolbar>
        <Divider sx={{ backgroundColor: 'black' }} />
      </AppBar>
    </>
  );
};

export default NavbarAdmin;