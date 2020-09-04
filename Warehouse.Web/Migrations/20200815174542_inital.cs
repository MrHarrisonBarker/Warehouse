using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Warehouse.Migrations
{
    public partial class inital : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TenantConfigs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    DbServer = table.Column<string>(nullable: true),
                    DbName = table.Column<string>(nullable: true),
                    DbUser = table.Column<string>(nullable: true),
                    DbPassword = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TenantConfigs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TenantConfigs");
        }
    }
}
