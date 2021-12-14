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

        public Patient Patient { get; set; }
        public Doctor Doctor { get; set; }
        public CouponTemplate appointment_time { get; set; }
    }
}
