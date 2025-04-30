using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyApiProyect.Services;
using MyApiProyect.DTO;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;

namespace MyApiProyect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class QuizController : ControllerBase
    {
        private IQuestionService quizService;
        public QuizController(IQuestionService _quizService) => quizService = _quizService;

        [HttpGet]
        public async Task<ActionResult<List<PreguntaDTO>>> GetQuizzes(int id_curso)
        {
            var quizzes = await quizService.GetQuizPreguntas(id_curso);
            if (quizzes is null) return NotFound();
            return Ok(quizzes);
        }

        [HttpPost]
        [Route("Leccion")]
        public async Task<IActionResult> ModificarPreguntasLeccion([FromBody] List<PreguntaDTO> preguntas, int id_leccion){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var response = await quizService.ModificarLeccionQuiz(preguntas, id_leccion);
            if(response){
                return NoContent();
            }else{
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("Leccion")]
        public async Task<ActionResult<List<PreguntaDTO>>> getPreguntasLeccion(int id_leccion){
             var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var response = await quizService.GetLeccionPreguntas( id_leccion);
            return response;

        }

        [HttpPost]
        public async Task<IActionResult> ModificarQuizPreguntas([FromBody] List<PreguntaDTO> preguntas, int id_curso){
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var response = await quizService.ModificarQuizFinal(preguntas, id_curso);
            if(response){
                return NoContent();
            }else{
                return StatusCode(201);
            }
        }

    }
}