using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyApiProyect.DTO;
using MyApiProyect.Models;

namespace MyApiProyect.Services
{
    public class CursosService: ICursosService
    {
        private readonly WebsiteContext _context;
        public CursosService(WebsiteContext context)
        {
            _context = context;
        }
        public async Task<List<DetallesBaseCurso>> GetCursosDeProfesor(int Id)
        {
            var cursos = await _context.Cursos.Where(x => x.IdInstructor == Id).ToListAsync();
            return cursos.Select(c=> new DetallesBaseCurso
            {
                IdCurso = c.IdCurso,
                TituloCurso = c.TituloCurso,
                DescripcionCurso = "samhdsjhf",
                Categoria = c.Categoria
            }).ToList();
        }
    }
}