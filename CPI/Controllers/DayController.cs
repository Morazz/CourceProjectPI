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
    public class DayController : ControllerBase
    {
        DBContext db;

        public DayController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Day> Get()
        {
            return db.Days.ToArray();
        }

        [HttpGet("{code}")]
        public Day Get(int code)
        {
            return db.Days.Find(code);
        }

        [HttpPost]
        public void Insert(Day day)
        {
            db.Days.Add(day);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(int day_code)
        {
            Day dayN = Get(day_code);
            if (dayN != null)
            {
                db.Days.Remove(dayN);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Day day)
        {
            Day dayN = Get(day.day_code);
            if (dayN != null)
            {
                day.day_code = dayN.day_code;
                day.day = dayN.day;
                db.Update(day);
                db.SaveChanges();
            }
        }
    }
}
