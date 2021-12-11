﻿using CPI.Models;
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

        [HttpGet("{id}")]
        public Schedule Get(int id)
        {
            return db.Schedules.Find(id);
        }

        [HttpPost]
        public void Insert(Schedule schedule)
        {
            db.Schedules.Add(schedule);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(Schedule schedule)
        {
            Schedule sch = Get(schedule.schedule_code);
            if (sch != null)
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
                schedule.shift = newSchedule.shift;
                schedule.appointment_start = newSchedule.appointment_start;
                schedule.appointment_end = newSchedule.appointment_end;

                db.Schedules.Update(schedule);
                db.SaveChanges();
            }
        }
    }
}
