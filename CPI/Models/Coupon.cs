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
        public int coupon_number { get; set; }
        public DateTime appointment_day { get; set; }
        public DateTime appointment_time { get; set; }
        public int cabinet { get; set; }

        public Patient Patient { get; set; }
        public Doctor Doctor { get; set; }
    }
}
