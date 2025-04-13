using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string NombreCompleto { get; set; } = null!;

    public int Rol { get; set; }

    public string? Contrasena { get; set; }

    public virtual ICollection<Curso> Cursos { get; set; } = new List<Curso>();

    public virtual ICollection<Inscripcione> Inscripciones { get; set; } = new List<Inscripcione>();
}
