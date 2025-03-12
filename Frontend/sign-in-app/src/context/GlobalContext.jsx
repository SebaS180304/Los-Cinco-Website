import React, { createContext, useState, useEffect } from 'react';

// Crear contextos
export const AlumnosContext = createContext();
export const CursosContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState({});

  // Cargar alumnos desde localStorage
  useEffect(() => {
    const savedAlumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    setAlumnos(savedAlumnos);
  }, []);

  // Guardar alumnos en localStorage
  useEffect(() => {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
  }, [alumnos]);

  // Cargar cursos desde localStorage
  useEffect(() => {
    const savedCursos = JSON.parse(localStorage.getItem('cursos')) || {};
    setCursos(savedCursos);
  }, []);

  // Guardar cursos en localStorage
  useEffect(() => {
    localStorage.setItem('cursos', JSON.stringify(cursos));
  }, [cursos]);

  return (
    <AlumnosContext.Provider value={{ alumnos, setAlumnos }}>
      <CursosContext.Provider value={{ cursos, setCursos }}>
        {children}
      </CursosContext.Provider>
    </AlumnosContext.Provider>
  );
};