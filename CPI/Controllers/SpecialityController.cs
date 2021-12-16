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
    public class SpecialityController : ControllerBase
    {
        DBContext db;

        public SpecialityController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Speciality> Get()
        {
            return db.Specialities.ToArray();
        }

        [HttpGet("{speciality}")]
        public Speciality Get(string speciality)
        {
            return db.Specialities.Where(spec => spec.speciality_code == speciality).FirstOrDefault();
        }

        [HttpGet("BySpec/{speciality}")]
        public Speciality GetBySpec(string speciality)
        {
            Console.WriteLine(db.Specialities.Where(spec => spec.speciality == speciality).FirstOrDefault().speciality_code);
            Console.WriteLine(db.Specialities.Where(spec => spec.speciality == speciality).FirstOrDefault().speciality);
            return db.Specialities.Where(spec => spec.speciality == speciality).FirstOrDefault();
        }

        [HttpGet("ByCode/{speciality}")]
        public IEnumerable<Speciality> GetByCode(string speciality)
        {
            return db.Specialities.Where(spec => spec.speciality_code.Contains(speciality));
        }

        [HttpPost]
        public void Insert(Speciality spec)
        {
            db.Specialities.Add(spec);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(string speciality_code)
        {
            Speciality speciality = Get(speciality_code);
            if (speciality != null)
            {
                db.Specialities.Remove(speciality);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Speciality newSpeciality)
        {
            Speciality speciality = Get(newSpeciality.speciality_code);
            if (speciality != null)
            {
                speciality.speciality = newSpeciality.speciality;
                db.Specialities.Update(speciality);
                db.SaveChanges();
            }
        }
    }
}
