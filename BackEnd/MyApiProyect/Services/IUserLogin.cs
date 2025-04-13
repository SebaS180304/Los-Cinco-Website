using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApiProyect.DTO;

namespace MyApiProyect.Services
{
    public interface IUserLogin
    {
        public Task<LogInResponse?> Authentification(LogInRequest LogInRequest);
    }
}