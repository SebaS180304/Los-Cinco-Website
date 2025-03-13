// Material UI Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Material UI Components
import { Avatar, Button, Container, Paper, Typography, Box, TextField, 
  FormControlLabel, Checkbox, InputLabel, FormControl, OutlinedInput, 
  InputAdornment, IconButton, Alert } from "@mui/material";
  
// React Component
import * as React from "react";

// React Router Dom Component
import { useNavigate } from "react-router-dom";

function Login() {
    // Navigation
    const navigate = useNavigate();


  // Submit forms
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(null);

    if(emailError || !emailInput){
      setFormValid(
        "Email is invalid. Please re-enter your email");
        return;
    }

    if(passwordError ||!passwordInput){
      setFormValid(
        "Password must be at least 5 characters long and not contain spaces. Please re-enter your password");
        return;
    }

    setFormValid(null);
    setFormSuccess("Form Submitted Successfully!");

    console.log("Email : " + emailInput);
    console.log("Contraseña : " + passwordInput);
    console.log("Recuérdame : " + rememberMeChecked);
    navigate('/learn');
  }
  
  // Password visibility
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // Inputs
  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [rememberMeChecked, setRememberMeChecked] = React.useState(false);

  // Input Errors
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  // Validation for onBlur email
  const handleEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    if (!emailRegex.test(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  }

  // Validation for onBlur password
  const handlePassword = () => {
    if (!passwordInput || passwordInput.length < 5 || passwordInput.length > 20){
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  }

  // Form validation
  const [formValid, setFormValid] = React.useState();
  const [formSuccess, setFormSuccess] = React.useState();

  // Form submission

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{marginTop: 8, padding: 2}}>
        <Avatar sx={{
          mx: "auto",
          bgcolor: "#FFB300",
          textAlign: "center",
          mb: 1,
        }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' 
        variant='h5' 
        sx={{textAlign: "center"}}>
          Iniciar Sesión
        </Typography>
        <Box component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1}}>
          <TextField label="Correo electrónico"
          placeholder="Ingresar dirección de correo electrónico" 
          fullWidth 
          onBlur={handleEmail}
          error={emailError}
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
          required 
          autoFocus 
          
          type="email"
          sx={{ mb: 2}}/>
          <FormControl sx={{ mb: 2 }} variant="outlined" fullWidth required>
            <InputLabel htmlFor="outlined-adornment-password"
            error={passwordError}>
              Contraseña
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={passwordInput}
              error={passwordError}
              onBlur={handlePassword}
              placeholder="Ingresar contraseña"
              onChange={(event) => setPasswordInput(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
          />
          </FormControl>
          <FormControlLabel 
            control={<Checkbox 
              value="remember" 
              color="warning" 
              checked={rememberMeChecked} 
              onChange={(event) => setRememberMeChecked(event.target.checked)}
            />}
            label="Recuérdame"
          />
          <Button endIcon={<LoginOutlinedIcon />} 
          type="submit" 
          fullWidth 
          variant="contained"
          sx={{ mt: 2, bgcolor: '#FFB300' }}>
            Iniciar Sesión
          </Button>
          {formValid && <Alert severity="error">{formValid}</Alert>}
          {formSuccess && <Alert severity="success">{formSuccess}</Alert>}
        </Box>
      </Paper>
    </Container>
  )
}

export default Login