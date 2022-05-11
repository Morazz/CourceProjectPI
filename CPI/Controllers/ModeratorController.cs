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
    public class ModeratorController : Controller
    {
        DBContext db;

        public ModeratorController(DBContext context)
        {   
            db = context;
        }

        [HttpGet]
        public IEnumerable<Moderator> Get()
        {
            return db.Moderators.ToArray();
        }

        [HttpGet("{id}")]
        public Moderator Get(string id)
        {
            return db.Moderators.Find(id);
        }

        [HttpGet("hosp/{id}")]
        public Moderator[] GetByHospital(string hospital_id)
        {
            return db.Moderators.Where(hp => hp.hospital_id == hospital_id).ToArray();
        }

        [HttpPost]
        public void Insert(Moderator moderator)
        {
            db.Moderators.Add(moderator);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(string id)
        {
            Moderator moderator = Get(id);
            if (moderator != null)
            {
                db.Moderators.Remove(moderator);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Moderator newModerator)
        {
            Moderator moderator = Get(newModerator.login);
            if (moderator != null)
            {
                moderator.hospital_id = newModerator.hospital_id;
                db.Moderators.Update(moderator);
                db.SaveChanges();
            }
        }
    }
}
