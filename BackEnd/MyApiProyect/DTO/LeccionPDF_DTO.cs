using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class LeccionPDF_DTO
    {
        public int IdLeccion { get; set; } = 0;
        public string TituloLeccion { get; set; } = null!;
        public string Contenido { get; set; } = null!;
        
    }
    
}