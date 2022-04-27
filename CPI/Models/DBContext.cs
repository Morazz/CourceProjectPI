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
        public DbSet<Hospital> Hospitals { get; set; }

        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            string adminLogin = "admin";
            string adminPassword = "admin";

            PassData adminUser = new PassData(adminLogin, adminPassword, "Администратор");

            modelBuilder.Entity<PassData>().HasData(new PassData[] { adminUser });
            base.OnModelCreating(modelBuilder);
        }
    }
}
