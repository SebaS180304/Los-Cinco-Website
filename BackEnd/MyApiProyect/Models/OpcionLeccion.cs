using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class OpcionLeccion
{
    public int IdOpcionLeccion { get; set; }

    public int IdPreguntaLeccion { get; set; }

    public string TextoOpcion { get; set; } = null!;

    public virtual PreguntaLeccion IdPreguntaLeccionNavigation { get; set; } = null!;
}
