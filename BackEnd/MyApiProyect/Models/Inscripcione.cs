using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class Inscripcione
{
    public int IdInscripcion { get; set; }

    public int IdEstudiante { get; set; }

    public int IdCurso { get; set; }

    public int? Puntaje { get; set; }

    public DateTime? FechaCompletado { get; set; }

    public bool? EstaCompletado { get; set; }

    public virtual Curso IdCursoNavigation { get; set; } = null!;

    public virtual Usuario IdEstudianteNavigation { get; set; } = null!;
}
