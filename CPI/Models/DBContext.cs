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
        public DbSet<CouponTemplate> CouponTemplates { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<PassData> PassData { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Speciality> Specialities { get; set; }

        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            string adminRoleName = "Администратор";
            string userRoleName = "Пациент";
            string doctorRoleName = "Доктор";

            string adminLogin = "admin";
            string adminPassword = "admin";

            PassData adminUser = new PassData(adminLogin, adminPassword, adminRoleName);
            // добавляем роли
            //Role adminRole = new Role { Id = 1, Name = adminRoleName };
            //Role userRole = new Role { Id = 2, Name = userRoleName };
            //User adminUser = new User { Id = 1, Email = adminEmail, Password = adminPassword, RoleId = adminRole.Id };

            //modelBuilder.Entity<PassData>().HasData(new PassData[] { adminRole, userRole });
            modelBuilder.Entity<PassData>().HasData(new PassData[] { adminUser });
            base.OnModelCreating(modelBuilder);
        }
    }
}
