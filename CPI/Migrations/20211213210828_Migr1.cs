using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class Migr1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_CouponTempates_CouponTemplatetemplate_id",
                table: "Coupons");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Departments_department_code",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Schedules_schedule_code",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Specialities_speciality_code",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_department_code",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_schedule_code",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_speciality_code",
                table: "Doctors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CouponTempates",
                table: "CouponTempates");

            migrationBuilder.RenameTable(
                name: "CouponTempates",
                newName: "CouponTemplates");

            migrationBuilder.AlterColumn<string>(
                name: "speciality_code",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "schedule_code",
                table: "Doctors",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "department_code",
                table: "Doctors",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "department_code1",
                table: "Doctors",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "schedule_code1",
                table: "Doctors",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "speciality_code1",
                table: "Doctors",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CouponTemplates",
                table: "CouponTemplates",
                column: "template_id");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_department_code1",
                table: "Doctors",
                column: "department_code1");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_schedule_code1",
                table: "Doctors",
                column: "schedule_code1");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_speciality_code1",
                table: "Doctors",
                column: "speciality_code1");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_CouponTemplates_CouponTemplatetemplate_id",
                table: "Coupons",
                column: "CouponTemplatetemplate_id",
                principalTable: "CouponTemplates",
                principalColumn: "template_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Departments_department_code1",
                table: "Doctors",
                column: "department_code1",
                principalTable: "Departments",
                principalColumn: "department_code",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Schedules_schedule_code1",
                table: "Doctors",
                column: "schedule_code1",
                principalTable: "Schedules",
                principalColumn: "schedule_code",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Specialities_speciality_code1",
                table: "Doctors",
                column: "speciality_code1",
                principalTable: "Specialities",
                principalColumn: "speciality_code",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_CouponTemplates_CouponTemplatetemplate_id",
                table: "Coupons");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Departments_department_code1",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Schedules_schedule_code1",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Specialities_speciality_code1",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_department_code1",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_schedule_code1",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_speciality_code1",
                table: "Doctors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CouponTemplates",
                table: "CouponTemplates");

            migrationBuilder.DropColumn(
                name: "department_code1",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "schedule_code1",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "speciality_code1",
                table: "Doctors");

            migrationBuilder.RenameTable(
                name: "CouponTemplates",
                newName: "CouponTempates");

            migrationBuilder.AlterColumn<string>(
                name: "speciality_code",
                table: "Doctors",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "schedule_code",
                table: "Doctors",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "department_code",
                table: "Doctors",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CouponTempates",
                table: "CouponTempates",
                column: "template_id");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_department_code",
                table: "Doctors",
                column: "department_code");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_schedule_code",
                table: "Doctors",
                column: "schedule_code");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_speciality_code",
                table: "Doctors",
                column: "speciality_code");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_CouponTempates_CouponTemplatetemplate_id",
                table: "Coupons",
                column: "CouponTemplatetemplate_id",
                principalTable: "CouponTempates",
                principalColumn: "template_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Departments_department_code",
                table: "Doctors",
                column: "department_code",
                principalTable: "Departments",
                principalColumn: "department_code",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Schedules_schedule_code",
                table: "Doctors",
                column: "schedule_code",
                principalTable: "Schedules",
                principalColumn: "schedule_code",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Specialities_speciality_code",
                table: "Doctors",
                column: "speciality_code",
                principalTable: "Specialities",
                principalColumn: "speciality_code",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
