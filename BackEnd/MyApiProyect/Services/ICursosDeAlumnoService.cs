using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApiProyect.Models;

namespace MyApiProyect.Services
{
    public interface ICursosDeAlumnoService
    {
        public Task<List<Curso>> GetCursos(int id_estudiante);
    }
}