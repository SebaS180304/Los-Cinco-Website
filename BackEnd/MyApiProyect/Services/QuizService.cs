using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyApiProyect.DTO;
using MyApiProyect.Models;

namespace MyApiProyect.Services
{
    public class QuizService:IQuizService
    {
        private readonly WebsiteContext context;
        public QuizService(WebsiteContext _websiteContext)
        {
            context = _websiteContext;
        }
        public async Task<List<PreguntaQuiz>?> GetQuizPreguntas(int id_curso, int id_alumno)
        {
            var quizQuery = await context.Preguntas.Where(x => x.IdCurso == id_curso).ToListAsync();
            if(quizQuery == null || quizQuery.Count == 0)
            {
                return null;
            }   
            var quiz = quizQuery.Select(x => new PreguntaQuiz
            {
                IdPregunta = x.IdPregunta,
                Texto = x.TextoPregunta,
                opciones = context.Opciones.
                            Where(y => y.IdPregunta == x.IdPregunta).
                            Select(y => new OpcionesPregunta
                            {
                                IdOpcion = y.IdOpcion,
                                Texto = y.TextoOpcion,
                                correcta = y.Correcta ?? false
                            }).ToList()
            }
            ).ToList();
            return quiz;

        }
        
    }
}