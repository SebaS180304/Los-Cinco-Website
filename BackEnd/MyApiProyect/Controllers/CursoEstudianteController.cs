
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApiProyect.DTO;
using MyApiProyect.Models;
using MyApiProyect.Services;

namespace MyApiProyect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class CursoEstudianteController : ControllerBase
    {
        private readonly ICursosDeAlumnoService cursosDeAlumnoService;
        public CursoEstudianteController(ICursosDeAlumnoService _cursoDeAlumnoService){
            cursosDeAlumnoService = _cursoDeAlumnoService;
        }

        [HttpGet]
        [Route("All")]
        public async Task<ActionResult<List<CursoInscripcionDTO>>> getAll(){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return BadRequest();
            int id = int.Parse(I);
            return Ok(await cursosDeAlumnoService.GetCursos(id));
        }

        [HttpGet]
        [Route("Single")]
        public async Task<ActionResult<CursoInscripcionDTO>> getSingle(int IdCurso){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return BadRequest();
            int id = int.Parse(I);
            var single =  await cursosDeAlumnoService.GetCurso(id, IdCurso);
            if(single is null){return NotFound();}
            return single;
        }

        [HttpGet]
        [Route("Recent")]

        public async Task<ActionResult<CursoInscripcionDTO>> getRecent(){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return BadRequest();
            int id = int.Parse(I);
            var recent = await cursosDeAlumnoService.GetCursoReciente(id);
            if(recent is null) return NoContent();
            return recent;
        }

        [HttpGet]
        [Route("Estadisticas")]

        public async Task<ActionResult<EstadisticasSemana>> getEstadistcas(){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return BadRequest();
            int id = int.Parse(I);
            return await cursosDeAlumnoService.GetEstadisticas(id); 
        }

        [HttpGet]
        [Route("Leccion")]
        public async Task<ActionResult<LeccionInscripcionDTO>> getLeccion(int id_leccion){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return BadRequest();
            int id = int.Parse(I);
            var re = await cursosDeAlumnoService.GetLeccion(id_leccion, id); 
            if (re is null) return StatusCode(500);
            return re;
        }

        [HttpGet]
        [Route("Lecciones")]
        public async Task<ActionResult<List<LeccionInscripcionSimpleDTO>>> getLecciones(int id_leccion){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return BadRequest();
            int id = int.Parse(I);
            var re = await cursosDeAlumnoService.GetLeccionesSimple(id_leccion, id); 
            if (re is null) return StatusCode(500);
            return re;
        }

    }
}
