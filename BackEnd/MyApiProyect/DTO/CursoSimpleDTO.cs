using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class CursoSimpleDTO
    {
        public int IdCurso {get; set;}
        public string TituloCurso {get; set;} = "NA";
        public bool Preguntas {get; set;} = false;
        public List<LeccionInscripcionSimpleDTO> lecciones {get; set;} = new List<LeccionInscripcionSimpleDTO>();
        
    }
    
}