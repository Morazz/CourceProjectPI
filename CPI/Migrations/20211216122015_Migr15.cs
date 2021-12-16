using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr15 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_PassData_login",
                table: "Doctors");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_PassData_login",
                table: "Doctors",
                column: "login",
                principalTable: "PassData",
                principalColumn: "login",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
