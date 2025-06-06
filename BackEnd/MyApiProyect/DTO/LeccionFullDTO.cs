using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class LeccionFullDTO
    {
        public int IdLeccion { get; set; } = 0;
        public string TituloLeccion { get; set; } = null!;
        public string Contenido { get; set; } = null!;
        public int tipo { get; set; } = 0;
        public string? Url { get; set; } = null!;
        public List<PreguntaDTO> preguntas {get;set;}= new List<PreguntaDTO>();
        
    }
    
}