using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PassData",
                keyColumn: "login",
                keyValue: "doc1");

            migrationBuilder.DeleteData(
                table: "PassData",
                keyColumn: "login",
                keyValue: "pat1");
        }
    }
}
