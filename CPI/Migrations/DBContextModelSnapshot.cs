﻿// <auto-generated />
using System;
using CPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CPI.Migrations
{
    [DbContext(typeof(DBContext))]
    partial class DBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<DateTime>("appointment_day")
                        .HasColumnType("datetime2");

                    b.Property<string>("doctor_login")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("patient_login")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("template_id")
                        .HasColumnType("int");

                    b.HasKey("coupon_id");

                    b.HasIndex("doctor_login");

                    b.HasIndex("patient_login");

                    b.HasIndex("template_id");

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
                });

            modelBuilder.Entity("CPI.Models.Patient", b =>
                {
                    b.Property<string>("login")
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
                        .HasForeignKey("doctor_login");

                    b.HasOne("CPI.Models.Patient", "Patient")
                        .WithMany()
                        .HasForeignKey("patient_login");

                    b.HasOne("CPI.Models.CouponTemplate", "CouponTemplate")
                        .WithMany()
                        .HasForeignKey("template_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CouponTemplate");

                    b.Navigation("Doctor");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("CPI.Models.Doctor", b =>
                {
                    b.HasOne("CPI.Models.Department", "Department")
                        .WithMany()
                        .HasForeignKey("department_code");

                    b.HasOne("CPI.Models.PassData", "PassData")
                        .WithMany()
                        .HasForeignKey("login")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CPI.Models.Schedule", "Schedule")
                        .WithMany()
                        .HasForeignKey("schedule_code");

                    b.HasOne("CPI.Models.Speciality", "Speciality")
                        .WithMany()
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
                        .HasForeignKey("login")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PassData");
                });
#pragma warning restore 612, 618
        }
    }
}
