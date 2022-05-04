using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class MigrD05 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "hospital_id",
                table: "Coupons",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_hospital_id",
                table: "Coupons",
                column: "hospital_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_Hospitals_hospital_id",
                table: "Coupons",
                column: "hospital_id",
                principalTable: "Hospitals",
                principalColumn: "hospital_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_Hospitals_hospital_id",
                table: "Coupons");

            migrationBuilder.DropIndex(
                name: "IX_Coupons_hospital_id",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "hospital_id",
                table: "Coupons");
        }
    }
}
