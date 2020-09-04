using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Warehouse.Migrations.TenantData
{
    public partial class jobfinish : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Finished",
                table: "JobStatuses",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "Finished",
                table: "Jobs",
                nullable: true,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Finished",
                table: "JobStatuses");

            migrationBuilder.DropColumn(
                name: "Finished",
                table: "Jobs");
        }
    }
}
