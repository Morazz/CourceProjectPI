using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class Department
    {
        [Key]
        public int department_code { get; set; }
        public string department_name { get; set; }
        public string head { get; set; }

        public List<Doctor> Doctors { get; set; } = new List<Doctor>();
    }
}
