using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApiProyect.DTO;

namespace MyApiProyect.Services
{
    public interface IQuizService
    {
        public Task<List<PreguntaQuiz>?> GetQuizPreguntas(int id_curso, int id_alumno);
    }
}