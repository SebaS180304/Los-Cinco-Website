import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import { Box } from '@mui/material';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <Box sx={{ mt: '64px' }}> {/* Ajusta el margen superior */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses/:courseId" element={<Courses />} />
          </Routes>
        </Box>
      </Router>
    </GlobalProvider>
  );
}

export default App;