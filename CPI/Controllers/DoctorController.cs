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
    public class DoctorController : ControllerBase
    {
        DBContext db;

        public DoctorController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Doctor> Get()
        {
            return db.Doctors.ToArray();
        }

        [HttpGet("{id}")]
        public Doctor Get(string id)
        {
            return db.Doctors.Find(id);
        }

        [HttpGet("BySur/{sur}")]
        public IEnumerable<Doctor> GetBySur(string sur)
        {
            return db.Doctors.Where(pd => pd.surname.Contains(sur));
        }

        [HttpGet("dep/{code}")]
        public IEnumerable<Doctor> GetByDep(int code)
        {
            return db.Doctors.Where(doc => doc.department_code == code);
        }

        [HttpGet("hosp/{code}")]
        public IEnumerable<Doctor> GetByHosp(string code)
        {
            return db.Doctors.Where(doc => doc.hospital_id == code);
        }

        [HttpGet("nulldep")]
        public IEnumerable<Doctor> GetWithoutDep()
        {
            return db.Doctors.Where(doc => doc.department_code == null);
        }

        [HttpPost]
        public void Insert(Doctor doctor)
        {
            db.Doctors.Add(doctor);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(string login)
        {
            Doctor doctor = Get(login);
            if (doctor != null)
            {
                db.Doctors.Remove(doctor);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Doctor newDoctor)
        {
            db.Doctors.Update(newDoctor);
            db.SaveChanges();
        }
    }
}
