using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class LogInRequest
    {
        public int UserID { get; set; }
        public string? Password { get; set; }
    }
}