using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class Pregunta
{
    public int IdPregunta { get; set; }

    public string? TextoPregunta { get; set; }

    public int IdQuiz { get; set; }

    public virtual Curso IdQuizNavigation { get; set; } = null!;

    public virtual ICollection<Opcione> Opciones { get; set; } = new List<Opcione>();
}
