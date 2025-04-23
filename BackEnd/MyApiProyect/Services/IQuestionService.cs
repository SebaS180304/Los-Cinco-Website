using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApiProyect.DTO;

namespace MyApiProyect.Services
{
    public interface IQuestionService
    {
        public Task<List<PreguntaDTO>?> GetQuizPreguntas(int id_curso);

        public Task<List<PreguntaDTO>> GetLeccionPreguntas(int id_leccion);

        //public Task<bool> ModificarQuiz (List<PreguntaDTO> questions, int id_curso);
        public Task<bool> ModificarLeccionQuiz(List<PreguntaDTO> questions, int id_leccion);

        //public Task<List<
    }
}