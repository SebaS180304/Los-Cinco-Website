using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class Curso
{
    public int IdCurso { get; set; }

    public string TituloCurso { get; set; } = null!;

    public int? Categoria { get; set; }

    public string? Descripcion { get; set; }

    public int IdInstructor { get; set; }

    public int IntentosMax { get; set; }

    public virtual Usuario IdInstructorNavigation { get; set; } = null!;

    public virtual ICollection<InscripcionCurso> InscripcionCursos { get; set; } = new List<InscripcionCurso>();

    public virtual ICollection<Leccione> Lecciones { get; set; } = new List<Leccione>();

    public virtual ICollection<Pregunta> Pregunta { get; set; } = new List<Pregunta>();
}
