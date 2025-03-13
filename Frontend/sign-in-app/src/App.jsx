import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lecture from './pages/Lecture';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/learn' element={<Home />} />
              <Route path='/lecture' element={<Lecture />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App