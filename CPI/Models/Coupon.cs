using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class Coupon
    {
        [Key]
        public int coupon_id { get; set; }
        public DateTime appointment_day { get; set; }

        public string patient_login { get; set; }
        [ForeignKey("patient_login")]
        public Patient Patient { get; set; }

        public string doctor_login { get; set; }
        [ForeignKey("doctor_login")]
        public Doctor Doctor { get; set; }

        [ForeignKey("hospital_id")]
        public Hospital? Hospital { get; set; }
        public string? hospital_id { get; set; }

        public int template_id { get; set; }
        [ForeignKey("template_id")]
        public CouponTemplate CouponTemplate { get; set; }
    }
}
