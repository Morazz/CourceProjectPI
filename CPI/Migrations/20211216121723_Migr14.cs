using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_PassData_PassDatalogin",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_PassDatalogin",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "PassDatalogin",
                table: "Doctors");

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

            migrationBuilder.AddColumn<string>(
                name: "PassDatalogin",
                table: "Doctors",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_PassDatalogin",
                table: "Doctors",
                column: "PassDatalogin");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_PassData_PassDatalogin",
                table: "Doctors",
                column: "PassDatalogin",
                principalTable: "PassData",
                principalColumn: "login",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
