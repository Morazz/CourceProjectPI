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
        public DateTime appointment_start { get; set; }
        public DateTime appointment_end { get; set; }

        public List<Doctor> Doctors { get; set; } = new List<Doctor>();

        //public Schedule(int schedule_code, int shift, DateTime appointment_start, DateTime appointment_end)
        //{
        //    this.schedule_code = schedule_code;
        //    this.shift = shift;
        //    this.appointment_start = appointment_start;
        //    this.appointment_end = appointment_end;
        //}

        public Schedule() { }
    }
}
