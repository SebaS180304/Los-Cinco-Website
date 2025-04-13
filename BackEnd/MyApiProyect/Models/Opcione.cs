using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class Opcione
{
    public int IdOpcion { get; set; }

    public string TextoOpcion { get; set; } = null!;

    public int IdPregunta { get; set; }

    public bool? Correcta { get; set; }

    public virtual Pregunta IdPreguntaNavigation { get; set; } = null!;
}
