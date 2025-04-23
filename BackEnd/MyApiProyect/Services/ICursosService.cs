using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApiProyect.DTO;

namespace MyApiProyect.Services
{
    public interface ICursosService
    {
        public Task<List<CursoFullDTO>> GetCursosDeProfesor(int Id);
        public Task<CursoFullDTO> GetCursoFull(int Idcurso);
       //public Task<bool> CrearCurso(CursoDTO curso, int IdInstructor);

       public Task<int> CrearCurso(CursoFullDTO curso, int idInstructor);

       public Task<int> CrearLeccion(LeccionFullDTO leccion, int idCurso);


       public Task<bool> EditarCurso(CursoFullDTO curso);
       public Task<bool> EditarLeccion(LeccionFullDTO leccion);
       public Task<bool> EditarCursoCompleto(CursoFullDTO curso);
       public Task<bool> EliminarCurso(int id_curso);
       public Task<bool> EliminarLeccion(int id_leccion);
       public Task<bool> VerificarLeccionProfesor(int IdLeccion, int IdInstructor );

       public Task<bool> VerificarCursodeProfesor(int IdCurso, int IdInstructor);
       public Task<bool> VerificarCursoEnteroProfesor(CursoFullDTO curso, int IdInstructor);

    }
}