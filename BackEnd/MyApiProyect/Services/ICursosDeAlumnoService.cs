using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApiProyect.DTO;
using MyApiProyect.Models;

namespace MyApiProyect.Services
{
    public interface ICursosDeAlumnoService
    {
        public Task<List<CursoInscripcionDTO>> GetCursos(int id_estudiante);
        public Task<CursoInscripcionDTO?> GetCurso(int id_estudiante, int id_curso);
        public Task<CursoInscripcionDTO?> GetCursoReciente (int id_estudiante);

        public Task<EstadisticasSemana> GetEstadisticas(int id_estudiante);
        public Task<LeccionInscripcionDTO?> GetLeccion(int id_leccion, int id_estudiante);
        public Task<QuizLeccionDTO> PreguntasDeLeccion(int id_leccion, int id_alumno);
       public Task<List<LeccionInscripcionSimpleDTO>> GetLeccionesSimple(int id_leccion, int id_alumno);

    }
}