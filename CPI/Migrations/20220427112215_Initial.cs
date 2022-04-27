using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "hospital_id",
                table: "Departments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Departments_hospital_id",
                table: "Departments",
                column: "hospital_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Hospitals_hospital_id",
                table: "Departments",
                column: "hospital_id",
                principalTable: "Hospitals",
                principalColumn: "hospital_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Hospitals_hospital_id",
                table: "Departments");

            migrationBuilder.DropIndex(
                name: "IX_Departments_hospital_id",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "hospital_id",
                table: "Departments");
        }
    }
}
