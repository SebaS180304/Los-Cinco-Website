import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoA from './../assets/logoA.png';
import './Login.css';
import axios from '../api/axios';

const LOGIN_URL = '/LogIn';

const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [UserID, setUserID] = useState('');
  const [Password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [userIDError, setUserIDError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
    localStorage.clear();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [UserID, Password]);

  const handleUser = () => {
    if (!UserID || UserID.length < 3) {
      setUserIDError(true);
      return;
    }
    setUserIDError(false);
  };

  const handlePassword = () => {
    if (!Password || Password.length < 5 || Password.length > 20) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setIsLoading(true);

    const requestBody = { 
      UserID: parseInt(UserID, 10), 
      Password 
    };

    try {
        const response = await axios.post(
            LOGIN_URL, 
            requestBody,
            { headers: { 'Content-Type': 'application/json' } }
        );
        const token = response?.data?.token;
        const rol = response?.data?.rol;
        setUserID('');
        setPassword('');
        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol.toString());
        if (rol === 1) {
            setSuccessMsg('✅ Inicio de sesión exitoso! Redirigiendo a panel de administrador...');
            setTimeout(() => {
            navigate('/dashboard');
            }, 1500);
        } else if (rol === 0) {
            setSuccessMsg('✅ Inicio de sesión exitoso! Redirigiendo a panel técnico...');
            setTimeout(() => {
            navigate('/learn');
            }, 1500);
        } else {
            setSuccessMsg('✅ Inicio de sesión exitoso! Redirigiendo...');
            setTimeout(() => {
            navigate('/');
            }, 1500);
        }
        setSuccess(true);
    } catch (err) {
      if (!err?.response) {
          setErrMsg('No hay Respuesta del Servidor.');
      } else if (err.response?.status === 400) {
          setErrMsg('Id de Usuario o Contraseña Faltantes.');
      } else if (err.response?.status === 401) {
          setErrMsg('Usuario No Autorizado.');
      } else {
          setErrMsg('Inicio de Sesión Fallido.');
      }
      errRef.current.focus();
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="login-page">
        <div className="wrapper">
          <div className="whirlpoolImage">
            <img src={logoA} alt="Logo de Whirlpool" />
          </div>
          <h1>Iniciar Sesión</h1>
          <div className="success-message">
            {successMsg}
          </div>
        </div>
      </div>
    );
  }

  return(
    <div className="login-page">
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <div className="whirlpoolImage">
            <img src={logoA} alt="Logo de Whirlpool" />
          </div>
          <h1>Iniciar Sesión</h1>
          <div className="inputbox">
            <input 
              type="text"
              id="userId" 
              ref={userRef}
              autoComplete="off"
              value={UserID}
              onChange={(e) => setUserID(e.target.value)}
              onBlur={handleUser}
              placeholder='Id de Usuario'
              required 
              disabled={isLoading}
            />
          </div>
          {userIDError && (
            <div className="error-message">
              Id de Usuario Inválido. Debe de incluir al menos 3 números. Por favor, intente de nuevo.
            </div>
          )}
          <div className="inputbox">
            <input 
              type="password"
              id="Password" 
              autoComplete="off"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePassword}
              placeholder='Contraseña' 
              required 
              disabled={isLoading}
            />
          </div>
          {passwordError && (
            <div className="error-message">
              Contraseña Inválida. Debe de incluir entre 3 y 20 caracteres. Por favor, intente de nuevo.
            </div>
          )}
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <div className="loginSubmit">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Procesando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;