import React from 'react';
import logoA from '../assets/logo-c.png';
import logo from '../assets/logo.png';
import { AppBar, Toolbar, Box, ButtonGroup, Button, Tooltip, Menu, Typography, MenuItem, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Drawcontent from './DrawContent';

const settings = ['Cerrar Sesión'];

function Lectbar({ selectedView, setSelectedView }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        navigate('/');
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar position='fixed' sx={{ backgroundColor: 'black', boxShadow: 'none', height: '64px' }}>
            {isMobile ? (
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link to='/learn'>
                            <img src={logoA} alt='Whirlpool logo' style={{ height: '40px' }} />
                        </Link>
                    </Box>
                    <ButtonGroup>
                        <Button 
                            onClick={() => setSelectedView('model')}
                            variant={selectedView === 'model' ? 'contained' : 'outlined'}
                            sx={{
                                color: selectedView === 'model' ? 'black' : '#FFB300',
                                backgroundColor: selectedView === 'model' ? '#FFB300' : 'transparent',
                                border: '2px solid #FFB300'
                            }}
                        >
                            Media
                        </Button>
                        <Button 
                            onClick={() => setSelectedView('content')}
                            variant={selectedView === 'content' ? 'contained' : 'outlined'}
                            sx={{
                                color: selectedView === 'content' ? 'black' : '#FFB300',
                                backgroundColor: selectedView === 'content' ? '#FFB300' : 'transparent',
                                border: '2px solid #FFB300'
                            }}
                        >
                            Contenido
                        </Button>
                    </ButtonGroup>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={toggleDrawer(true)}>
                            <LibraryBooksIcon sx={{ color: '#FFB300', fontSize: 40 }} />
                        </IconButton>
                        <Drawer 
                            open={open} 
                            onClose={toggleDrawer(false)}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    width: '50vw',
                                    minWidth: '250px',
                                    maxWidth: '500px',
                                    boxSizing: 'border-box',
                                },
                            }}
                        >
                            <Drawcontent onClose={toggleDrawer(false)} />
                        </Drawer>
                        <Tooltip title="Abrir Configuración" arrow>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                                <AccountCircleOutlinedIcon sx={{ color: '#FFB300', fontSize: 40 }}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            ) : (
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Link to='/learn'>
                            <img src={logo} alt='Whirlpool logo' style={{ height: '40px' }} />
                        </Link>
                        <Typography variant='h6' component={Link} to='/learn' sx={{ ml: 2, textDecoration: 'none', color: 'white' }}>
                            Inicio
                        </Typography>
                        <Typography component={Link} onClick={toggleDrawer(true)} sx={{ ml: 2, textDecoration: 'none', color: 'white', fontSize: '20px' }}>
                            Contenidos
                        </Typography>
                        <Drawer 
                            open={open} 
                            onClose={toggleDrawer(false)}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    width: '50vw',
                                    minWidth: '250px',
                                    maxWidth: '500px',
                                    boxSizing: 'border-box',
                                },
                            }}
                        >
                            <Drawcontent onClose={toggleDrawer(false)} />
                        </Drawer>
                    </Box>
                    <Box>
                        <Tooltip title="Abrir Configuración" arrow>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleOutlinedIcon sx={{ color: '#FFB300', fontSize: 40 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            )}
            <Menu sx={{mt: '45px'}} id="user-menu" anchorEl={anchorElUser}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}} keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleLogout}>
                        <Typography sx={{ textAlign: 'center', color: 'black' }}>{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </AppBar>
    );
}

export default Lectbar;