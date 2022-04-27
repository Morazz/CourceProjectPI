using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class MigrD03 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Hospital_hospital_id",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Hospital_Schedules_schedule_code",
                table: "Hospital");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hospital",
                table: "Hospital");

            migrationBuilder.RenameTable(
                name: "Hospital",
                newName: "Hospitals");

            migrationBuilder.RenameIndex(
                name: "IX_Hospital_schedule_code",
                table: "Hospitals",
                newName: "IX_Hospitals_schedule_code");

            migrationBuilder.AddColumn<string>(
                name: "mail",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hospitals",
                table: "Hospitals",
                column: "hospital_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Hospitals_hospital_id",
                table: "Doctors",
                column: "hospital_id",
                principalTable: "Hospitals",
                principalColumn: "hospital_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Hospitals_Schedules_schedule_code",
                table: "Hospitals",
                column: "schedule_code",
                principalTable: "Schedules",
                principalColumn: "schedule_code",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Hospitals_hospital_id",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Hospitals_Schedules_schedule_code",
                table: "Hospitals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hospitals",
                table: "Hospitals");

            migrationBuilder.DropColumn(
                name: "mail",
                table: "Patients");

            migrationBuilder.RenameTable(
                name: "Hospitals",
                newName: "Hospital");

            migrationBuilder.RenameIndex(
                name: "IX_Hospitals_schedule_code",
                table: "Hospital",
                newName: "IX_Hospital_schedule_code");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hospital",
                table: "Hospital",
                column: "hospital_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Hospital_hospital_id",
                table: "Doctors",
                column: "hospital_id",
                principalTable: "Hospital",
                principalColumn: "hospital_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Hospital_Schedules_schedule_code",
                table: "Hospital",
                column: "schedule_code",
                principalTable: "Schedules",
                principalColumn: "schedule_code",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
