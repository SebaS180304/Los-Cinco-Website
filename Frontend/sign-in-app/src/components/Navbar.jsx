import React from 'react';
import logoA from '../assets/logoA.png';
import { AppBar, Toolbar, Container, Box, Button, Tooltip, Menu, Typography, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const pages = [
    { name: 'home', path: '/' },
    { name: 'learn', path: '/learn' },
    { name: 'lecture', path: '/lecture' },
    { name: 'login', path: '/login' }
];

const settings = ['Logout'];

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
        navigate('/login');
    };

    return ( 
        <AppBar position='static' color="transparent" sx={{ border: '1px solid white' }}>
            <Container maxWidth='xl'>
                <Toolbar>
                    <Link to='/'>
                        <img src={logoA} alt='Whirlpool logo' style={{ height: '50px' }} />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }} >
                        {pages.map((page) => (
                            <Button key={page.name} sx={{ my: 2, color: 'black', display: 'block' }} 
                                component={Link} to={page.path}>
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box>
                        <Tooltip title="Open Settings" arrow>
                            <Button startIcon={<PermIdentityOutlinedIcon />} 
                                variant="contained" color="warning" 
                                onClick={handleOpenUserMenu}>
                                    Juan Perez
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
            </Container>
        </AppBar>
     );
}

export default Navbar;