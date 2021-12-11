using CPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Controllers
{
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
            return db.Specialities;
        }

        [HttpPost]
        public void Insert(Speciality spec)
        {
            db.Specialities.Add(spec);
            db.SaveChanges();
        }

        //[HttpDelete]
        //public void Delete(string login)
        //{
        //    Speciality speciality = Get(login);
        //    if (speciality != null)
        //    {
        //        db.Specialities.Remove(speciality);
        //        db.SaveChanges();
        //    }
        //}

        //[HttpPut]
        //public void Update(Speciality newSpeciality)
        //{
        //    Speciality speciality = Get(newSpeciality.speciality_code);
        //    if (speciality != null)
        //    {
        //        speciality.speciality_code = newSpeciality.speciality_code;
        //        speciality.speciality = newSpeciality.speciality;
        //        db.Specialities.Update(speciality);
        //        db.SaveChanges();
        //    }
        //}
    }
}
