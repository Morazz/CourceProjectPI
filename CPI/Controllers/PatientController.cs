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
        public void Delete(string login)
        {
            Patient patient = Get(login);
            if (patient != null)
            {
                db.Patients.Remove(patient);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Patient newPatient)
        {
            db.Patients.Update(newPatient);
            db.SaveChanges();
        }
    }
}
