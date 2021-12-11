using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Initial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Days");

            migrationBuilder.DropColumn(
                name: "shift",
                table: "Schedules");

            migrationBuilder.AddColumn<int>(
                name: "CouponTemplatetemplate_id",
                table: "Coupons",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CouponTempates",
                columns: table => new
                {
                    template_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    time = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CouponTempates", x => x.template_id);
                });

            migrationBuilder.InsertData(
                table: "PassData",
                columns: new[] { "login", "password", "status" },
                values: new object[] { "admin", "admin", "Администратор" });

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_CouponTemplatetemplate_id",
                table: "Coupons",
                column: "CouponTemplatetemplate_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_CouponTempates_CouponTemplatetemplate_id",
                table: "Coupons",
                column: "CouponTemplatetemplate_id",
                principalTable: "CouponTempates",
                principalColumn: "template_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_CouponTempates_CouponTemplatetemplate_id",
                table: "Coupons");

            migrationBuilder.DropTable(
                name: "CouponTempates");

            migrationBuilder.DropIndex(
                name: "IX_Coupons_CouponTemplatetemplate_id",
                table: "Coupons");

            migrationBuilder.DeleteData(
                table: "PassData",
                keyColumn: "login",
                keyValue: "admin");

            migrationBuilder.DropColumn(
                name: "CouponTemplatetemplate_id",
                table: "Coupons");

            migrationBuilder.AddColumn<int>(
                name: "shift",
                table: "Schedules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Days",
                columns: table => new
                {
                    day_code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    day = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Days", x => x.day_code);
                });
        }
    }
}
