
using Microsoft.AspNetCore.Mvc;
using Data;
using MyApiProyect.Models;
using MySql.Data.MySqlClient;

namespace MyApiProyect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        DBConnection dbCon = DBConnection.Instance();
        [HttpGet]
        [Route("GetUsers")]
        public dynamic GetUsers()
        {
            List<User> response = new List<User>();
            if (dbCon.IsConnect())
            {
                //suppose col0 and col1 are defined as VARCHAR in the DB
                
                string query = "select * from Usuario";  
                var cmd = new MySqlCommand(query, dbCon.Connection);
                var reader = cmd.ExecuteReader();
                while(reader.Read())
                {
                    response.Add(new User()
                    {
                        Id_usuario = reader.GetInt32(0),
                        Nombre = reader.GetString(1),
                        Apellido = reader.GetString(2),
                        Correo_electronico = reader.GetString(3),
                        Contraseña = reader.GetString(4),
                        Numero_tecnico = reader.GetString(5),
                        Liga =reader.GetInt32(6),
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
                string query = "select * from Usuario where Numero_tecnico = @Id_usuario and Contraseña = @password";
                var cmd = new MySqlCommand(query, dbCon.Connection);
                cmd.Parameters.AddWithValue("@name", user.Nombre);
                cmd.Parameters.AddWithValue("@password", user.Contraseña);
                var reader = cmd.ExecuteReader();
                while(reader.Read()){
                    response.Id_usuario = reader.GetInt32(0);
                    response.Nombre = reader.GetString(1);
                    response.Contraseña = reader.GetString(5);
                }
                dbCon.Close();
                return response;
            }else{
                return StatusCode(500);
            }
            
        }
        [HttpPost]
        public dynamic LoginTry(LoginResponse lresponse){
            if(dbCon.IsConnect()){
                string query = "select Id_usuario from Usuario where Numero_tecnico = @user and Contraseña = @password";
                var cmd = new MySqlCommand(query, dbCon.Connection);
                cmd.Parameters.AddWithValue("@user", lresponse.user);
                cmd.Parameters.AddWithValue("@password", lresponse.password);
                object reader = cmd.ExecuteScalar();
                if(reader == null){
                    lresponse.result = -1;
                }else {

                    lresponse.result = (Int32)reader % 2;
                    
                }
            }else{
                return StatusCode(500);
            }
        
            dbCon.Close();
            return lresponse;
        }
    }
}