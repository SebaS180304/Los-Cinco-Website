import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Lecture from './pages/Lecture';
import Login from './pages/Login';
import Learn from './pages/Learn';
import { GlobalProvider } from './context/GlobalContext';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to='/' />;
};

const AdminRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  return userId === 'admin' ? children : <Navigate to='/learn' />;
};

const TechnicianRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  return userId === 'tecnico' ? children : <Navigate to='/dashboard' />;
};

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setSession({ token, userId });
      console.log('Usuario persistido:', { token, userId });
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
            path="/lesson" 
            element={
              <PrivateRoute>
                <TechnicianRoute>
                  <Lecture />
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