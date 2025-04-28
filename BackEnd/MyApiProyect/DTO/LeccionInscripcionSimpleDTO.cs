using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class LeccionInscripcionSimpleDTO
    {
        public int IdLeccion { get; set; } = 0;
        public string TituloLeccion { get; set; } = null!;
        public bool completada {get; set;} = false;
        public bool preguntas {get;set;} = false;
        
    }
    
}