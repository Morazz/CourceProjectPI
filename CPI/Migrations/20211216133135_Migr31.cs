using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr31 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_PassData_login",
                table: "Doctors",
                column: "login",
                principalTable: "PassData",
                principalColumn: "login",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_PassData_login",
                table: "Doctors");
        }
    }
}
