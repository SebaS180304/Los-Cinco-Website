import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Lecture from './pages/Lecture';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <div>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/learn' element={<Home />} />
              <Route path='/lecture' element={<Lecture />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App