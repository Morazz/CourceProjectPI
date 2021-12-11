using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Initial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Days",
                columns: table => new
                {
                    day_code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    day = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Days", x => x.day_code);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    department_code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    department_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    head = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.department_code);
                });

            migrationBuilder.CreateTable(
                name: "PassData",
                columns: table => new
                {
                    login = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PassData", x => x.login);
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    schedule_code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    shift = table.Column<int>(type: "int", nullable: false),
                    appointment_start = table.Column<DateTime>(type: "datetime2", nullable: false),
                    appointment_end = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.schedule_code);
                });

            migrationBuilder.CreateTable(
                name: "Specialities",
                columns: table => new
                {
                    speciality_code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    speciality = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specialities", x => x.speciality_code);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    login = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    firstname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fathername = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    surname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    birthday = table.Column<DateTime>(type: "datetime2", nullable: false),
                    gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phone_number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PassDatalogin = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.login);
                    table.ForeignKey(
                        name: "FK_Patients_PassData_PassDatalogin",
                        column: x => x.PassDatalogin,
                        principalTable: "PassData",
                        principalColumn: "login",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Doctors",
                columns: table => new
                {
                    login = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    firstname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fathername = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    surname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cabinet = table.Column<int>(type: "int", nullable: false),
                    department_code = table.Column<int>(type: "int", nullable: true),
                    schedule_code = table.Column<int>(type: "int", nullable: true),
                    speciality_code = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    PassDatalogin = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctors", x => x.login);
                    table.ForeignKey(
                        name: "FK_Doctors_Departments_department_code",
                        column: x => x.department_code,
                        principalTable: "Departments",
                        principalColumn: "department_code",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Doctors_PassData_PassDatalogin",
                        column: x => x.PassDatalogin,
                        principalTable: "PassData",
                        principalColumn: "login",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Doctors_Schedules_schedule_code",
                        column: x => x.schedule_code,
                        principalTable: "Schedules",
                        principalColumn: "schedule_code",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Doctors_Specialities_speciality_code",
                        column: x => x.speciality_code,
                        principalTable: "Specialities",
                        principalColumn: "speciality_code",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Coupons",
                columns: table => new
                {
                    coupon_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    coupon_number = table.Column<int>(type: "int", nullable: false),
                    appointment_day = table.Column<DateTime>(type: "datetime2", nullable: false),
                    appointment_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    cabinet = table.Column<int>(type: "int", nullable: false),
                    Patientlogin = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Doctorlogin = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coupons", x => x.coupon_id);
                    table.ForeignKey(
                        name: "FK_Coupons_Doctors_Doctorlogin",
                        column: x => x.Doctorlogin,
                        principalTable: "Doctors",
                        principalColumn: "login",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Coupons_Patients_Patientlogin",
                        column: x => x.Patientlogin,
                        principalTable: "Patients",
                        principalColumn: "login",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_Doctorlogin",
                table: "Coupons",
                column: "Doctorlogin");

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_Patientlogin",
                table: "Coupons",
                column: "Patientlogin");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_department_code",
                table: "Doctors",
                column: "department_code");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_PassDatalogin",
                table: "Doctors",
                column: "PassDatalogin");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_schedule_code",
                table: "Doctors",
                column: "schedule_code");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_speciality_code",
                table: "Doctors",
                column: "speciality_code");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_PassDatalogin",
                table: "Patients",
                column: "PassDatalogin");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Coupons");

            migrationBuilder.DropTable(
                name: "Days");

            migrationBuilder.DropTable(
                name: "Doctors");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "Specialities");

            migrationBuilder.DropTable(
                name: "PassData");
        }
    }
}
