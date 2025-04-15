
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
    public class CursoController : ControllerBase
    {
        private readonly ICursosDeAlumnoService _cursosDeAlumnoService;
        private readonly ICursosService _cursosService;
        public CursoController(ICursosDeAlumnoService cursosDeAlumnoService, ICursosService coursosService) {
            _cursosDeAlumnoService = cursosDeAlumnoService;
            _cursosService = coursosService;
        }
        //Default
        [HttpGet]
        public async Task<ActionResult<List<Curso>>> Get(int Id) => await _cursosDeAlumnoService.GetCursos(Id);

        
        [HttpGet]
        [Route("All")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<List<DetallesBaseCurso>>> GetCoursAdmin() {
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            Console.WriteLine(id);
            if (id is null)
                return Unauthorized();
    
            return await _cursosService.GetCursosDeProfesor(int.Parse(id));
            
        } 

        [HttpGet]
        [Route("Single")]
        [Authorize]
        public async Task<ActionResult<CursoFullDTO>> GetFull(int IdCurso) {
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var curso = await _cursosService.GetCursoFull(IdCurso);
            if (curso == null) return NotFound();
            return curso;
        }

        [HttpPost]
        [Route("Nuevo")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> CrearCurso([FromBody] DetallesBaseCurso curso) {
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var IdCurso = await _cursosService.CrearCurso(curso, int.Parse(id));
            if(IdCurso == -1){
                return StatusCode(500);
            }
            return Ok(new { IdCurso });
        }

        [HttpPost]
        [Route("Leccion/Nuevo")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> CrearLeccion([FromBody] LeccionFullDTO leccion, int IdCurso) {
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null )
                return Unauthorized();
            var IdLeccion = await _cursosService.CrearLeccion(leccion, IdCurso);
            if(IdLeccion == -1){
                return StatusCode(500);
            }
            return Ok(new { IdLeccion });
        }

        [HttpPatch]
        [Route("Edit")]
        [Authorize(Roles ="1")]
        public async Task<ActionResult> EditarCurso ([FromBody] DetallesBaseCurso curso){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            bool parte = await _cursosService.VerificarCursodeProfesor(curso.IdCurso, int.Parse(id));
            if(!parte){
                return StatusCode(409, "No se encuentra curso especificado");
            }
            var result = await _cursosService.EditarCurso(curso);
            if(!result){
                return StatusCode(500, "No se ha podido ejecutar la accion");
            }
            return Ok(new {result});
        }    

        [HttpPatch]
        [Route("Leccion/Edit")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> EditarLeccion([FromBody] LeccionFullDTO leccion){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var parte = await _cursosService.VerificarLeccionProfesor(leccion.IdLeccion, int.Parse(id));
            if(!parte){
                return StatusCode(409, "No se encuentra curso leccion");
            }
            var result = await _cursosService.EditarLeccion(leccion);
            if(!result){
                return StatusCode(500, "No se ha podido ejecutar la accion");
            }
            return Ok(new {result});
        }

        [HttpPatch]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> EditarCursoCompleto([FromBody] CursoFullDTO curso){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            bool safe = await _cursosService.VerificarCursoEnteroProfesor(curso, int.Parse(id));
            if(!safe) return StatusCode(409, "No se encuentra cada uno de los objetos a editar");
            bool result = await _cursosService.EditarCursoCompleto(curso);
            if(!result){
                return StatusCode(500, "No se ha podido ejecutar la accion");
            }
            return Ok(new {result});
        }


    }
}