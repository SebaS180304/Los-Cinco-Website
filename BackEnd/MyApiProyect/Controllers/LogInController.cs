using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyApiProyect.DTO;
using MyApiProyect.Services;

namespace MyApiProyect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogInController : Controller
    {
        
        private readonly IUserLogin _userLoginService;
        public LogInController(IUserLogin userLoginService) => _userLoginService = userLoginService;

        [HttpPost]
        public async Task<ActionResult<LogInResponse>> LogIn( LogInRequest logInRequest)
        {
            var response = await _userLoginService.Authentification(logInRequest);
            if (response is null) return Unauthorized();
            return response;
        }
    }
}