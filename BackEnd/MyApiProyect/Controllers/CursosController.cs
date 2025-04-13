
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
    public class CursosController : ControllerBase
    {
        private readonly ICursosDeAlumnoService _cursosDeAlumnoService;
        private readonly ICursosService _cursosService;
        public CursosController(ICursosDeAlumnoService cursosDeAlumnoService, ICursosService coursosService) {
            _cursosDeAlumnoService = cursosDeAlumnoService;
            _cursosService = coursosService;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Curso>>> Get(int Id) => await _cursosDeAlumnoService.GetCursos(Id);

        
        [HttpGet]
        [Route("Admin")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<List<DetallesBaseCurso>>> GetCoursAdmin() {
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            Console.WriteLine(id);
            if (id is null)
                return Unauthorized();
    
            return await _cursosService.GetCursosDeProfesor(int.Parse(id));
            
        } 

    }
}