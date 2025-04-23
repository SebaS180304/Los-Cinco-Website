using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class CursoFullDTO
    {
        public int IdCurso { get; set; } = 0;
        public string TituloCurso { get; set; } = null!;
        public string DescripcionCurso { get; set; } = null!;
        public int? Categoria { get; set; } = 0;
        public int IntentosMax {get; set;}= 0;
        public List<PreguntaDTO> quiz {get; set;} =  new List<PreguntaDTO>();
        public List<LeccionFullDTO> Lecciones { get; set; } = new List<LeccionFullDTO>();
   
    }
}