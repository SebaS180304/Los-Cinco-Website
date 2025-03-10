using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.Models
{
    public class User
    {
        public int Id_usuario { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido;
        public string? Correo_electronico;
        public string? Contraseña { get; set; }
        
        public string? Numero_tecnico;
        public int Liga;
    }
}