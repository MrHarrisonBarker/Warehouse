using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Warehouse.Migrations.TenantData
{
    public partial class data : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobPriorities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Colour = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobPriorities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JobStatuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Colour = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JobTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Colour = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    Accent = table.Column<string>(nullable: true),
                    Avatar = table.Column<string>(nullable: true),
                    Repo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserIds",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserIds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Time = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    ProjectId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Lists",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Deadline = table.Column<DateTime>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    ProjectId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lists_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ProjectId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rooms_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProjectEmployment",
                columns: table => new
                {
                    ProjectId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectEmployment", x => new { x.ProjectId, x.UserId });
                    table.ForeignKey(
                        name: "FK_ProjectEmployment_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectEmployment_UserIds_UserId",
                        column: x => x.UserId,
                        principalTable: "UserIds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Link = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    Deadline = table.Column<DateTime>(nullable: false),
                    AssociatedUrl = table.Column<string>(nullable: true),
                    Commit = table.Column<string>(nullable: true),
                    ListId = table.Column<Guid>(nullable: true),
                    ProjectId = table.Column<Guid>(nullable: true),
                    JobStatusId = table.Column<Guid>(nullable: true),
                    JobPriorityId = table.Column<Guid>(nullable: true),
                    JobTypeId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Jobs_JobPriorities_JobPriorityId",
                        column: x => x.JobPriorityId,
                        principalTable: "JobPriorities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Jobs_JobStatuses_JobStatusId",
                        column: x => x.JobStatusId,
                        principalTable: "JobStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Jobs_JobTypes_JobTypeId",
                        column: x => x.JobTypeId,
                        principalTable: "JobTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Jobs_Lists_ListId",
                        column: x => x.ListId,
                        principalTable: "Lists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Jobs_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ListEmployment",
                columns: table => new
                {
                    ListId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListEmployment", x => new { x.ListId, x.UserId });
                    table.ForeignKey(
                        name: "FK_ListEmployment_Lists_ListId",
                        column: x => x.ListId,
                        principalTable: "Lists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ListEmployment_UserIds_UserId",
                        column: x => x.UserId,
                        principalTable: "UserIds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Chats",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Message = table.Column<string>(nullable: true),
                    TimeStamp = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    RoomId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chats_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RoomMembership",
                columns: table => new
                {
                    RoomId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomMembership", x => new { x.RoomId, x.UserId });
                    table.ForeignKey(
                        name: "FK_RoomMembership_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoomMembership_UserIds_UserId",
                        column: x => x.UserId,
                        principalTable: "UserIds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobEmployment",
                columns: table => new
                {
                    JobId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobEmployment", x => new { x.JobId, x.UserId });
                    table.ForeignKey(
                        name: "FK_JobEmployment_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobEmployment_UserIds_UserId",
                        column: x => x.UserId,
                        principalTable: "UserIds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Chats_RoomId",
                table: "Chats",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_ProjectId",
                table: "Events",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_JobEmployment_UserId",
                table: "JobEmployment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_JobPriorityId",
                table: "Jobs",
                column: "JobPriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_JobStatusId",
                table: "Jobs",
                column: "JobStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_JobTypeId",
                table: "Jobs",
                column: "JobTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_ListId",
                table: "Jobs",
                column: "ListId");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_ProjectId",
                table: "Jobs",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ListEmployment_UserId",
                table: "ListEmployment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Lists_ProjectId",
                table: "Lists",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectEmployment_UserId",
                table: "ProjectEmployment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomMembership_UserId",
                table: "RoomMembership",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_ProjectId",
                table: "Rooms",
                column: "ProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Chats");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "JobEmployment");

            migrationBuilder.DropTable(
                name: "ListEmployment");

            migrationBuilder.DropTable(
                name: "ProjectEmployment");

            migrationBuilder.DropTable(
                name: "RoomMembership");

            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "UserIds");

            migrationBuilder.DropTable(
                name: "JobPriorities");

            migrationBuilder.DropTable(
                name: "JobStatuses");

            migrationBuilder.DropTable(
                name: "JobTypes");

            migrationBuilder.DropTable(
                name: "Lists");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
