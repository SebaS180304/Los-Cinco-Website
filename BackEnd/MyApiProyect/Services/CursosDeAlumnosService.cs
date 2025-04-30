using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Net.Http.Headers;
using System.Runtime.Serialization;
using System.Security.AccessControl;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
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
                            Where(c=> SelectedCursos.Contains(c.IdCurso) && c.Visible).
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
                curs.Porcentaje = curs.lecciones.Count() > 0 ? curs.Porcentaje : 0;
                curs.Porcentaje = curs.CalificacionExamen > 60 ? 100 : curs.Porcentaje ;
            }
            return result;
        }

        public async Task<CursoInscripcionDTO?> GetCurso(int id_estudiante, int id_curso){
            var curso = await _context.Cursos.
                                Where(c=> c.IdCurso == id_curso && c.Visible).
                                Include(c=> c.InscripcionCursos).
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
                Intentos = curso.InscripcionCursos.Where(ic=> ic.IdEstudiante == id_estudiante).Select(ic=> ic.Intento).FirstOrDefault(),
                CalificacionExamen = curso.InscripcionCursos.Where(ic=> ic.IdEstudiante == id_estudiante).Select(ic=> ic.Puntaje).FirstOrDefault(),
                lecciones = curso.Lecciones.Select(l=>new LeccionInscripcionDTO{
                    IdLeccion = l.IdLeccion,
                    TituloLeccion = l.TituloLeccion,
                    completada = l.LeccionCompletada.
                                    Where(lc => lc.IdUsuario == id_estudiante).
                                    Select(lc => lc.Valida).FirstOrDefault() ?? false
                }).ToList()
            };
            cursoDTO.Porcentaje = (int)((float)cursoDTO.lecciones.Where(l=>l.completada).Count() /cursoDTO.lecciones.Count() * 80);
            cursoDTO.Porcentaje = cursoDTO.lecciones.Count() > 0 ? cursoDTO.Porcentaje : 0;
            cursoDTO.Porcentaje = cursoDTO.CalificacionExamen > 60 ? 100: cursoDTO.Porcentaje ;
            return cursoDTO;
        }

        public async Task<CursoInscripcionDTO?> GetCursoReciente(int id_estudiante){
            var leccionIds = await _context.InscripcionCursos
            .Where(ic => ic.IdEstudiante == id_estudiante)
            .Join(
                _context.Lecciones,
                ic => ic.IdCurso,
                l => l.IdCurso,
                (ic, l) => l.IdLeccion
            )
            .ToListAsync();
            
            if (!leccionIds.Any())
            {
                Console.WriteLine("NoHayC");
                return null;
            }

            // Get completed lessons for these lesson IDs
            var completedLesson = await _context.LeccionCompletada
                .Where(lc => lc.IdUsuario == id_estudiante && leccionIds.Contains(lc.IdLeccion))
                .Join(
                    _context.RegistroLeccionCompletada,
                    lc => lc.IdLeccionCompletada,
                    rlc => rlc.IdLeccionCompletada,
                    (lc, rlc) => new { lc.IdLeccion, rlc.FechaAcabada }
                )
                .OrderByDescending(x => x.FechaAcabada)
                .FirstOrDefaultAsync();

            if (completedLesson == null)
            {
                Console.WriteLine("No Hay completadas");
                return await FirstCourse(id_estudiante);
                
            }

            // Get course ID for the most recent completed lesson
            var cursoId = await _context.Lecciones
                .Where(l => l.IdLeccion == completedLesson.IdLeccion)
                .Select(l => l.IdCurso)
                .FirstOrDefaultAsync();

            var S = await GetCurso(id_estudiante, cursoId);
            if(S is null){
                Console.WriteLine("LeccionCompletada pero no disponible el curso");
                return await FirstCourse(id_estudiante);
            }else{
                return S;
            }
        }

        public async Task<CursoInscripcionDTO?> FirstCourse(int id_alumno){
            var te = await GetCursos(id_alumno);
                var gg = te.FirstOrDefault();
                
                if (gg is null) {
                    return null;
                }
                Console.WriteLine(gg.IdCurso);
                return await GetCurso(id_alumno, gg.IdCurso);
        }

        public async Task<EstadisticasSemana> GetEstadisticas(int id_estudiante)
        {
    // Get all lesson IDs from student's enrolled courses first
        var leccionIds = await _context.InscripcionCursos
        .Where(ic => ic.IdEstudiante == id_estudiante)
        .Join(
            _context.Cursos.Where(c => c.Visible), // Only join with visible courses
            ic => ic.IdCurso,
            c => c.IdCurso,
            (ic, c) => c.IdCurso
        )
        .Join(
            _context.Lecciones,
            cid => cid,
            l => l.IdCurso,
            (cid, l) => l.IdLeccion
        )
        .ToListAsync();

        if (!leccionIds.Any())
        {   var Estadistic = new List<Estadistica>();
            for (int i = 0; i < 7; i++)
            {
                var day = DateTime.Today.AddDays(-i).DayOfWeek;
                Estadistic.Add(new Estadistica
                {
                    dia = day.ToString(),
                    cantidad =  0
                });
            }
        return new EstadisticasSemana() {estadisticas = Estadistic};
        }

    // Get completed lessons for these lesson IDs
            var completedLessons = await _context.LeccionCompletada
                .Where(l => l.IdUsuario == id_estudiante && leccionIds.Contains(l.IdLeccion))
                .Select(l => l.IdLeccionCompletada)
                .ToListAsync();

            // Get records from the last 7 days
            var TodoRegistro = await _context.RegistroLeccionCompletada
                .Where(r => completedLessons.Contains(r.IdLeccionCompletada) && 
                            r.FechaAcabada > DateTime.Today.AddDays(-7))
                .ToListAsync();

            // Group by day and count distinct completion records
            var registros = TodoRegistro
                .GroupBy(r => r.FechaAcabada.DayOfWeek)
                .ToDictionary(
                    group => group.Key,
                    group => group.Select(g => g.IdLeccionCompletada).Distinct().Count()
                );

        // Create statistics for the last 7 days
            var Estadisticas = new List<Estadistica>();
            for (int i = 0; i < 7; i++)
            {
                var day = DateTime.Today.AddDays(-i).DayOfWeek;
                Estadisticas.Add(new Estadistica
                {
                    dia = day.ToString(),
                    cantidad = registros.ContainsKey(day) ? registros[day] : 0
                });
            }

            return new EstadisticasSemana { estadisticas = Estadisticas };
        }
        public async Task<CursoSimpleDTO?> GetCursoSimple(int id_leccion, int id_alumno){
            var cur = await _context.Lecciones.Where(l=> l.IdLeccion == id_leccion).Select(l=> l.IdCurso).FirstOrDefaultAsync();
            var curs = await _context.Cursos.Where(l=> l.IdCurso == cur ).Include(c=> c.Lecciones).ThenInclude(l=> l.LeccionCompletada).FirstOrDefaultAsync();
            if (curs is null) return null;
            var quest = await _context.PreguntaLeccions.Where(p=> curs.Lecciones.Select(l=>l.IdLeccion).Contains(p.IdLeccion)).ToListAsync();
            

            var a =  new CursoSimpleDTO{
                IdCurso = curs.IdCurso,
                TituloCurso = curs.TituloCurso,
                lecciones = curs.Lecciones.Select(l=> new LeccionInscripcionSimpleDTO{
                    preguntas = !(quest.Where(p=> p.IdLeccion == l.IdLeccion).FirstOrDefault() is null),
                    IdLeccion = l.IdLeccion,
                    TituloLeccion = l.TituloLeccion,
                    completada = l.LeccionCompletada.Where(p=>p.IdUsuario == id_alumno).Select(lc=>lc.Valida).FirstOrDefault() ?? false
                }).ToList()
            };
            return a;
        } 

        public async Task<CursoSimpleDTO?> getCursobyId(int id_curso, int id_alumno){
            var curs = await GetCurso(id_alumno, id_curso);
            if (curs is null) return null;
            var preg = await _context.PreguntaLeccions.Where(p => curs.lecciones.Select(l=> l.IdLeccion).Contains(p.IdLeccion)).ToListAsync();
            return new CursoSimpleDTO{
                IdCurso = curs.IdCurso,
                TituloCurso = curs.TituloCurso,
                lecciones = curs.lecciones.Select(l=> new LeccionInscripcionSimpleDTO{
                    IdLeccion = l.IdLeccion,
                    preguntas = !(preg.Where(p=> p.IdLeccion == l.IdLeccion).FirstOrDefault() is null),
                    TituloLeccion = l.TituloLeccion,
                    completada = l.completada
                }).ToList()
            };
        }

        public async Task<LeccionInscripcionDTO?> GetLeccion(int id_leccion, int id_estudiante){
            var leccionI = await _context.Lecciones.Where(l=>l.IdLeccion == id_leccion).
                                        Include(l=>l.LeccionCompletada).
                                        FirstOrDefaultAsync();
            if(leccionI is null)
                return null;
                                       
            var LeccionF = new LeccionInscripcionDTO{
                                            IdLeccion = id_leccion,
                                            TituloLeccion = leccionI.TituloLeccion,
                                            Contenido = leccionI.Contenido,
                                            tipo = leccionI.TipoMedia,
                                            Url = leccionI.UrlMedia,
                                            completada = leccionI.LeccionCompletada.Where(r=>r.IdUsuario == id_estudiante).
                                                                            Select(r=> r.Valida).
                                                                            FirstOrDefault() ?? false
                                            
                                        };
            return LeccionF;
        }

        public async Task<QuizLeccionDTO> PreguntasDeLeccion(int id_leccion, int id_alumno){
            var preguntas = await _context.PreguntaLeccions.
                                        Include(p=>p.OpcionLeccions).
                                        Where(p=>p.IdLeccion == id_leccion).
                                        ToListAsync();
            var ended = await _context.LeccionCompletada.
                                    Where(l=>l.IdLeccion == id_leccion && l.IdUsuario == id_alumno).
                                    Select(l=>l.Valida).
                                    FirstOrDefaultAsync() ?? false;
            var fin = new QuizLeccionDTO{
                id_leccion = id_leccion,
                completado = ended,
                preguntas = preguntas.Select(p=> new PreguntaDTO{
                    IdPregunta = p.IdPreguntaLeccion,
                    Texto = p.TextoPregunta,
                    opciones = p.OpcionLeccions.Select(o=> new OpcionDTO{
                        IdOpcion = o.IdOpcionLeccion,
                        Texto = o.TextoOpcion,
                        correcta = o.Correcto
                    }).ToList()
                }).ToList()
            };
            return fin;                      
        }


        public async Task<CursoPDF_DTO?> GetPDFInfo( int id_curso){
            var sample = await _context.Cursos.Where(c=> c.IdCurso == id_curso && c.Visible).
                                    Include(c=> c.Lecciones).FirstOrDefaultAsync();
            if(sample is null ) return null;
            var t =  new CursoPDF_DTO{
                IdCurso = sample.IdCurso,
                TituloCurso = sample.TituloCurso,
                DescripcionCurso = sample.Descripcion ??  "NA",
                Categoria = sample.Categoria,
                lecciones = sample.Lecciones.Select(l=> new LeccionPDF_DTO{
                    IdLeccion = l.IdLeccion,
                    TituloLeccion = l.TituloLeccion,
                    Contenido = l.Contenido,
                }).ToList()
            };
            return t;

        }

        public async Task<bool> PerteneceCurso(int id_curso, int id_alumno){
            var curso = await _context.InscripcionCursos.Where(i=> i.IdCurso == id_curso && i.IdEstudiante == id_alumno).FirstOrDefaultAsync();
            return !(curso is null);
        }

        public async Task<List<QuizValuesDTO>> RecentSubmitions( int id_curso, int id_alumno){
            var inscripc = await _context.InscripcionCursos.Where(ic=> ic.IdCurso == id_curso && ic.IdEstudiante == id_alumno).
                                                            FirstOrDefaultAsync();
            if(inscripc is null) return new List<QuizValuesDTO>();
            var submitions = await _context.QuizSubmitions.Where(q => q.IdInscripcionCurso == inscripc.IdInscripcionCurso).
                                                            Take(inscripc.Intento).
                                                            OrderBy(q=> q.FechaSubmition).ToListAsync();
            var res = submitions.Select( s=> new QuizValuesDTO{
                    cal = s.Calificacion,
                    intento = s.IdSubmition,
                    Fecha = s.FechaSubmition ?? System.DateTime.Today
            }).ToList();
            return res;
        }
    }
}