using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class LeccionAprendidum
{
    public int IdLeccionAprendida { get; set; }

    public int IdLeccion { get; set; }

    public int IdUsuario { get; set; }

    public DateTime? FechaAcabada { get; set; }

    public virtual Leccione IdLeccionNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
