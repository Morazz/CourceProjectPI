using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class Schedule
    {
        [Key]
        public int schedule_code { get; set; }
        public int shift { get; set; }
        public DateTime appointment_start { get; set; }
        public DateTime appointment_end { get; set; }

        public List<Doctor> Doctors { get; set; } = new List<Doctor>();

        public Schedule() { }
    }
}
