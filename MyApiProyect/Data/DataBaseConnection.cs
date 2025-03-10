using MySql.Data;
using MySql.Data.MySqlClient;

namespace Data
{
    public class DBConnection
    {
        private DBConnection()
        {
            
        }

        private string Server  = "sql3.freesqldatabase.com";
        private string Port  = "3306";
        private string DatabaseName  = "sql3766924";
        private string UserName  = "sql3766924";
        private string Password = "hgb1hyCPf5";

        public MySqlConnection? Connection { get; set;}

        private static DBConnection? _instance = null;
        public static DBConnection Instance()
        {
            if (_instance == null)
                _instance = new DBConnection();
           return _instance;
        }
    
        public bool IsConnect()
        {
            if (Connection == null)
            {
                if (String.IsNullOrEmpty(DatabaseName))
                    return false;
                string connstring = string.Format("server={0};user={1};database={2};port={3};password={4}", Server, UserName, DatabaseName, Port, Password);
                Connection = new MySqlConnection(connstring);
                Connection.Open();
            }
    
            return true;
        }
    
        public void Close()
        {
            Connection?.Close();
            Connection = null;
        }        
    }
}