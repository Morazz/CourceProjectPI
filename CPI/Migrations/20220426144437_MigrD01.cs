using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class MigrD01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "hospital_id",
                table: "Patients",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "achievements",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "education",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "hospital_id",
                table: "Doctors",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "photo",
                table: "Doctors",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Hospital",
                columns: table => new
                {
                    hospital_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    schedule_code = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hospital", x => x.hospital_id);
                    table.ForeignKey(
                        name: "FK_Hospital_Schedules_schedule_code",
                        column: x => x.schedule_code,
                        principalTable: "Schedules",
                        principalColumn: "schedule_code",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "PassData",
                columns: new[] { "login", "password", "status" },
                values: new object[] { "admin", "admin", "Администратор" });

            migrationBuilder.CreateIndex(
                name: "IX_Patients_hospital_id",
                table: "Patients",
                column: "hospital_id");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_hospital_id",
                table: "Doctors",
                column: "hospital_id");

            migrationBuilder.CreateIndex(
                name: "IX_Hospital_schedule_code",
                table: "Hospital",
                column: "schedule_code");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Hospital_hospital_id",
                table: "Doctors",
                column: "hospital_id",
                principalTable: "Hospital",
                principalColumn: "hospital_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Hospital_hospital_id",
                table: "Patients",
                column: "hospital_id",
                principalTable: "Hospital",
                principalColumn: "hospital_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Hospital_hospital_id",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Hospital_hospital_id",
                table: "Patients");

            migrationBuilder.DropTable(
                name: "Hospital");

            migrationBuilder.DropIndex(
                name: "IX_Patients_hospital_id",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_hospital_id",
                table: "Doctors");

            migrationBuilder.DeleteData(
                table: "PassData",
                keyColumn: "login",
                keyValue: "admin");

            migrationBuilder.DropColumn(
                name: "hospital_id",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "achievements",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "education",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "hospital_id",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "photo",
                table: "Doctors");
        }
    }
}
