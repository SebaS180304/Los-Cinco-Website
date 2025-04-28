import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Lecture from './pages/Lecture';
import Login from './pages/Login';
import Learn from './pages/Learn';
import { GlobalProvider } from './context/GlobalContext';
import EnrolledCourse from './pages/EnrolledCourse';
import Quiz from './pages/Quiz';
import Exam from './pages/Exam';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    overflowX: 'hidden',
                },
                html: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                },
            },
        },
    },
});

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to='/' />;
};

const AdminRoute = ({ children }) => {
  const rol = localStorage.getItem('rol');
  return rol === '1' ? children : <Navigate to='/learn' />;
};

const TechnicianRoute = ({ children }) => {
  const rol = localStorage.getItem('rol');
  return rol === '0' ? children : <Navigate to='/dashboard' />;
};

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    if (token && rol) {
      setSession({ token, rol });
      console.log('Usuario persistido:', { token, rol });
    }
  }, []);

  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Rutas exclusivas para admin */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/courses/:courseId" 
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Courses />
                </AdminRoute>
              </PrivateRoute>
            } 
          />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Students />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          {/* Rutas exclusivas para técnicos */}
          <Route 
            path="/learn" 
            element={
              <PrivateRoute>
                <TechnicianRoute>
                  <Learn />
                </TechnicianRoute>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/lesson/:id" 
            element={
              <PrivateRoute>
                <TechnicianRoute>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Lecture />
                  </ThemeProvider>
                </TechnicianRoute>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/quiz/:id" 
            element={
              <PrivateRoute>
                <TechnicianRoute>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Quiz />
                  </ThemeProvider>
                </TechnicianRoute>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/exam/:id" 
            element={
              <PrivateRoute>
                <TechnicianRoute>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Exam />
                  </ThemeProvider>
                </TechnicianRoute>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/enrolled/:courseId" 
            element={
              <PrivateRoute>
                <TechnicianRoute>
                  <EnrolledCourse />
                </TechnicianRoute>
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;