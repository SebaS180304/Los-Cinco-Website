using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyApiProyect.Services;
using MyApiProyect.DTO;

namespace MyApiProyect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        private IQuizService quizService;
        public QuizController(IQuizService _quizService) => quizService = _quizService;

        [HttpGet]
        public async Task<ActionResult<List<PreguntaQuiz>>> GetQuizzes(int id_curso, int id_alumno)
        {
            Console.WriteLine($"id_curso: {id_curso} id_alumno: {id_alumno}");
            var quizzes = await quizService.GetQuizPreguntas(id_curso, id_alumno);
            if (quizzes is null) return NotFound();
            return Ok(quizzes);
        }

    }
}