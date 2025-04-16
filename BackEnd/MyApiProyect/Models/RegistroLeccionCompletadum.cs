using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class RegistroLeccionCompletadum
{
    public int IdLeccionCompletada { get; set; }

    public DateTime FechaAcabada { get; set; }

    public virtual LeccionCompletadum IdLeccionCompletadaNavigation { get; set; } = null!;
}
