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
    }
}