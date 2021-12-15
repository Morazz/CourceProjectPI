using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_PassData_PassDatalogin",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_PassDatalogin",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "PassDatalogin",
                table: "Patients");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_PassData_login",
                table: "Patients",
                column: "login",
                principalTable: "PassData",
                principalColumn: "login",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_PassData_login",
                table: "Patients");

            migrationBuilder.AddColumn<string>(
                name: "PassDatalogin",
                table: "Patients",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_PassDatalogin",
                table: "Patients",
                column: "PassDatalogin");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_PassData_PassDatalogin",
                table: "Patients",
                column: "PassDatalogin",
                principalTable: "PassData",
                principalColumn: "login",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
