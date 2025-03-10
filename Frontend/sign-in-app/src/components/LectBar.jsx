import React from 'react';
import logo from '../assets/logo.png';
import { AppBar, Toolbar, Container, Box, Button, Tooltip, Menu, Typography, MenuItem, IconButton, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const settings = ['Profile', 'Account', 'Logout'];

function Lectbar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return ( 
        <AppBar position='fixed' sx={{ backgroundColor: 'black'}}>
            <Container maxWidth='xxl'>
                <Toolbar>
                    <Link to='/'>
                        <img src={logo} alt='logoA' style={{ height: '50px' }} />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }} >
                        <Button key="home" sx={{ my: 2, color: 'white', display: 'block' }} 
                            component={Link} to="/">
                            Home
                        </Button>
                        <Button onClick={toggleDrawer(true)} sx={{ my: 2, color: 'white' }}>
                            Syllabus
                        </Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            <div>
                                <h1>Contenido de leccion</h1>
                            </div>
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
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
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