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
    public class PatientController : ControllerBase
    {
        DBContext db;

        public PatientController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Patient> Get()
        {
            return db.Patients.ToArray();
        }

        [HttpGet("{id}")]
        public Patient Get(string id)
        {
            return db.Patients.Find(id);
        }

        [HttpGet("BySec/{sec}")]
        public IEnumerable<Patient> GetBySur(string sec)
        {
            return db.Patients.Where(pd => pd.surname.Contains(sec));
        }

        [HttpPost]
        public void Insert(Patient patient)
        {
            db.Patients.Add(patient);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(Patient patient)
        {
            Patient pat = Get(patient.login);
            if (pat != null)
            {
                db.Patients.Remove(patient);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Patient newPatient)
        {
            Patient patient = Get(newPatient.login);
            if (patient != null)
            {
                patient.firstname = newPatient.firstname;
                patient.fathername = newPatient.fathername;
                patient.surname = newPatient.surname;
                patient.address = newPatient.address;
                patient.birthday = newPatient.birthday;
                patient.phone_number = newPatient.phone_number;
                db.Patients.Update(patient);
                db.SaveChanges();
            }
        }
    }
}
