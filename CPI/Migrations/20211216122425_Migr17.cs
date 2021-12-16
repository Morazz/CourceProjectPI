using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Departments_department_code1",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Schedules_schedule_code1",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Specialities_speciality_code1",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_department_code1",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_schedule_code1",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_speciality_code1",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "department_code1",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "schedule_code1",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "speciality_code1",
                table: "Doctors");

            migrationBuilder.AlterColumn<string>(
                name: "speciality_code",
                table: "Doctors",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_department_code",
                table: "Doctors",
                column: "department_code");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_schedule_code",
                table: "Doctors",
                column: "schedule_code");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_speciality_code",
                table: "Doctors",
                column: "speciality_code");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Departments_department_code",
                table: "Doctors",
                column: "department_code",
                principalTable: "Departments",
                principalColumn: "department_code",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Schedules_schedule_code",
                table: "Doctors",
                column: "schedule_code",
                principalTable: "Schedules",
                principalColumn: "schedule_code",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Specialities_speciality_code",
                table: "Doctors",
                column: "speciality_code",
                principalTable: "Specialities",
                principalColumn: "speciality_code",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Departments_department_code",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Schedules_schedule_code",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Specialities_speciality_code",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_department_code",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_schedule_code",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_speciality_code",
                table: "Doctors");

            migrationBuilder.AlterColumn<string>(
                name: "speciality_code",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "department_code1",
                table: "Doctors",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "schedule_code1",
                table: "Doctors",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "speciality_code1",
                table: "Doctors",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_department_code1",
                table: "Doctors",
                column: "department_code1");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_schedule_code1",
                table: "Doctors",
                column: "schedule_code1");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_speciality_code1",
                table: "Doctors",
                column: "speciality_code1");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Departments_department_code1",
                table: "Doctors",
                column: "department_code1",
                principalTable: "Departments",
                principalColumn: "department_code",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Schedules_schedule_code1",
                table: "Doctors",
                column: "schedule_code1",
                principalTable: "Schedules",
                principalColumn: "schedule_code",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Specialities_speciality_code1",
                table: "Doctors",
                column: "speciality_code1",
                principalTable: "Specialities",
                principalColumn: "speciality_code",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
