using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string NombreCompleto { get; set; } = null!;

    public int Rol { get; set; }

    public string Contrasena { get; set; } = null!;

    public virtual ICollection<Curso> Cursos { get; set; } = new List<Curso>();

    public virtual ICollection<InscripcionCurso> InscripcionCursos { get; set; } = new List<InscripcionCurso>();

    public virtual ICollection<InscripcionInstructor> InscripcionInstructorIdEstudianteNavigations { get; set; } = new List<InscripcionInstructor>();

    public virtual ICollection<InscripcionInstructor> InscripcionInstructorIdInstructorNavigations { get; set; } = new List<InscripcionInstructor>();

    public virtual ICollection<LeccionCompletadum> LeccionCompletada { get; set; } = new List<LeccionCompletadum>();
}
