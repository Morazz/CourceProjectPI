using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [ForeignKey("hospital_id")]
        public Hospital? Hospital { get; set; }
        public string? hospital_id { get; set; }
    }
}
