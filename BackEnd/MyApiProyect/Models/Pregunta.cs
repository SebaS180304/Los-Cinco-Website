using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class Pregunta
{
    public int IdPregunta { get; set; }

    public string? TextoPregunta { get; set; }

    public int IdCurso { get; set; }

    public virtual Curso IdCursoNavigation { get; set; } = null!;

    public virtual ICollection<Opcione> Opciones { get; set; } = new List<Opcione>();
}
