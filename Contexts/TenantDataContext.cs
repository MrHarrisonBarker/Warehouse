using Microsoft.EntityFrameworkCore;
using Warehouse.Models;
using Warehouse.Models.Joins;

namespace Warehouse.Contexts
{
    public class TenantDataContext : DbContext
    {
        public TenantDataContext(DbContextOptions<TenantDataContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<List> Lists { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<UserId> UserIds { get; set; }

        public DbSet<JobPriority> JobPriorities { get; set; }
        public DbSet<JobStatus> JobStatuses { get; set; }
        public DbSet<JobType> JobTypes { get; set; }

        public DbSet<ProjectEmployment> ProjectEmployment { get; set; }
        public DbSet<ListEmployment> ListEmployment { get; set; }
        public DbSet<JobEmployment> JobEmployment { get; set; }
        public DbSet<RoomMembership> RoomMembership { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Projects

            modelBuilder.Entity<Project>()
                .HasMany(x => x.Rooms)
                .WithOne(x => x.Project);

            modelBuilder.Entity<Project>()
                .HasMany(x => x.Events)
                .WithOne(x => x.Project);

            modelBuilder.Entity<Project>()
                .HasMany(x => x.Lists)
                .WithOne(x => x.Project);

            modelBuilder.Entity<Project>()
                .HasMany(x => x.Jobs)
                .WithOne(x => x.Project);

            // Project <-> Userid

            modelBuilder.Entity<ProjectEmployment>()
                .HasKey(x => new {x.ProjectId, x.UserId});

            modelBuilder.Entity<ProjectEmployment>()
                .HasOne(pe => pe.Project)
                .WithMany(x => x.Employments)
                .HasForeignKey(pe => pe.ProjectId);

            modelBuilder.Entity<ProjectEmployment>()
                .HasOne(pe => pe.User)
                .WithMany(x => x.ProjectEmployments)
                .HasForeignKey(pe => pe.UserId);

            // Lists

            modelBuilder.Entity<List>()
                .HasMany(x => x.Jobs)
                .WithOne(x => x.List);

            // List <-> Userid

            modelBuilder.Entity<ListEmployment>()
                .HasKey(x => new {x.ListId, x.UserId});

            modelBuilder.Entity<ListEmployment>()
                .HasOne(le => le.List)
                .WithMany(x => x.Employments)
                .HasForeignKey(le => le.ListId);

            modelBuilder.Entity<ListEmployment>()
                .HasOne(le => le.User)
                .WithMany(x => x.ListEmployments)
                .HasForeignKey(le => le.UserId);

            // Rooms

            modelBuilder.Entity<Room>()
                .HasMany(x => x.Chats)
                .WithOne(x => x.Room);

            // Room <-> Userid

            modelBuilder.Entity<RoomMembership>()
                .HasKey(x => new {x.RoomId, x.UserId});

            modelBuilder.Entity<RoomMembership>()
                .HasOne(le => le.Room)
                .WithMany(x => x.Memberships)
                .HasForeignKey(le => le.RoomId);

            modelBuilder.Entity<RoomMembership>()
                .HasOne(le => le.User)
                .WithMany(x => x.RoomMemberships)
                .HasForeignKey(le => le.UserId);

            // Jobs
            // Job <-> Userid

            modelBuilder.Entity<JobEmployment>()
                .HasKey(x => new {x.JobId, x.UserId});

            modelBuilder.Entity<JobEmployment>()
                .HasOne(le => le.Job)
                .WithMany(x => x.Employments)
                .HasForeignKey(le => le.JobId);

            modelBuilder.Entity<JobEmployment>()
                .HasOne(le => le.User)
                .WithMany(x => x.JobEmployments)
                .HasForeignKey(le => le.UserId);

            modelBuilder.Entity<JobPriority>().HasMany(x => x.Jobs).WithOne(x => x.JobPriority);
            modelBuilder.Entity<JobStatus>().HasMany(x => x.Jobs).WithOne(x => x.JobStatus);
            modelBuilder.Entity<JobType>().HasMany(x => x.Jobs).WithOne(x => x.JobType);
        }
    }
}