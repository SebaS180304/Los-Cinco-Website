using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyApiProyect.DTO;
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
        public async Task<List<CursoInscripcionDTO>> GetCursos(int id_estudiante)
        {
            var SelectedCursos = await _context.Inscripciones
                .Where(i => i.IdEstudiante == id_estudiante)
                .Select(i => i.IdCurso)
                .ToListAsync();
            var cursosCom = await _context.Cursos.
                            Include(l=>l.Lecciones).
                            ThenInclude(l=> l.LeccionCompletada).
                            Where(c=> SelectedCursos.Contains(c.IdCurso)).
                            ToListAsync();
            var result = cursosCom.Select(c=> new CursoInscripcionDTO{
                IdCurso = c.IdCurso,
                TituloCurso = c.TituloCurso,
                DescripcionCurso = c.Descripcion ?? "NA",
                Categoria = c.Categoria,
                IntentosMax = c.IntentosMax,
                Intentos = 0,
                CalificacionExamen = 0,
                lecciones = c.Lecciones.Select(l=>new LeccionInscripcionDTO{
                    IdLeccion = l.IdLeccion,
                    TituloLeccion = l.TituloLeccion,
                    completada = l.LeccionCompletada.
                                    Where(lc => lc.IdUsuario == id_estudiante).
                                    Select(lc => lc.Valida).FirstOrDefault() ?? false
                }).ToList()
            }).ToList();
            foreach(var curs in result){
                curs.Porcentaje = (int)((float)curs.lecciones.Where(l=>l.completada).Count() /curs.lecciones.Count() * 80);
                curs.Porcentaje += curs.CalificacionExamen > 80 ? 20: 0;
            }
            return result;
        }

        public async Task<CursoInscripcionDTO?> GetCurso(int id_estudiante, int id_curso){
            var curso = await _context.Cursos.
                                Where(c=> c.IdCurso == id_curso).
                                Include(c=> c.Lecciones).
                                ThenInclude(c=> c.LeccionCompletada).
                                FirstOrDefaultAsync();
            if(curso is null) return null;
            var cursoDTO = new CursoInscripcionDTO{
                IdCurso = curso.IdCurso,
                TituloCurso = curso.TituloCurso,
                DescripcionCurso = curso.Descripcion ?? "NA",
                Categoria = curso.Categoria,
                IntentosMax = curso.IntentosMax,
                Intentos = 0,
                CalificacionExamen = 0,
                lecciones = curso.Lecciones.Select(l=>new LeccionInscripcionDTO{
                    IdLeccion = l.IdLeccion,
                    TituloLeccion = l.TituloLeccion,
                    completada = l.LeccionCompletada.
                                    Where(lc => lc.IdUsuario == id_estudiante).
                                    Select(lc => lc.Valida).FirstOrDefault() ?? false
                }).ToList()
            };
            cursoDTO.Porcentaje = (int)((float)cursoDTO.lecciones.Where(l=>l.completada).Count() /cursoDTO.lecciones.Count() * 80);
            cursoDTO.Porcentaje += cursoDTO.CalificacionExamen > 80 ? 20: 0;
            return cursoDTO;
        }
    }
}