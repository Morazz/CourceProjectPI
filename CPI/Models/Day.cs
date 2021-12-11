using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class Day
    {
        [Key]
        public int day_code { get; set; }
        public string day { get; set; }
    }
}
