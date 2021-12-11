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
    public class CouponController : ControllerBase
    {
        DBContext db;

        public CouponController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Coupon> Get()
        {
            return db.Coupons.ToArray();
        }

        [HttpGet("coupon/{id}")]
        public Coupon Get(int id)
        {
            return db.Coupons.Find(id);
        }

        [HttpGet("{login}")]
        public IEnumerable<Coupon> Get(string login)
        {
            return db.Coupons;
        }

        [HttpGet("{login}/{id}")]
        public IEnumerable<Coupon> Get(string login, int id)
        {
            return db.Coupons;
        }

        [HttpPost]
        public void Insert(Coupon coupon)
        {
            db.Coupons.Add(coupon);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(Coupon coupon)
        {
            Coupon coup = Get(coupon.coupon_number);
            if (coup != null)
            {
                db.Coupons.Remove(coup);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Coupon newCoupon)
        {
            Coupon coupon = Get(newCoupon.coupon_number);
            if (coupon != null)
            {
                coupon.appointment_day = newCoupon.appointment_day;
                coupon.appointment_time = newCoupon.appointment_time;
                //coupon.doctor_id = newCoupon.doctor_id;
                //coupon.patient_id = newCoupon.patient_id;
                coupon.cabinet = newCoupon.cabinet;
                db.Update(coupon);
                db.SaveChanges();
            }
        }
    }
}
