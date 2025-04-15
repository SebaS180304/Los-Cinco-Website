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
        public List<LeccionFullDTO> Lecciones { get; set; } = new List<LeccionFullDTO>();
   
    }
}