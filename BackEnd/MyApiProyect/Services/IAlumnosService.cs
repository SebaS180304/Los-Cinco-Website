using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApiProyect.DTO;

namespace MyApiProyect.Services
{
    public interface IAlumnosService
    {
        public Task<List<DetallesBaseAlumno>> GetAlumnos();

        public Task<List<DetallesBaseAlumno>> GetOwnAlumnos(int id_profesor);
        public Task<List<DetallesBaseAlumno>> GetNotOwnAlumnos(int id_profesor);

        public Task<int> AddAlumnoInscr(int id_estudiante,int id_profesor);
        
        public Task<bool> DeleteAlumnoInscr(int id_inscripcion_instructor);

        
    }
}