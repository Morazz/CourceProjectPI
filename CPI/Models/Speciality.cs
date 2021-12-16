using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class Speciality
    {
        [Key]
        public string speciality_code { get; set; }
        public string speciality { get; set; }

        public Speciality() { }
    }
}
