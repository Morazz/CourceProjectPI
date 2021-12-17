using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Schedules_schedule_code",
                table: "Doctors");

            migrationBuilder.AlterColumn<int>(
                name: "schedule_code",
                table: "Doctors",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Schedules_schedule_code",
                table: "Doctors",
                column: "schedule_code",
                principalTable: "Schedules",
                principalColumn: "schedule_code",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Schedules_schedule_code",
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

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Schedules_schedule_code",
                table: "Doctors",
                column: "schedule_code",
                principalTable: "Schedules",
                principalColumn: "schedule_code",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
