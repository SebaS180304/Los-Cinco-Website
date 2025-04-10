using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Identity.Client;

namespace MyApiProyect.DTO
{
    public class LogInResponse
    {
        public string? Name { get; set; }
        public string? Token { get; set; } = string.Empty;
        public int Rol { get; set; } = 0;
        public int TimeExpires { get; set; } = 0;

    }
}