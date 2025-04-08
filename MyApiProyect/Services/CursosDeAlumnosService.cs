using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyApiProyect.Models;


namespace MyApiProyect.Services
{
    
    public class CursosDeAlumnosService:ICursosDeAlumnoService
    {
        private readonly WebsiteContext _context;
        public CursosDeAlumnosService(WebsiteContext context)
        {
            _context = context;
        }
        public async Task<List<Curso>> GetCursos(int id_estudiante)
        {
            var SelectedCursos = await _context.Inscripciones
                .Where(i => i.IdEstudiante == id_estudiante)
                .Select(i => i.IdCurso)
                .ToListAsync();
            List<Curso> cursos = await _context.Cursos.
                                Where(c =>  SelectedCursos.Contains(c.IdCurso))
                                .ToListAsync();
            return cursos;
        }
    }
}