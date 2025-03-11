
namespace MyApiProyect.Models
{
    public class User
    {
        public int Id_usuario { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido  { get; set; } 
        public string? Correo_electronico  { get; set; }
        public string? Contraseña { get; set; }
        public string? Numero_tecnico  { get; set; }
        public int Liga  { get; set; }
    }
}