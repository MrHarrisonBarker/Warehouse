using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Warehouse.Migrations.TenantData
{
    public partial class projectmodules : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Modules",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Modules_ProjectId",
                table: "Modules",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Modules_Projects_ProjectId",
                table: "Modules",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Modules_Projects_ProjectId",
                table: "Modules");

            migrationBuilder.DropIndex(
                name: "IX_Modules_ProjectId",
                table: "Modules");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Modules");
        }
    }
}
