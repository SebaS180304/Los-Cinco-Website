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
    }
}