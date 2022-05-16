using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CPI.Models;

namespace CPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HospitalController : ControllerBase
    {
        DBContext db;

        public HospitalController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Hospital> Get()
        {
            return db.Hospitals.ToArray();
        }

        [HttpGet("{id}")]
        public Hospital Get(string id)
        {
            return db.Hospitals.Find(id);
        }

        [HttpPost]
        public void Insert(Hospital hospital)
        {
            db.Hospitals.Add(hospital);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(string id)
        {
            Hospital hospital = Get(id);
            if (hospital != null)
            {
                db.Hospitals.Remove(hospital);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Hospital newHospital)
        {
            db.Hospitals.Update(newHospital);
            db.SaveChanges();
        }
    }
}
