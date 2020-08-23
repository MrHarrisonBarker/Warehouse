using Microsoft.EntityFrameworkCore;
using Warehouse.Models;

namespace Warehouse.Contexts
{
    public class MultiTenantContext : DbContext
    {
        public MultiTenantContext(DbContextOptions<MultiTenantContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<TenantConfig> TenantConfigs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Employment> Employments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User <-> TenantConfig
            modelBuilder.Entity<Employment>()
                .HasKey(x => new {x.TenantId, x.UserId});

            modelBuilder.Entity<Employment>()
                .HasOne(pe => pe.TenantConfig)
                .WithMany(x => x.Employments)
                .HasForeignKey(pe => pe.TenantId);

            modelBuilder.Entity<Employment>()
                .HasOne(pe => pe.User)
                .WithMany(x => x.Employments)
                .HasForeignKey(pe => pe.UserId);

            // User <-> Role
            modelBuilder.Entity<Permission>()
                .HasKey(x => new {x.RoleId, x.UserId});

            modelBuilder.Entity<Permission>()
                .HasOne(pe => pe.Role)
                .WithMany(x => x.Permissions)
                .HasForeignKey(pe => pe.RoleId);

            modelBuilder.Entity<Permission>()
                .HasOne(pe => pe.User)
                .WithMany(x => x.Permissions)
                .HasForeignKey(pe => pe.UserId);
        }
    }
}