using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class DBContext : DbContext
    {
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Day> Days { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<PassData> PassData { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Speciality> Specialities { get; set; }

        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    string adminRoleName = "admin";
        //    string userRoleName = "user";
        //    string doctorRoleName = "doctor";

        //    string adminLogin = "admin";
        //    string adminPassword = "admin";

        //    //// добавляем роли
        //    //Role adminRole = new Role { Id = 1, Name = adminRoleName };
        //    //Role userRole = new Role { Id = 2, Name = userRoleName };
        //    //User adminUser = new User { Id = 1, Email = adminEmail, Password = adminPassword, RoleId = adminRole.Id };

        //    //modelBuilder.Entity<Role>().HasData(new Role[] { adminRole, userRole });
        //    //modelBuilder.Entity<User>().HasData(new User[] { adminUser });
        //    //base.OnModelCreating(modelBuilder);
        //}
    }
}
