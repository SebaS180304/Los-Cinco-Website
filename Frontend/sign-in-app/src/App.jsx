import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import { GlobalProvider } from './context/GlobalContext';
import Lecture from './pages/Lecture';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <GlobalProvider>
      <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/learn' element={<Home />} />
            <Route path='/lecture' element={<Lecture />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses/:courseId" element={<Courses />} />
          </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;