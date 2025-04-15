using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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

        public async Task<bool> EditarCurso(DetallesBaseCurso curso){

            var updateData = await _context.Cursos.Where(c=>c.IdCurso == curso.IdCurso).FirstOrDefaultAsync();
            if(updateData is null){
                return false;
            }
            updateData.Categoria = curso.Categoria;
            updateData.Descripcion = curso.DescripcionCurso;
            updateData.TituloCurso = curso.TituloCurso;
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
            var cursoInc = new DetallesBaseCurso{
                IdCurso = curso.IdCurso,
                TituloCurso = curso.TituloCurso,
                Categoria = curso.Categoria,
                DescripcionCurso = curso.DescripcionCurso
            };
            var b = await EditarCurso(cursoInc);
            if(!b) {return false;}
            foreach(LeccionFullDTO leccion in curso.Lecciones){
                await EditarLeccion(leccion);
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