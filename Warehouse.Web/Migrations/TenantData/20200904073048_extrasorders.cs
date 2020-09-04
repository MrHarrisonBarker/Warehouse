using Microsoft.EntityFrameworkCore.Migrations;

namespace Warehouse.Migrations.TenantData
{
    public partial class extrasorders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "JobTypes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "JobStatuses",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "JobPriorities",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "JobTypes");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "JobStatuses");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "JobPriorities");
        }
    }
}
