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
    public class ScheduleController : ControllerBase
    {
        DBContext db;

        public ScheduleController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Schedule> Get()
        {
            return db.Schedules;
        }

        [HttpGet("{schedule_code}")]
        public Schedule Get(int schedule_code)
        {
            return db.Schedules.Find(schedule_code);
        }

        [HttpPost]
        public void Insert(Schedule schedule)
        {
            db.Schedules.Add(schedule);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(int schedule_code)
        {
            Schedule schedule = Get(schedule_code);
            if (schedule != null)
            {
                db.Schedules.Remove(schedule);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Schedule newSchedule)
        {
            Schedule schedule = Get(newSchedule.schedule_code);
            if (schedule != null)
            {
                schedule.appointment_start = newSchedule.appointment_start;
                schedule.appointment_end = newSchedule.appointment_end;

                db.Schedules.Update(schedule);
                db.SaveChanges();
            }
        }
    }
}
