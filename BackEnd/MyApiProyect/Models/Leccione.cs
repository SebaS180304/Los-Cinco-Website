using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class Leccione
{
    public int IdLeccion { get; set; }

    public string TituloLeccion { get; set; } = null!;

    public string Contenido { get; set; } = null!;

    public string TipoMedia { get; set; } = null!;

    public string? UrlMedia { get; set; }

    public int IdCurso { get; set; }

    public virtual Curso IdCursoNavigation { get; set; } = null!;

    public virtual ICollection<LeccionesCompletada> LeccionesCompletada { get; set; } = new List<LeccionesCompletada>();
}
