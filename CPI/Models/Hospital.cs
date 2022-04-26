using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class Hospital
    {
        [Key]
        public string hospital_id { get; set; }
        public string name { get; set; }
        public string? address { get; set; }
        [ForeignKey("schedule_code")]
        public Schedule? schedule { get; set; }
    }
}
