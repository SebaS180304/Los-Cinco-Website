import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Learn from './pages/Learn';
import Lecture from './pages/Lecture';
import Login from './pages/Login';

function App() {
    return (
        <div>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/learn' element={<Home />} />
              <Route path='/lecture' element={<Lecture />} />
            </Routes>
        </div>
    );
}

export default App