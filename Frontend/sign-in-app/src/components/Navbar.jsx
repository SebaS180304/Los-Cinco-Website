import React from 'react';
import logoA from '../assets/images/logoA.png';
import { AppBar, Toolbar, Divider, Box, Button, Tooltip, Menu, Typography, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const settings = ['Cerrar Sesión'];

function Navbar() {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
        <AppBar position='fixed' sx={{ background: 'white', boxShadow: 'none' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Link to='/learn'>
                        <img src={logoA} alt='Whirlpool logo' style={{ height: '40px' }} />
                    </Link>
                    <Typography variant='h6' component={Link} to='/learn' sx={{ ml: 2, textDecoration: 'none', color: 'black' }}>
                       Inicio 
                    </Typography>
                </Box>
                <Box>
                    <Tooltip title="Abrir Configuración" arrow>
                        <Button startIcon={<PermIdentityOutlinedIcon />} 
                            variant="contained" sx={{ bgcolor: '#FFB300' }} 
                            onClick={handleOpenUserMenu}>
                                Usuario
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
            <Divider sx={{ backgroundColor: 'black'}} />
        </AppBar>
     );
}

export default Navbar;