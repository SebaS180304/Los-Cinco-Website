using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyApiProyect.DTO;
using MyApiProyect.Services;

namespace MyApiProyect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "1")]
    public class AlumnosController : Controller
    {
        private readonly IAlumnosService alumnoService;
        public AlumnosController(IAlumnosService alumnoService_) => alumnoService = alumnoService_;

        [HttpGet]
        [Route("All")]
        public async Task<ActionResult<List<DetallesBaseAlumno>>> SearchAll()
        {
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var response = await alumnoService.GetALL();
            return response;
        }

        [HttpGet]
        [Route("Busqueda")]
        public async Task<ActionResult<List<DetallesBaseAlumno>>> SearchCaption()
        {
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var response = await alumnoService.GetNotOwnAlumnos(int.Parse(id));
            return response;
        }


        [HttpGet]
        [Route("Own")]
        public async Task<ActionResult<List<DetallesBaseAlumno>>> getOwn(){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var response = await alumnoService.GetOwnAlumnos(int.Parse(id));
            return response;
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> InscribirAlumno(int IdEstudiante){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var IdInscripcion = await alumnoService.AddAlumnoInscr(IdEstudiante, int.Parse(id));
            if(IdInscripcion < 1){
                return StatusCode(500);
            }else {
                return Ok(new {IdInscripcion});
            }
        }

        [HttpDelete]
        [Route("UnSubscribe")]

        public async Task<IActionResult> EliminarInscripcion(int id_inscripcion_instructor){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var response = await alumnoService.DeleteAlumnoInscr(id_inscripcion_instructor);
            if(response){
                return NoContent();
            }else{
                return StatusCode(500);
            }
        }
    }

}