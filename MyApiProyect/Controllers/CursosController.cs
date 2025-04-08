
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public CursosController(ICursosDeAlumnoService cursosDeAlumnoService) => _cursosDeAlumnoService = cursosDeAlumnoService;
        
        [HttpGet]
        public async Task<List<Curso>> Get(int Id) => await _cursosDeAlumnoService.GetCursos(Id);
    }
}