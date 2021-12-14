using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class CouponTemplate
    {
        [Key]
        public int template_id { get; set; }
        public DateTime time { get; set; }

        public CouponTemplate() { }
    }
}
