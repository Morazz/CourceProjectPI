using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_PassData_PassDatalogin",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Schedules_schedule_code",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_PassDatalogin",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_schedule_code",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "PassDatalogin",
                table: "Doctors");

            migrationBuilder.AlterColumn<int>(
                name: "schedule_code",
                table: "Doctors",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "department_name",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "schedule_code1",
                table: "Doctors",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "speciality",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_schedule_code1",
                table: "Doctors",
                column: "schedule_code1");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_PassData_login",
                table: "Doctors",
                column: "login",
                principalTable: "PassData",
                principalColumn: "login",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Schedules_schedule_code1",
                table: "Doctors",
                column: "schedule_code1",
                principalTable: "Schedules",
                principalColumn: "schedule_code",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_PassData_login",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Schedules_schedule_code1",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_schedule_code1",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "department_name",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "schedule_code1",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "speciality",
                table: "Doctors");

            migrationBuilder.AlterColumn<int>(
                name: "schedule_code",
                table: "Doctors",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "PassDatalogin",
                table: "Doctors",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_PassDatalogin",
                table: "Doctors",
                column: "PassDatalogin");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_schedule_code",
                table: "Doctors",
                column: "schedule_code");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_PassData_PassDatalogin",
                table: "Doctors",
                column: "PassDatalogin",
                principalTable: "PassData",
                principalColumn: "login",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Schedules_schedule_code",
                table: "Doctors",
                column: "schedule_code",
                principalTable: "Schedules",
                principalColumn: "schedule_code",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
