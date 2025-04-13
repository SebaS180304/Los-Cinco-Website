using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class DetallesBaseCurso
    {
        public int IdCurso { get; set; } = 0;
        public string TituloCurso { get; set; } = null!;
        public string DescripcionCurso { get; set; } = null!;
        public string? Categoria { get; set; }
    }
}