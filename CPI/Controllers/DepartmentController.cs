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
    public class DepartmentController : ControllerBase
    {
        DBContext db;

        public DepartmentController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Department> Get()
        {
            return db.Departments.ToArray();
        }

        [HttpGet("{code}")]
        public Department Get(int code)
        {
            return db.Departments.Find(code);
        }
    }
}
