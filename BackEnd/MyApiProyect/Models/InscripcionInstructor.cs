using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class InscripcionInstructor
{
    public int IdInscripcionInstructor { get; set; }

    public int IdEstudiante { get; set; }

    public int IdInstructor { get; set; }

    public virtual Usuario IdEstudianteNavigation { get; set; } = null!;

    public virtual Usuario IdInstructorNavigation { get; set; } = null!;
}
