import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <Router>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses/:courseId" element={<Courses />} />
          </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;