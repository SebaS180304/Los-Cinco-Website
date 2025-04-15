using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApiProyect.DTO;

namespace MyApiProyect.Services
{
    public interface ICursosService
    {
        public Task<List<DetallesBaseCurso>> GetCursosDeProfesor(int Id);
        public Task<CursoFullDTO> GetCursoFull(int Idcurso);
       //public Task<bool> CrearCurso(CursoDTO curso, int IdInstructor);

       public Task<int> CrearCurso(DetallesBaseCurso curso, int idInstructor);

       public Task<int> CrearLeccion(LeccionFullDTO leccion, int idCurso);


       public Task<bool> EditarCurso(DetallesBaseCurso curso);
       public Task<bool> EditarLeccion(LeccionFullDTO leccion);
       public Task<bool> EditarCursoCompleto(CursoFullDTO curso);
       public Task<bool> VerificarLeccionProfesor(int IdLeccion, int IdInstructor );

       public Task<bool> VerificarCursodeProfesor(int IdCurso, int IdInstructor);
       public Task<bool> VerificarCursoEnteroProfesor(CursoFullDTO curso, int IdInstructor);

    }
}