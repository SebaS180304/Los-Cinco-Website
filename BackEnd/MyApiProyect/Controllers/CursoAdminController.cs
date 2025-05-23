
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
    [Authorize(Roles = "1")]
    public class CursoAdminController : ControllerBase
    {
        private readonly ICursosService _cursosService;
        public CursoAdminController(ICursosService coursosService) {
         
            _cursosService = coursosService;
        }

        
        [HttpGet]
        [Route("All")]
        public async Task<ActionResult<List<CursoFullDTO>>> GetCoursAdmin() {
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            Console.WriteLine(id);
            if (id is null)
                return Unauthorized();
    
            return await _cursosService.GetCursosDeProfesor(int.Parse(id));
            
        } 

        [HttpGet]
        [Route("Single")]
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
        public async Task<ActionResult> CrearCurso([FromBody] CursoFullDTO curso) {
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

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<ActionResult> EliminarCurso(int id_curso){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null )
                return Unauthorized();
            Console.WriteLine(int.Parse(id));
            var contains = await _cursosService.VerificarCursodeProfesor(id_curso, int.Parse(id));
            Console.WriteLine(int.Parse(id));
            if(!contains)
                return StatusCode(409);
            Console.WriteLine(int.Parse(id));
            bool good = await _cursosService.EliminarCurso(id_curso);
            if(good){
                return NoContent();
            }else {
                return StatusCode(500);
            }
        }

        [HttpDelete]
        [Route("Lecciones/Eliminar")]
        public async Task<ActionResult> EliminarLeccion(int id_leccion){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null )
                return Unauthorized();
            var contains = await _cursosService.VerificarLeccionProfesor(id_leccion, int.Parse(id));
            if(!contains)
                return StatusCode(409);
            bool good = await _cursosService.EliminarLeccion(id_leccion);
            if(good){
                return NoContent();
            }else {
                return StatusCode(500);
            }
        }

        [HttpPatch]
        [Route("Edit")]
        public async Task<ActionResult> EditarCurso ([FromBody] CursoFullDTO curso){
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