using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class MigrD02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Hospital_hospital_id",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_hospital_id",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "hospital_id",
                table: "Patients");

            migrationBuilder.RenameColumn(
                name: "achievements",
                table: "Doctors",
                newName: "regards");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "regards",
                table: "Doctors",
                newName: "achievements");

            migrationBuilder.AddColumn<string>(
                name: "hospital_id",
                table: "Patients",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_hospital_id",
                table: "Patients",
                column: "hospital_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Hospital_hospital_id",
                table: "Patients",
                column: "hospital_id",
                principalTable: "Hospital",
                principalColumn: "hospital_id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
