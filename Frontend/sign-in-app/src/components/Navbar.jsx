import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // Importa la imagen del logo

const Navbar = () => {
  return (
    <>
      <AppBar position="fixed" sx={{ background: 'white', boxShadow: 'none' }}> {/* Cambia el fondo a blanco */}
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box component="img" src={logo} alt="Logo" sx={{ width: '10%', height: '10%' }} />
            <Typography variant="h6" component={Link} to="/" sx={{ ml: 2, textDecoration: 'none', color: 'black' }}>
              Inicio
            </Typography>
            <Typography variant="h6" component={Link} to="/courses" sx={{ ml: 2, textDecoration: 'none', color: 'black' }}>
              Cursos
            </Typography>
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

export default Navbar;