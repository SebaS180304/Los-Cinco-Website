using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyApiProyect.Services;
using MyApiProyect.DTO;
using System.Security.Claims;

namespace MyApiProyect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        private IQuestionService quizService;
        public QuizController(IQuestionService _quizService) => quizService = _quizService;

        [HttpGet]
        public async Task<ActionResult<List<PreguntaDTO>>> GetQuizzes(int id_curso, int id_alumno)
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

    }
}