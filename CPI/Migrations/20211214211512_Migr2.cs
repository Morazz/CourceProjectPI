using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_CouponTemplates_CouponTemplatetemplate_id",
                table: "Coupons");

            migrationBuilder.DropIndex(
                name: "IX_Coupons_CouponTemplatetemplate_id",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "CouponTemplatetemplate_id",
                table: "Coupons");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CouponTemplatetemplate_id",
                table: "Coupons",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_CouponTemplatetemplate_id",
                table: "Coupons",
                column: "CouponTemplatetemplate_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_CouponTemplates_CouponTemplatetemplate_id",
                table: "Coupons",
                column: "CouponTemplatetemplate_id",
                principalTable: "CouponTemplates",
                principalColumn: "template_id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
