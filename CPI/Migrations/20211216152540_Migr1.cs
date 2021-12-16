using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PassData",
                columns: new[] { "login", "password", "status" },
                values: new object[] { "pat1", "pat1", "Пациент" });

            migrationBuilder.InsertData(
                table: "PassData",
                columns: new[] { "login", "password", "status" },
                values: new object[] { "doc1", "doc1", "Доктор" });
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
