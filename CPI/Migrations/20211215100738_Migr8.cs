using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_CouponTemplates_template_id",
                table: "Coupons");

            migrationBuilder.RenameColumn(
                name: "template_id",
                table: "Coupons",
                newName: "template");

            migrationBuilder.RenameIndex(
                name: "IX_Coupons_template_id",
                table: "Coupons",
                newName: "IX_Coupons_template");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_CouponTemplates_template",
                table: "Coupons",
                column: "template",
                principalTable: "CouponTemplates",
                principalColumn: "template_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_CouponTemplates_template",
                table: "Coupons");

            migrationBuilder.RenameColumn(
                name: "template",
                table: "Coupons",
                newName: "template_id");

            migrationBuilder.RenameIndex(
                name: "IX_Coupons_template",
                table: "Coupons",
                newName: "IX_Coupons_template_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_CouponTemplates_template_id",
                table: "Coupons",
                column: "template_id",
                principalTable: "CouponTemplates",
                principalColumn: "template_id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
