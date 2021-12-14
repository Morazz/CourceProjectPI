﻿// <auto-generated />
using System;
using CPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CPI.Migrations
{
    [DbContext(typeof(DBContext))]
    [Migration("20211214221910_Migr4")]
    partial class Migr4
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CPI.Models.Coupon", b =>
                {
                    b.Property<int>("coupon_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Doctorlogin")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Patientlogin")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("appointment_day")
                        .HasColumnType("datetime2");

                    b.Property<int?>("appointment_timetemplate_id")
                        .HasColumnType("int");

                    b.HasKey("coupon_id");

                    b.HasIndex("Doctorlogin");

                    b.HasIndex("Patientlogin");

                    b.HasIndex("appointment_timetemplate_id");

                    b.ToTable("Coupons");
                });

            modelBuilder.Entity("CPI.Models.CouponTemplate", b =>
                {
                    b.Property<int>("template_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("time")
                        .HasColumnType("datetime2");

                    b.HasKey("template_id");

                    b.ToTable("CouponTemplates");
                });

            modelBuilder.Entity("CPI.Models.Department", b =>
                {
                    b.Property<int>("department_code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("department_name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("head")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("department_code");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("CPI.Models.Doctor", b =>
                {
                    b.Property<string>("login")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PassDatalogin")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("cabinet")
                        .HasColumnType("int");

                    b.Property<int?>("department_code")
                        .HasColumnType("int");

                    b.Property<string>("fathername")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("firstname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("schedule_code")
                        .HasColumnType("int");

                    b.Property<string>("speciality_code")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("login");

                    b.HasIndex("PassDatalogin");

                    b.HasIndex("department_code");

                    b.HasIndex("schedule_code");

                    b.HasIndex("speciality_code");

                    b.ToTable("Doctors");
                });

            modelBuilder.Entity("CPI.Models.PassData", b =>
                {
                    b.Property<string>("login")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("status")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("login");

                    b.ToTable("PassData");

                    b.HasData(
                        new
                        {
                            login = "admin",
                            password = "admin",
                            status = "Администратор"
                        });
                });

            modelBuilder.Entity("CPI.Models.Patient", b =>
                {
                    b.Property<string>("login")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PassDatalogin")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("birthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("fathername")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("firstname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("phone_number")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("login");

                    b.HasIndex("PassDatalogin");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("CPI.Models.Schedule", b =>
                {
                    b.Property<int>("schedule_code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("appointment_end")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("appointment_start")
                        .HasColumnType("datetime2");

                    b.HasKey("schedule_code");

                    b.ToTable("Schedules");
                });

            modelBuilder.Entity("CPI.Models.Speciality", b =>
                {
                    b.Property<string>("speciality_code")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("speciality")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("speciality_code");

                    b.ToTable("Specialities");
                });

            modelBuilder.Entity("CPI.Models.Coupon", b =>
                {
                    b.HasOne("CPI.Models.Doctor", "Doctor")
                        .WithMany()
                        .HasForeignKey("Doctorlogin");

                    b.HasOne("CPI.Models.Patient", "Patient")
                        .WithMany("Coupons")
                        .HasForeignKey("Patientlogin");

                    b.HasOne("CPI.Models.CouponTemplate", "appointment_time")
                        .WithMany()
                        .HasForeignKey("appointment_timetemplate_id");

                    b.Navigation("appointment_time");

                    b.Navigation("Doctor");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("CPI.Models.Doctor", b =>
                {
                    b.HasOne("CPI.Models.PassData", "PassData")
                        .WithMany()
                        .HasForeignKey("PassDatalogin");

                    b.HasOne("CPI.Models.Department", "Department")
                        .WithMany("Doctors")
                        .HasForeignKey("department_code");

                    b.HasOne("CPI.Models.Schedule", "Schedule")
                        .WithMany("Doctors")
                        .HasForeignKey("schedule_code");

                    b.HasOne("CPI.Models.Speciality", "Speciality")
                        .WithMany("Doctors")
                        .HasForeignKey("speciality_code");

                    b.Navigation("Department");

                    b.Navigation("PassData");

                    b.Navigation("Schedule");

                    b.Navigation("Speciality");
                });

            modelBuilder.Entity("CPI.Models.Patient", b =>
                {
                    b.HasOne("CPI.Models.PassData", "PassData")
                        .WithMany()
                        .HasForeignKey("PassDatalogin");

                    b.Navigation("PassData");
                });

            modelBuilder.Entity("CPI.Models.Department", b =>
                {
                    b.Navigation("Doctors");
                });

            modelBuilder.Entity("CPI.Models.Patient", b =>
                {
                    b.Navigation("Coupons");
                });

            modelBuilder.Entity("CPI.Models.Schedule", b =>
                {
                    b.Navigation("Doctors");
                });

            modelBuilder.Entity("CPI.Models.Speciality", b =>
                {
                    b.Navigation("Doctors");
                });
#pragma warning restore 612, 618
        }
    }
}
