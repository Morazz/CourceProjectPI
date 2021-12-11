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
    public class PassDataController : ControllerBase
    {
        private readonly DBContext db;

        public PassDataController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<PassData> Get()
        {
            return db.PassData.ToArray();
        }

        [HttpGet("{id}")]
        public PassData Get(string id)
        {
            return db.PassData.Find(id);
        }

        [HttpGet("ByLog/{log}")]
        public IEnumerable<PassData> GetByLog(string log)
        {
            return db.PassData.Where(pd => pd.login.Contains(log));
        }

        [HttpPost]
        public void Insert(PassData passData)
        {
            db.PassData.Add(passData);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(string login)
        {
            PassData passd = Get(login);
            if (passd != null)
            {
                db.PassData.Remove(passd);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(PassData newPassData)
        {
            PassData passData = Get(newPassData.login);
            if (passData != null)
            {
                passData.login = newPassData.login;
                passData.password = newPassData.password;
                passData.status = newPassData.status;
                db.PassData.Update(passData);
                db.SaveChanges();
            }
        }
    }
}
