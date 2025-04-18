using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class InscripcionCurso
{
    public int IdInscripcionCurso { get; set; }

    public int IdEstudiante { get; set; }

    public int IdCurso { get; set; }

    public int Puntaje { get; set; }

    public int Intento { get; set; }

    public bool Valido { get; set; }

    public DateTime? FechaTerminado { get; set; }

    public virtual Curso IdCursoNavigation { get; set; } = null!;

    public virtual Usuario IdEstudianteNavigation { get; set; } = null!;

    public virtual ICollection<QuizSubmition> QuizSubmitions { get; set; } = new List<QuizSubmition>();
}
