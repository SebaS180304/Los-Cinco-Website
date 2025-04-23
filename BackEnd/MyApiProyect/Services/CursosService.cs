using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;
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
        public async Task<List<CursoFullDTO>> GetCursosDeProfesor(int Id)
        {
            var cursos = await _context.Cursos.Where(x => x.IdInstructor == Id).ToListAsync();
            return cursos.Select(c=> new CursoFullDTO
            {
                IdCurso = c.IdCurso,
                TituloCurso = c.TituloCurso,
                DescripcionCurso = c.Descripcion ?? "NA",
                Categoria = c.Categoria
            }).ToList();
        }

        public async Task<CursoFullDTO> GetCursoFull(int IdCurso)
        {
            var curso = await _context.Cursos.Include(x => x.Lecciones).
                                                ThenInclude(p=> p.PreguntaLeccions).
                                                ThenInclude(p=> p.OpcionLeccions).
                                                Include(q=> q.Pregunta).
                                                ThenInclude(p=>p.Opciones).
                                                FirstOrDefaultAsync(x => x.IdCurso == IdCurso);
            if (curso == null) return null!;
            return new CursoFullDTO
            {
                IdCurso = curso.IdCurso,
                TituloCurso = curso.TituloCurso,
                DescripcionCurso = curso.Descripcion ?? "NA",
                Categoria = curso.Categoria,
                IntentosMax = curso.IntentosMax,
                Lecciones = curso.Lecciones.Select(l => new LeccionFullDTO
                {
                    IdLeccion = l.IdLeccion,
                    TituloLeccion = l.TituloLeccion,
                    Contenido = l.Contenido,
                    tipo = l.TipoMedia,
                    Url = l.UrlMedia,
                    preguntas = l.PreguntaLeccions.Select(p=>new PreguntaDTO{
                        IdPregunta = p.IdPreguntaLeccion,
                        Texto = p.TextoPregunta,
                        opciones = p.OpcionLeccions.Select(o=> new OpcionDTO{
                            IdOpcion = o.IdOpcionLeccion,
                            Texto = o.TextoOpcion,
                            correcta = o.Correcto
                        }).ToList()
                    }).ToList()
                }).ToList(),
                quiz = curso.Pregunta.Select(p=> new PreguntaDTO{
                        IdPregunta = p.IdPregunta,
                        Texto = p.TextoPregunta,
                        opciones = p.Opciones.Select(o=> new OpcionDTO{
                            correcta = o.Correcta ?? false,
                            Texto = o.TextoOpcion,
                            IdOpcion = o.IdOpcion
                        }).ToList()
                    }).ToList()
            };
            
        }

        public async Task<int> CrearCurso(CursoFullDTO curso, int idInstructor)
        {
            var nuevoCurso = new Curso
            {
                TituloCurso = curso.TituloCurso,
                Descripcion = curso.DescripcionCurso,
                Categoria = curso.Categoria,
                IdInstructor = idInstructor,
                IntentosMax = curso.IntentosMax
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


        public async Task<int> CrearLeccion(LeccionFullDTO leccion, int idCurso)
        {
            var nuevaLeccion = new Leccione
            {
                TituloLeccion = leccion.TituloLeccion,
                Contenido = leccion.Contenido,
                TipoMedia = leccion.tipo,
                UrlMedia = leccion.Url,
                IdCurso = idCurso
            };
            try
            {
                await _context.Lecciones.AddAsync(nuevaLeccion);
                await _context.SaveChangesAsync();
                int idLeccion = nuevaLeccion.IdLeccion;
                return idLeccion;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;
            }
        }

        public async Task<bool> EditarCurso(CursoFullDTO curso){

            var updateData = await _context.Cursos.Where(c=>c.IdCurso == curso.IdCurso).FirstOrDefaultAsync();
            if(updateData is null){
                return false;
            }
            updateData.Categoria = curso.Categoria;
            updateData.Descripcion = curso.DescripcionCurso;
            updateData.TituloCurso = curso.TituloCurso;
            updateData.IntentosMax = curso.IntentosMax;
            try{
                _context.Update(updateData);
                await _context.SaveChangesAsync();
                return true;
            }catch (Exception e){
                Console.WriteLine(e);
                return false;
            }   
        }

        public async Task<bool> EditarLeccion(LeccionFullDTO leccion){
            var updateLeccion = await _context.Lecciones.Where(l => l.IdLeccion == leccion.IdLeccion).FirstOrDefaultAsync();
            if(updateLeccion is null){
                return false;
            }
            updateLeccion.TituloLeccion = leccion.TituloLeccion;
            updateLeccion.Contenido = leccion.Contenido;
            updateLeccion.TipoMedia = leccion.tipo;
            updateLeccion.UrlMedia = leccion.Url;
            try{
                _context.Update(updateLeccion);
                await _context.SaveChangesAsync();
                return true;
            }catch(Exception e){
                Console.WriteLine(e);
                return false;
            }
        }
        public async Task<bool> EditarCursoCompleto (CursoFullDTO curso){
            var b = await EditarCurso(curso);
            if(!b) {return false;}
            foreach(LeccionFullDTO leccion in curso.Lecciones){
                await EditarLeccion(leccion);
            }
            return true;


        }

        public async Task<bool> EliminarCurso(int id_curso){
            var curs = new Curso{IdCurso = id_curso};
            _context.Cursos.Attach(curs);
            _context.Cursos.Remove(curs);
                        try{
                await _context.SaveChangesAsync();
            }catch(Exception e){
                Console.WriteLine(e);
                return false;
            }
            return true;
        }


        public async Task<bool> EliminarLeccion(int id_leccion){
            var lecc = new Leccione{IdLeccion = id_leccion};
            _context.Lecciones.Attach(lecc);
            _context.Lecciones.Remove(lecc);
            try{
                await _context.SaveChangesAsync();
            }catch(Exception e){
                Console.WriteLine(e);
                return false;
            }
            return true;
        }

        public async Task<bool> VerificarLeccionProfesor(int IdLeccion, int IdInstructor ){
            var cursosDeInst = await _context.Cursos.Where( c=> c.IdInstructor == IdInstructor).Select(c=> c.IdCurso).ToListAsync();
            var instancia = await _context.Lecciones.Where( l=> cursosDeInst.Contains(l.IdCurso) ).FirstOrDefaultAsync();
            return !(instancia is null);
        }

        public async Task<bool> VerificarCursodeProfesor(int IdCurso, int IdInstructor){
            var instancia = await _context.Cursos.Where(c=> c.IdCurso == IdCurso && c.IdInstructor == IdInstructor).FirstOrDefaultAsync();
            return !(instancia is null);
        }

        public async Task<bool> VerificarCursoEnteroProfesor(CursoFullDTO curso, int IdInstructor){
            var cursoInst = await _context.Cursos.Where(c=>c.IdCurso==curso.IdCurso).Include(l=>l.Lecciones).FirstOrDefaultAsync();
            if(cursoInst?.IdInstructor != IdInstructor){
                return false;
            }
            var leccionIdsInCurso = curso.Lecciones.Select(l => l.IdLeccion).ToList();
            var leccionIdsInCursoInst = cursoInst.Lecciones.Select(l => l.IdLeccion).ToList();

            bool allExist = leccionIdsInCurso.All(id => leccionIdsInCursoInst.Contains(id));

            return allExist;

        }
    }
}