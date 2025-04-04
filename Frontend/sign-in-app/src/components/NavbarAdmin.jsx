import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Box, Button, Tooltip, Menu, Typography, MenuItem, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // Importa la imagen del logo
import { CursosContext } from '../context/GlobalContext'; // Importa el contexto de cursos
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const settings = ['Cerrar Sesión'];

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { cursos } = useContext(CursosContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
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
          <Box>
            <Tooltip title="Abrir Configuración" arrow>
                <Button startIcon={<PermIdentityOutlinedIcon />} 
                    variant="contained" sx={{ bgcolor: '#FFB300' }} 
                    onClick={handleOpenUserMenu}>
                        Admin
                </Button>
            </Tooltip>
            <Menu sx={{mt: '45px'}} id="user-menu" anchorEl={anchorElUser}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}} keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleLogout}>
                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
        <Divider sx={{ backgroundColor: 'black' }} />
      </AppBar>
    </>
  );
};

export default NavbarAdmin;