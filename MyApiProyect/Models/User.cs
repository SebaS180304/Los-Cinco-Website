using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Password { get; set; }
    }
}