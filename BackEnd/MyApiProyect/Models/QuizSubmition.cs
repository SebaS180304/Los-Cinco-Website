using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class QuizSubmition
{
    public int IdSubmition { get; set; }

    public int IdInscripcionCurso { get; set; }

    public DateTime? FechaSubmition { get; set; }

    public int Calificacion { get; set; }

    public virtual InscripcionCurso IdInscripcionCursoNavigation { get; set; } = null!;
}
