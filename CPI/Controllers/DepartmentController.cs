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

        [HttpPost]
        public void Insert(Department department)
        {
            db.Departments.Add(department);
            db.SaveChanges();
        }

        [HttpDelete]
        public void Delete(int code)
        {
            Department department = Get(code);
            if (department != null)
            {
                db.Departments.Remove(department);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(Department newDepartment)
        {
            Department department = Get(newDepartment.department_code);
            if (department != null)
            {
                department.department_name = newDepartment.department_name;
                department.head = newDepartment.head;
                db.Departments.Update(department);
                db.SaveChanges();
            }
        }
    }
}
