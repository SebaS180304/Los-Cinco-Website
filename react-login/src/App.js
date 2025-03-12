import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from "./Componentes/Assets/LoginForm/LoginForm";
import AdminPage from "./Componentes/Assets/AdminPage/AdminPage";
import TecnicoPage from "./Componentes/Assets/TecnicoPage/TecnicoPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/tecnico" element={<TecnicoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;