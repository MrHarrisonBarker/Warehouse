using Microsoft.EntityFrameworkCore.Migrations;

namespace Warehouse.Migrations
{
    public partial class fluff : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Accent",
                table: "TenantConfigs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "TenantConfigs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "TenantConfigs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accent",
                table: "TenantConfigs");

            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "TenantConfigs");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "TenantConfigs");
        }
    }
}
