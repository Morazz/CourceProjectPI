using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class MigrD08 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "hospital_type",
                table: "Hospitals",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "hospital_type",
                table: "Hospitals");
        }
    }
}
