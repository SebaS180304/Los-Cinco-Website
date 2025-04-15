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
                DescripcionCurso = c.Descripcion,
                Categoria = c.Categoria
            }).ToList();
        }

        public async Task<CursoFullDTO> GetCursoFull(int IdCurso)
        {
            var curso = await _context.Cursos.Include(x => x.Lecciones).FirstOrDefaultAsync(x => x.IdCurso == IdCurso);
            if (curso == null) return null!;
            return new CursoFullDTO
            {
                IdCurso = curso.IdCurso,
                TituloCurso = curso.TituloCurso,
                DescripcionCurso = curso.Descripcion,
                Categoria = curso.Categoria,
                Lecciones = curso.Lecciones.Select(l => new LeccionFullDTO
                {
                    IdLeccion = l.IdLeccion,
                    TituloLeccion = l.TituloLeccion,
                    Contenido = l.Contenido,
                    tipo = l.TipoMedia,
                    Url = l.UrlMedia
                }).ToList()
            };
            
        }

        public async Task<int> CrearCurso(DetallesBaseCurso curso, int idInstructor)
        {
            var nuevoCurso = new Curso
            {
                TituloCurso = curso.TituloCurso,
                Descripcion = curso.DescripcionCurso,
                Categoria = curso.Categoria,
                IdInstructor = idInstructor
            };
            try
            {
                await _context.Cursos.AddAsync(nuevoCurso);
                await _context.SaveChangesAsync();
                int idCurso = nuevoCurso.IdCurso;
                return idCurso;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;
            }
        }

       // public async Task<B
    }
}