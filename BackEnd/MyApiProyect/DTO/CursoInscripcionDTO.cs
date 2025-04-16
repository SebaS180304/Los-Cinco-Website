using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO

{
    public class CursoInscripcionDTO
    {
       public int IdCurso { get; set; } = 0;
        public string TituloCurso { get; set; } = null!;
        public string DescripcionCurso { get; set; } = null!;
        public int? Categoria { get; set; } = 0;
        public int IntentosMax {get; set;}= 0;
        public int Intentos {get; set;} = 0;
        public int CalificacionExamen {get; set;} = 0;
        public int Porcentaje {get; set;} = 0;
        public List<LeccionInscripcionDTO> lecciones {get; set;} = new List<LeccionInscripcionDTO>();



    }
}