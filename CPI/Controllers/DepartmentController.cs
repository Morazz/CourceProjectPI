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

        [HttpGet("ByDep/{dep}")]
        public Department GetByDep(string dep)
        {
            return db.Departments.Where(depart => depart.department_name == dep).FirstOrDefault();
        }

        [HttpGet("ByName/{name}")]
        public IEnumerable<Department> Get(string name)
        {
            return db.Departments.Where(dep => dep.department_name.Contains(name)).ToList();
        }

        [HttpGet("hosp/{id}")]
        public IEnumerable<Department> GetByHospital(string id)
        {
            return db.Departments.Where(dep => dep.hospital_id == id);
        }

        [HttpPost]
        public Department Insert(Department department)
        {
            db.Departments.Add(department);
            db.SaveChanges();
            return department;
        }

        [HttpDelete]
        public void Delete(int department_code)
        {
            Department department = Get(department_code);
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
