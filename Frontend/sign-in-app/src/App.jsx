import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import AddContent from './pages/AddContent';
import EditStudents from './pages/EditStudents';
import EditCourses from './pages/EditCourses';
import StudentStats from './pages/StudentStats';
import StudentView from './pages/StudentView';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Navbar />
      <Box sx={{ mt: '64px' }}> {/* Ajusta el margen superior */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/add-content" element={<AddContent />} />
          <Route path="/edit-students" element={<EditStudents />} />
          <Route path="/edit-courses" element={<EditCourses />} />
          <Route path="/student-stats" element={<StudentStats />} />
          <Route path="/student-view" element={<StudentView />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;