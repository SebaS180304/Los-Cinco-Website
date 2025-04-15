using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyApiProyect.DTO;
using MyApiProyect.Services;

namespace MyApiProyect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        public UserController(IUserService userService_) => userService = userService_;

        [HttpGet]
        [Route("AllAlumnos")]
        [Authorize]
        public async Task<ActionResult<List<DetallesBaseAlumno>>> SearchCaption()
        {
            var id = User.FindFirst(ClaimTypes.Name)?.Value;
            if (id is null)
                return Unauthorized();
            var response = await userService.GetAllUsers(int.Parse(id));
            return response;
        }
    }

}