using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "appointment_time",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "cabinet",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "coupon_number",
                table: "Coupons");

            migrationBuilder.AddColumn<int>(
                name: "appointment_timetemplate_id",
                table: "Coupons",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_appointment_timetemplate_id",
                table: "Coupons",
                column: "appointment_timetemplate_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_CouponTemplates_appointment_timetemplate_id",
                table: "Coupons",
                column: "appointment_timetemplate_id",
                principalTable: "CouponTemplates",
                principalColumn: "template_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_CouponTemplates_appointment_timetemplate_id",
                table: "Coupons");

            migrationBuilder.DropIndex(
                name: "IX_Coupons_appointment_timetemplate_id",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "appointment_timetemplate_id",
                table: "Coupons");

            migrationBuilder.AddColumn<DateTime>(
                name: "appointment_time",
                table: "Coupons",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "cabinet",
                table: "Coupons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "coupon_number",
                table: "Coupons",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
