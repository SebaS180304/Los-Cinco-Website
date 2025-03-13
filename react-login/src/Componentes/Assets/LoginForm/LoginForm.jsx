import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authService';
import './LoginForm.css';

const LoginForm = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        user: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [userError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    const handleUser = () => {
        if (!formData.user || formData.user.length < 3) {
            setUserError(true);
            return;
        }
        setUserError(false);
    };

    const handlePassword = () => {
        if (!formData.password || formData.password.length < 5 || formData.password.length > 20) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        try {
            console.log('🚀 Iniciando proceso de login...');
            const orderedFormData = {
                user: formData.user,
                password: formData.password
            };

            console.log(orderedFormData);
            const response = await loginUser(orderedFormData);
            
            switch(response.result) {
                case 0:
                    setErrorMessage('✅ Login exitoso! Redirigiendo a panel de administrador...');
                    setTimeout(() => {
                        navigate('/admin');
                    }, 1500);
                    break;
                case 1:
                    setErrorMessage('✅ Login exitoso! Redirigiendo a panel técnico...');
                    setTimeout(() => {
                        navigate('/tecnico');
                    }, 1500);
                    break;
                case -1:
                    setErrorMessage('❌ Usuario o contraseña incorrectos');
                    break;
                default:
                    setErrorMessage('❌ Error en la autenticación');
            }
        } catch (error) {
            setErrorMessage('❌ Error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <div className="whirlpoolImage">
                    <img src="/whirlIMG.png" alt="Logo de Whirlpool" />
                </div>

                <h1>Login</h1>

                <div className="inputbox">
                    <input 
                        type="text"
                        name="user" 
                        value={formData.user}
                        onChange={handleInputChange}
                        onBlur={handleUser}
                        placeholder='User' 
                        required 
                        disabled={isLoading}
                    />
                    {userError && (
                        <div className="error-message">
                            El usuario debe tener al menos 3 caracteres
                        </div>
                    )}
                </div>
                
                <div className="inputbox">
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={handlePassword}
                        placeholder='Password' 
                        required 
                        disabled={isLoading}
                    />
                    {passwordError && (
                        <div className="error-message">
                            La contraseña debe tener entre 5 y 20 caracteres
                        </div>
                    )}
                </div>

                {errorMessage && (
                    <div className={errorMessage.includes('✅') ? 'success-message' : 'error-message'}>
                        {errorMessage}
                    </div>
                )}

                <div className="loginSubmit">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Procesando...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;