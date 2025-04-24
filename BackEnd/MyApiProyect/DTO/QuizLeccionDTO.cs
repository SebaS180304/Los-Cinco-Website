using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class QuizLeccionDTO{
        public int id_leccion {get; set;}
        public bool completado {get; set;}
        public int id_leccion_siguiente {get; set;}
        public int cantiad {get; set;}
        public List<PreguntaDTO> preguntas {get; set;} = new List<PreguntaDTO>();
    }
}