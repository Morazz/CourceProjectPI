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
            Console.WriteLine(db.Coupons.Count());
            return db.Coupons;
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

        [HttpGet("valuable/{login}")]
        public IEnumerable<Coupon> GetValuable(string login)
        {
            DateTime time = default(DateTime).Add(DateTime.Now.TimeOfDay);

            List<Coupon> coupons = new List<Coupon>();
            foreach (Coupon cup in db.Coupons.Where(c => c.Patient.login == login))
            {
                Console.WriteLine(cup is Coupon);
                if (cup.appointment_day.Date > DateTime.Now.Date)
                    coupons.Add(cup);
                else if (cup.appointment_day.Date == DateTime.Now.Date)
                {
                    CouponTemplate cp = db.CouponTemplates.Find(cup.template_id);
                    if (DateTime.Compare(default(DateTime).Add(cp.time.TimeOfDay), time) >= 0)
                        coupons.Add(cup);
                }
            }

            return coupons.ToArray();
        }

        [HttpGet("doctor/valuable/{login}")]
        public IEnumerable<Coupon> GetDoctorValuable(string login)
        {
            DateTime time = default(DateTime).Add(DateTime.Now.TimeOfDay);

            List<Coupon> coupons = new List<Coupon>();
            foreach (Coupon cup in db.Coupons.Where(c => c.Doctor.login == login))
            {
                Console.WriteLine(cup is Coupon);
                if (cup.appointment_day.Date > DateTime.Now.Date)
                    coupons.Add(cup);
                else if (cup.appointment_day.Date == DateTime.Now.Date)
                {
                    CouponTemplate cp = db.CouponTemplates.Find(cup.template_id);
                    if (DateTime.Compare(default(DateTime).Add(cp.time.TimeOfDay), time) >= 0)
                        coupons.Add(cup);
                }
            }

            return coupons.ToArray();
        }

        [HttpGet("doctor/valuable/{login}/{patient}")]
        public IEnumerable<Coupon> GetDoctorPatValuable(string login, string patient)
        {
            DateTime time = default(DateTime).Add(DateTime.Now.TimeOfDay);

            List<Coupon> coupons = new List<Coupon>();
            foreach (Coupon cup in db.Coupons.Where(c => c.Doctor.login == login && c.Patient.login == patient))
            {
                Console.WriteLine(cup is Coupon);
                if (cup.appointment_day.Date > DateTime.Now.Date)
                    coupons.Add(cup);
                else if (cup.appointment_day.Date == DateTime.Now.Date)
                {
                    CouponTemplate cp = db.CouponTemplates.Find(cup.template_id);
                    if (DateTime.Compare(default(DateTime).Add(cp.time.TimeOfDay), time) >= 0)
                        coupons.Add(cup);
                }
            }

            return coupons.ToArray();
        }

        [HttpGet("{doc}/{date}/{template}")]
        public bool CheckFree(string doc, string date, int template)
        {
            List<Coupon> coupons = new List<Coupon>();
            if (db.Coupons.Count() != 0)
            foreach (Coupon coup in db.Coupons.Where(c => c.Doctor.login == doc))
            {
                //Console.WriteLine(coup.Patient.login);
                if (Equals(coup.appointment_day.Date.ToShortDateString(), date))
                    coupons.Add(coup);
            }
                return coupons.Where(coup => coup.template_id == template).Count() == 0;
        }

        [HttpPost]
        public void Insert(Coupon coupon)
        {
            db.Coupons.Add(coupon);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(int coupon_id)
        {
            Coupon coup = Get(coupon_id);
            if (coup != null)
            {
                db.Coupons.Remove(coup);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Coupon newCoupon)
        {
            Coupon coupon = Get(newCoupon.coupon_id);
            if (coupon != null)
            {
                coupon.appointment_day = newCoupon.appointment_day;
                coupon.template_id = newCoupon.template_id;
                coupon.Doctor = newCoupon.Doctor;
                coupon.Patient = newCoupon.Patient;
                db.Update(coupon);
                db.SaveChanges();
            }
        }
    }
}
