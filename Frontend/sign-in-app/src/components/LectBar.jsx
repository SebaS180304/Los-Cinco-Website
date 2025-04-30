import React, { useState } from 'react';
import logoA from '../assets/images/logo-c.png';
import logo from '../assets/images/logo.png';
import { AppBar, Toolbar, Box, ButtonGroup, Button, Tooltip, Menu, Typography, MenuItem, IconButton, Drawer } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import Drawcontent from './DrawContent';

const settings = ['Cerrar Sesión'];

const CUSTOM_COLOR = '#FFB300';

function Lectbar({ selectedView, setSelectedView, disableMedia, mode = 'lesson', isMobile, lessons }) {
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
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
                    {mode === 'lesson' && (
                        <ButtonGroup>
                            <Button 
                                onClick={() => setSelectedView('model')}
                                variant={selectedView === 'model' ? 'contained' : 'outlined'}
                                disabled={disableMedia}
                                sx={{
                                    color: selectedView === 'model' ? 'white' : CUSTOM_COLOR,
                                    backgroundColor: selectedView === 'model' ? CUSTOM_COLOR : 'transparent',
                                    border: `2px solid ${CUSTOM_COLOR}`,
                                    '&:hover': selectedView === 'model' ? { backgroundColor: `${CUSTOM_COLOR}CC`, color: 'black' } : { opacity: 0.8 }
                                }}
                            >
                                Media
                            </Button>
                            <Button 
                                onClick={() => setSelectedView('content')}
                                variant={selectedView === 'content' ? 'contained' : 'outlined'}
                                sx={{
                                    color: selectedView === 'content' ? 'white' : CUSTOM_COLOR,
                                    backgroundColor: selectedView === 'content' ? CUSTOM_COLOR : 'transparent',
                                    border: `2px solid ${CUSTOM_COLOR}`,
                                    '&:hover': selectedView === 'content' ? { backgroundColor: `${CUSTOM_COLOR}CC`, color: 'black' } : { opacity: 0.8 }
                                }}
                            >
                                Contenido
                            </Button>
                        </ButtonGroup>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={toggleDrawer(true)}>
                            <LibraryBooksOutlinedIcon sx={{ color: CUSTOM_COLOR, fontSize: 40, '&:hover': { opacity: 0.8 } }} />
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
                            <Drawcontent onClose={toggleDrawer(false)} lessons={lessons} />
                        </Drawer>
                        <Tooltip title="Abrir Configuración" arrow>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                                <AccountCircleOutlinedIcon sx={{ color: CUSTOM_COLOR, fontSize: 40, '&:hover': { opacity: 0.8 } }}/>
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
                        <Typography variant='h6' component={Link} to='/learn' sx={{ ml: 2, textDecoration: 'none', color: 'white', '&:hover': { color: CUSTOM_COLOR, opacity: 0.8 } }}>
                            Inicio
                        </Typography>
                        <Typography component={Link} onClick={toggleDrawer(true)} sx={{ ml: 2, textDecoration: 'none', color: 'white', fontSize: '20px', '&:hover': { color: CUSTOM_COLOR, opacity: 0.8 } }}>
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
                            <Drawcontent onClose={toggleDrawer(false)} lessons={lessons} />
                        </Drawer>
                    </Box>
                    <Box>
                        <Tooltip title="Abrir Configuración" arrow>
                            <IconButton onClick={handleOpenUserMenu}>
                                <AccountCircleOutlinedIcon sx={{ color: CUSTOM_COLOR, fontSize: 40, '&:hover': { opacity: 0.8 } }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            )}
            <Menu sx={{ mt: '45px' }} id="user-menu" anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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