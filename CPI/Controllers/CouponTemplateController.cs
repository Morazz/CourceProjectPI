using CPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CouponTemplateController : ControllerBase
    {
        DBContext db;

        public CouponTemplateController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<CouponTemplate> Get()
        {
            return db.CouponTemplates.ToArray();
        }

        [HttpGet("{code}")]
        public CouponTemplate Get(int code)
        {
            return db.CouponTemplates.Find(code);
        }

        [HttpPost]
        public void Insert(CouponTemplate coupon)
        {
            db.CouponTemplates.Add(coupon);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(int template_id)
        {
            CouponTemplate coup = Get(template_id);
            if (coup != null)
            {
                db.CouponTemplates.Remove(coup);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(CouponTemplate newCoupon)
        {
            CouponTemplate coupon = Get(newCoupon.template_id);
            if (coupon != null)
            {
                coupon.time = newCoupon.time;
                db.Update(coupon);
                db.SaveChanges();
            }
        }
    }
}
