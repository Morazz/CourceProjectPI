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
            //string adminRoleName = "Администратор";
            //string patientRoleName = "Пациент";
            //string doctorRoleName = "Доктор";

            //string adminLogin = "admin";
            //string adminPassword = "admin";

            //string patientLogin = "pat1";
            //string patientPassword = "pat1";

            //string doctorLogin = "doc1";
            //string doctorPassword = "doc1";

            //PassData adminUser = new PassData(adminLogin, adminPassword, adminRoleName);
            //PassData patientUser = new PassData(patientLogin, patientPassword, patientRoleName);
            //PassData doctorUser = new PassData(doctorLogin, doctorPassword, doctorRoleName);

            //modelBuilder.Entity<PassData>().HasData(new PassData[] { adminUser, patientUser, doctorUser });
            base.OnModelCreating(modelBuilder);
        }
    }
}
