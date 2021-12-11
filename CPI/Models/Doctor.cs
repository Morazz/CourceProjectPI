using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class Doctor
    {
        [Key]
        public string login { get; set; }
        public string firstname { get; set; }
        public string fathername { get; set; }
        public string surname { get; set; }
        public int cabinet { get; set; }
        //public string speciality { get; set; }
        //public int department_code { get; set; }
        //public int schedule_code { get; set; }

        public Department Department { get; set; }
        public Schedule Schedule { get; set; }
        public Speciality Speciality { get; set; }
        public PassData PassData { get; set; }

        public Doctor() { }
    }
}
