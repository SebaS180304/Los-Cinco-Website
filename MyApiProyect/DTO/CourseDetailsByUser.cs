using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApiProyect.Models;

namespace MyApiProyect.DTO
{
    public class CourseDetailsByUser
    {
        public int IdCurso { get; set; }
        public string TituloCurso { get; set; } = null!;
        public string tipo { get; set; } = null!;
        public List<LeccionesCompletada> lecciones { get; set; } = new List<LeccionesCompletada>();
        
    }
}