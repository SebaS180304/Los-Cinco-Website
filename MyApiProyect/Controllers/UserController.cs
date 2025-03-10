using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data;
using MyApiProyect.Models;
using MySql.Data;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.X509.SigI;
using Org.BouncyCastle.Cms;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Reflection.Metadata.Ecma335;

namespace MyApiProyect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        DBConnection dbCon = DBConnection.Instance();
        [HttpGet]
        [Route("GetUsers")]
        public dynamic GetUser()
        {
            List<User> response = new List<User>();
            if (dbCon.IsConnect())
            {
                //suppose col0 and col1 are defined as VARCHAR in the DB
                
                string query = "select * from vendedores";  
                var cmd = new MySqlCommand(query, dbCon.Connection);
                var reader = cmd.ExecuteReader();
                while(reader.Read())
                {
                    response.Add(new User()
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Password = reader.GetInt32(2)
                    });
                }

            }else{
                return StatusCode(500);
            }
            dbCon.Close();
            return response;
        }
    

        [HttpGet]
        public dynamic GetSingleUser(User user){
            
            User response = new User();
            if(dbCon.IsConnect()){
                string query = "select * from vendedores where nombre = @name and telefono = @password";
                var cmd = new MySqlCommand(query, dbCon.Connection);
                cmd.Parameters.AddWithValue("@name", user.Name);
                cmd.Parameters.AddWithValue("@password", user.Password);
                var reader = cmd.ExecuteReader();
                while(reader.Read()){
                    response.Id = reader.GetInt32(0);
                    response.Name = reader.GetString(1);
                    response.Password = reader.GetInt32(2);
                }
                dbCon.Close();
                return response;
            }else{
                return StatusCode(500);
            }
            
        }
    }
}