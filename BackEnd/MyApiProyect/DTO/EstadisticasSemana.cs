using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProyect.DTO
{
    public class EstadisticasSemana
    {
        public List<Estadistica> estadisticas {get;set;} = new List<Estadistica>();
    }

    public class Estadistica{
        public string dia {get; set;} = "NA";
        public int cantidad{get;set;} = 0;
    }

}
