using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class Doctor
    {
        [Key, ForeignKey("PassData")]
        public string login { get; set; }
        public string firstname { get; set; }
        public string fathername { get; set; }
        public string surname { get; set; }
        public int cabinet { get; set; }
        //[ForeignKey("Departments")]
        //public int department_code { get; set; }
        //[ForeignKey("Schedules")]
        //public int schedule_code { get; set; }
        //[ForeignKey("Specialities")]
        //public string speciality_code { get; set; }

        public Department Department { get; set; }
        public Schedule Schedule { get; set; }
        public Speciality Speciality { get; set; }

        public PassData PassData { get; set; }

        public Doctor() { }
    }
}
