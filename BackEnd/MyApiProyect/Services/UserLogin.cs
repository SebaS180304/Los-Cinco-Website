using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyApiProyect.DTO;
using MyApiProyect.Models;

namespace MyApiProyect.Services
{
    public class UserLogin:IUserLogin
    {
        private readonly WebsiteContext _context;
        private readonly string key;
        private readonly string issuer;
        private readonly string audience;
        private readonly int expirationTime ;
        public UserLogin(WebsiteContext context, string key, string issuer, string audience, int expirationTime)
        {
            this.key = key;
            this.issuer = issuer;
            this.audience = audience;
            this.expirationTime = expirationTime;
            _context = context;
        }
        public async Task<LogInResponse?> Authentification(LogInRequest LogInRequest)
        {
            if(LogInRequest is null  || string.IsNullOrEmpty(LogInRequest.Password)){
                return null;
            }
            //This Auth can be changed later to use hash and salt 
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.IdUsuario == LogInRequest.UserID && u.Contrasena == LogInRequest.Password);
            if(user is null)
                return null;
            var EndingTime = DateTime.UtcNow.AddMinutes(expirationTime);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, user.Rol.ToString())
                }),
                Expires = EndingTime,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)), SecurityAlgorithms.HmacSha256Signature)
            };
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(token);
            return new LogInResponse{
                Name = user.NombreCompleto,
                Token = accessToken,
                Rol = user.Rol,
                TimeExpires = (int)EndingTime.Subtract(DateTime.UtcNow).TotalSeconds
            };
        }

        

    }
}