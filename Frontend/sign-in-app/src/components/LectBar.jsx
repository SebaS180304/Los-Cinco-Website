import React from 'react';
import logo from '../assets/logo.png';
import { AppBar, Toolbar, Container, Box, Button, Tooltip, Menu, Typography, MenuItem, IconButton, Drawer } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Drawcontent from './DrawContent';

const settings = ['Logout'];

function Lectbar() {
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
        navigate('/login');
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return ( 
        <AppBar position='fixed' sx={{ backgroundColor: 'black'}}>
            <Container maxWidth='xxl'>
                <Toolbar>
                    <Link to='/'>
                        <img src={logo} alt='Whirlpool logo' style={{ height: '50px' }} />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }} >
                        <Button key="home" sx={{ my: 2, color: 'white', display: 'block' }} 
                            component={Link} to="/">
                            Home
                        </Button>
                        <Button onClick={toggleDrawer(true)} sx={{ my: 2, color: 'white' }}>
                            Syllabus
                        </Button>
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
                        <Tooltip title="Open Settings" arrow>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleOutlinedIcon sx={{ color: 'white', fontSize: 40 }}/>
                            </IconButton>
                        </Tooltip>
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
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
     );
}

export default Lectbar;