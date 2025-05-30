﻿using System;
using System.Collections.Generic;

namespace MyApiProyect.Models;

public partial class LeccionesCompletada
{
    public int IdLeccionCompletada { get; set; }

    public int IdLeccion { get; set; }

    public int IdUsuario { get; set; }

    public DateTime? FechaAcabada { get; set; }

    public virtual Leccione IdLeccionNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
