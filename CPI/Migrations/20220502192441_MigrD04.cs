using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class MigrD04 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "Hospitals",
                newName: "hospital_name");

            migrationBuilder.RenameColumn(
                name: "address",
                table: "Hospitals",
                newName: "hospital_address");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "hospital_name",
                table: "Hospitals",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "hospital_address",
                table: "Hospitals",
                newName: "address");
        }
    }
}
