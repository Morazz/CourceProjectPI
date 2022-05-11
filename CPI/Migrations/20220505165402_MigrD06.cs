using Microsoft.EntityFrameworkCore.Migrations;

namespace CPI.Migrations
{
    public partial class MigrD06 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Moderators",
                columns: table => new
                {
                    login = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    hospital_id = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Moderators", x => x.login);
                    table.ForeignKey(
                        name: "FK_Moderators_Hospitals_hospital_id",
                        column: x => x.hospital_id,
                        principalTable: "Hospitals",
                        principalColumn: "hospital_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Moderators_PassData_login",
                        column: x => x.login,
                        principalTable: "PassData",
                        principalColumn: "login",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Moderators_hospital_id",
                table: "Moderators",
                column: "hospital_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Moderators");
        }
    }
}
