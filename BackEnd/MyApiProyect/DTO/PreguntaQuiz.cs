using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class PreguntaQuiz
    {
        public int IdPregunta { get; set; }
        public string? Texto { get; set; }
        public List<OpcionesPregunta>? opciones { get; set; }
    }
    public class OpcionesPregunta
    {
        public int IdOpcion { get; set; }
        public string? Texto { get; set; }
        public bool correcta { get; set; }
    }
}