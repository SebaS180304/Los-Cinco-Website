using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class PreguntaDTO
    {
        public int IdPregunta { get; set; }
        public string? Texto { get; set; }
        public List<OpcionDTO> opciones { get; set; } = new List<OpcionDTO>();
    }
    public class OpcionDTO
    {
        public int IdOpcion { get; set; }
        public string? Texto { get; set; }
        public bool correcta { get; set; }
    }
}