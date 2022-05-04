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
        public PassData PassData { get; set; }
        public string firstname { get; set; }
        public string fathername { get; set; }
        public string surname { get; set; }
        public int cabinet { get; set; }
        public byte[]? photo { get; set; }
        public string? education { get; set; }
        public string? regards { get; set; }
        public int? department_code { get; set; }
        [ForeignKey("department_code")]
        public Department? Department { get; set; }
        public int? schedule_code { get; set; }
        [ForeignKey("schedule_code")]
        public Schedule? Schedule { get; set; }
        public string? speciality_code { get; set; }
        [ForeignKey("speciality_code")]
        public Speciality? Speciality { get; set; }
        [ForeignKey("hospital_id")]
        public Hospital Hospital { get; set; }
        public string hospital_id { get; set; }

        public List<Coupon> Coupons { get; set; } = new List<Coupon>();

        public Doctor() { }
    }
}
