using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyApiProyect.Services;
using MyApiProyect.DTO;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace MyApiProyect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class QuizEstudianteController : ControllerBase
    {
        private ICursosDeAlumnoService cursosDeAlumnoService;
        private IQuestionService questionService;
        public QuizEstudianteController(ICursosDeAlumnoService _cursosDeAlumnoService, IQuestionService _questionService) {
                cursosDeAlumnoService = _cursosDeAlumnoService ;
                questionService = _questionService;
        }

        [HttpGet]
        public async Task<ActionResult<QuizLeccionDTO>> getQuizLeccion(int id_leccion){
             var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var response = await cursosDeAlumnoService.PreguntasDeLeccion( id_leccion, int.Parse(id));
            return response;

        }

        [HttpPatch]
        public async Task<IActionResult> submitLeccion(int id_leccion){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var res = await questionService.SubmitionLeccion(id_leccion, int.Parse(id));
            if(res){
                return Ok();
            }else{
                return StatusCode(500);
            }
        }

        [HttpPatch]
        [Route("Quiz")]
        public async Task<IActionResult> SubmitQuiz(QuizSubmitionDTO sub){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var res = await questionService.SubmitQuiz(sub.id_curso, int.Parse(id), sub.cal);
            if(!res){
                return StatusCode(500);
            }
            return NoContent();

        }

    }
}