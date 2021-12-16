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

        [ForeignKey("Patient")]
        public string patient_login { get; set; }
        public Patient Patient { get; set; }

        [ForeignKey("Doctor")]
        public string doctor_login { get; set; }
        public Doctor Doctor { get; set; }

        [ForeignKey("CouponTemplate")]
        public int template_id { get; set; }
        public CouponTemplate CouponTemplate { get; set; }
    }
}
