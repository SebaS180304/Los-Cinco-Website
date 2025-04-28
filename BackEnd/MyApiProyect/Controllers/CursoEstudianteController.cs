
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
            if(I is null) return Unauthorized();
            int id = int.Parse(I);
            return Ok(await cursosDeAlumnoService.GetCursos(id));
        }

        [HttpGet]
        [Route("Single")]
        public async Task<ActionResult<CursoInscripcionDTO>> getSingle(int IdCurso){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return Unauthorized();
            int id = int.Parse(I);
            var pass = await cursosDeAlumnoService.PerteneceCurso(IdCurso, id);
            if (!pass) return Unauthorized();
            var single =  await cursosDeAlumnoService.GetCurso(id, IdCurso);
            if(single is null){return NotFound();}
            return single;
        }

        [HttpGet]
        [Route("Recent")]

        public async Task<ActionResult<CursoInscripcionDTO>> getRecent(){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return Unauthorized();
            int id = int.Parse(I);
            var recent = await cursosDeAlumnoService.GetCursoReciente(id);
            if(recent is null) return NoContent();
            return recent;
        }

        [HttpGet]
        [Route("Estadisticas")]

        public async Task<ActionResult<EstadisticasSemana>> getEstadistcas(){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return Unauthorized();
            int id = int.Parse(I);
            return await cursosDeAlumnoService.GetEstadisticas(id); 
        }

        [HttpGet]
        [Route("Leccion")]
        public async Task<ActionResult<LeccionInscripcionDTO>> getLeccion(int id_leccion){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return Unauthorized();
            int id = int.Parse(I);
            var re = await cursosDeAlumnoService.GetLeccion(id_leccion, id); 
            if (re is null) return StatusCode(404);
            return re;
        }

        [HttpGet]
        [Route("Lecciones")]
        public async Task<ActionResult<CursoSimpleDTO>> getLecciones(int id_leccion){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return Unauthorized();
            int id = int.Parse(I);
            var re = await cursosDeAlumnoService.GetCursoSimple(id_leccion, id); 
            if (re is null) return StatusCode(404);
            return re;
        }

        [HttpGet]
        [Route("LeccionesIdCurso")]
        public async Task<ActionResult<CursoSimpleDTO>> getLeccionesCurso(int id_curso){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return Unauthorized();
            int id = int.Parse(I);
            var re = await cursosDeAlumnoService.getCursobyId(id_curso, id); 
            if (re is null) return StatusCode(404);
            return re;
        }

        [HttpGet]
        [Route("PDF")]
        public async Task<ActionResult<CursoPDF_DTO>> getPDF(int id_curso){
            var I =  User.FindFirstValue(ClaimTypes.Name);
            if(I is null) return Unauthorized();
            int id = int.Parse(I);
            var re = await cursosDeAlumnoService.GetPDFInfo(id_curso); 
            if (re is null) return NotFound();
            return re;
        }

    }
}
