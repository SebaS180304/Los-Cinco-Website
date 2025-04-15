using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApiProyect.DTO;

namespace MyApiProyect.Services
{
    public interface IUserService 
    {
        public Task<List<DetallesBaseAlumno>> GetAllUsers(int id);

    }

}