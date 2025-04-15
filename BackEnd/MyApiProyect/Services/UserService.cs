using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyApiProyect.DTO;
using MyApiProyect.Models;

namespace MyApiProyect.Services
{
    public class UserService: IUserService
    {
        private readonly WebsiteContext websiteContext;
        public UserService(WebsiteContext context)
        {
            websiteContext = context;
        }

        public async Task<List<DetallesBaseAlumno>> GetAllUsers(int id)
        {
            var alumnos = await websiteContext.Usuarios.Where(s=> s.Rol == 0 && s.IdUsuario != id).ToListAsync();
            return alumnos.Select(a => new DetallesBaseAlumno
            {
                IdAlumno = a.IdUsuario,
                Nombre = a.NombreCompleto,
            }).ToList();
        }
    }
}