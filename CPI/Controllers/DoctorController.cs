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
            return db.Doctors.Where(doc => doc.Department.department_code == code);
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
            Doctor doctor = Get(newDoctor.login);
            if (doctor != null)
            {
                doctor.firstname = newDoctor.firstname;
                doctor.fathername = newDoctor.fathername;
                doctor.surname = newDoctor.surname;
                //doctor.speciality = newDoctor.speciality;
                doctor.cabinet = newDoctor.cabinet;
                //doctor.schedule_code = newDoctor.schedule_code;
                db.Doctors.Update(doctor);
                db.SaveChanges();
            }
        }
    }
}
