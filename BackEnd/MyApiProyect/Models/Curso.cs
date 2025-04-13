using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class Curso
{
    public int IdCurso { get; set; }

    public string TituloCurso { get; set; } = null!;

    public string? Categoria { get; set; }

    public int IdInstructor { get; set; }

    public int IntentosMax { get; set; }

    public virtual Usuario IdInstructorNavigation { get; set; } = null!;

    public virtual ICollection<Inscripcione> Inscripciones { get; set; } = new List<Inscripcione>();

    public virtual ICollection<Leccione> Lecciones { get; set; } = new List<Leccione>();

    public virtual ICollection<Pregunta> Pregunta { get; set; } = new List<Pregunta>();
}
