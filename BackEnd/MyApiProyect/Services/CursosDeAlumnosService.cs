using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
            var SelectedCursos = await _context.InscripcionCursos
                .Where(i => i.IdEstudiante == id_estudiante)
                .Select(i => i.IdCurso)
                .ToListAsync();
            var cursosCom = await _context.Cursos.
                            Include(c=> c.InscripcionCursos).
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
                Intentos = c.InscripcionCursos.Where(i=>i.IdEstudiante == id_estudiante ).
                                                Select(i=>i.Intento).FirstOrDefault(),
                CalificacionExamen = c.InscripcionCursos.Where(i=>i.IdEstudiante == id_estudiante ).
                                                Select(i=>i.Puntaje).FirstOrDefault(),
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

        public async Task<CursoInscripcionDTO?> GetCursoReciente(int id_estudiante){
            var leccionesCompletadas = await _context.LeccionCompletada.
                                                Where(c=>c.IdUsuario == id_estudiante).
                                                ToListAsync();
            var IDLeccionesC = leccionesCompletadas.Select(l=> l.IdLeccionCompletada).ToList();
            var fecha = await _context.RegistroLeccionCompletada.
                                Where(l=> IDLeccionesC.Contains(l.IdLeccionCompletada)).
                                OrderBy(l=>l.FechaAcabada).
                                Select(l=>l.IdLeccionCompletada).
                                FirstOrDefaultAsync();
            var IDLeccion = leccionesCompletadas.
                            Where(l=>l.IdLeccionCompletada == fecha).
                            Select(l=>l.IdLeccion).FirstOrDefault();
            var IDCurso = await _context.Lecciones.
                                    Where(l=>l.IdLeccion == IDLeccion).
                                    Select(l=>l.IdCurso).
                                    FirstOrDefaultAsync();
            return await GetCurso(id_estudiante, IDCurso);
        }

        public async Task<EstadisticasSemana> GetEstadisticas(int id_estudiante){
            var lecciones = await _context.LeccionCompletada.
                                    Where(l=>l.IdUsuario== id_estudiante).
                                    Select(l=>l.IdLeccionCompletada).
                                    ToListAsync();
            var TodoRegistro = await _context.RegistroLeccionCompletada.
                                    Where(r=> lecciones.Contains(r.IdLeccionCompletada) && r.FechaAcabada > DateTime.Today.AddDays(-7)).
                                    ToListAsync();
            var registros = TodoRegistro.GroupBy(r=>r.FechaAcabada.DayOfWeek).ToList();
            List<Estadistica> Estadisticas = new List<Estadistica>();
            for(int i = 0; i < 7; i++){
                var day =  DateTime.Today.AddDays(-i).DayOfWeek;
                Estadisticas.Add( new Estadistica{
                    dia = day.ToString(),
                    cantidad = registros.Where(r=>r.Key == day).Count()
                });
            }
            return new EstadisticasSemana {estadisticas = Estadisticas};
                                    
                                
        }
    }
}