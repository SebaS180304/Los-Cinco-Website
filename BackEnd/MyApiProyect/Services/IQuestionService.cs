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

        public Task<bool> ModificarQuizFinal (List<PreguntaDTO> questions, int id_curso);
        public Task<bool> ModificarLeccionQuiz(List<PreguntaDTO> questions, int id_leccion);
        public Task<bool> SubmitionLeccion(int id_leccion, int id_alumno);

        public Task<bool> SubmitQuiz(int id_curso, int id_alumno, int cal);
    }
}