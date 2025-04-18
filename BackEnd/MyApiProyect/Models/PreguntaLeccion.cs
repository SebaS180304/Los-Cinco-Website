using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class PreguntaLeccion
{
    public int IdPreguntaLeccion { get; set; }

    public int IdLeccion { get; set; }

    public string TextoPregunta { get; set; } = null!;

    public virtual Leccione IdLeccionNavigation { get; set; } = null!;

    public virtual ICollection<OpcionLeccion> OpcionLeccions { get; set; } = new List<OpcionLeccion>();
}
