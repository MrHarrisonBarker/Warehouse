using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Timeline.Neo.Helpers;
using Warehouse.Contexts;
using Warehouse.Models;

namespace Warehouse.Services
{
    public interface ITenantService
    {
        Task<TenantConfig> GetTenantFromHostAsync();
        Task<TenantConfig> GetTenantByNameAsync(string name);
        Task<bool> TenantExistsAsync(string name);
        Task<TenantConfig> CreateTenantAsync(CreateTenant createTenant);
        Task<bool> DeleteTenantAsync(TenantConfig tenant);
        Task<IList<TenantConfig>> GetAllTenantsAsync();
        Task<bool> AddUserAsync(string email);
        Task<bool> RemoveUserAsync(Guid userId);
        Task<bool> UpdateTenantAsync(TenantConfig tenant, TenantConfig tenantConfig);
    }

    public class TenantService : ITenantService
    {
        private readonly ITenantResolutionStrategy _tenantResolutionStrategy;
        private readonly MultiTenantContext _multiTenantContext;
        private readonly AppSettings _appSettings;

        public TenantService(MultiTenantContext multiTenantContext, ITenantResolutionStrategy tenantResolutionStrategy,
            IOptions<AppSettings> appSettings)
        {
            _tenantResolutionStrategy = tenantResolutionStrategy;
            _multiTenantContext = multiTenantContext;
            _appSettings = appSettings.Value;
        }

        public async Task<TenantConfig> GetTenantFromHostAsync()
        {
            var tenantIdentifier = await _tenantResolutionStrategy.GetTenantIdentifierAsync();

            if (tenantIdentifier == _appSettings.BaseHost)
            {
                return new TenantConfig()
                {
                    Name = _appSettings.BaseHost
                };
            }

            return await _multiTenantContext.TenantConfigs.FirstOrDefaultAsync(x => x.Name == tenantIdentifier);
        }

        public Task<TenantConfig> GetTenantByNameAsync(string name)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> TenantExistsAsync(string name)
        {
            throw new System.NotImplementedException();
        }

        public async Task<TenantConfig> CreateTenantAsync(CreateTenant createTenant)
        {
            var tenant = new TenantConfig()
            {
                Name = createTenant.Tenant.Name,
                DbName = $"warehousedb{createTenant.Tenant.Name}",
                DbServer = "localhost",
                DbUser = "darth",
                DbPassword = "Star3wars",
                Accent = createTenant.Tenant.Accent,
                Avatar = createTenant.Tenant.Avatar,
                Description = createTenant.Tenant.Description
            };

            if ((await _multiTenantContext.TenantConfigs.FirstOrDefaultAsync(x => x.Name == tenant.Name)) != null)
            {
                return null;
            }

            await _multiTenantContext.TenantConfigs.AddAsync(tenant);
            
            var employment = new Employment()
            {
                TenantId = tenant.Id,
                UserId = createTenant.UserId
            };
            await _multiTenantContext.Employments.AddAsync(employment);
            
            try
            {
                await _multiTenantContext.SaveChangesAsync();

                var optionsBuilder = new DbContextOptionsBuilder<TenantDataContext>();
                optionsBuilder.UseMySql(tenant.ConnectionString());

                var dbContext = new TenantDataContext(optionsBuilder.Options);
                await TenantDataContextSeed.SeedAsync(dbContext, createTenant);

                return tenant;
            }
            catch
            {
                return null;
            }
        }

        public Task<bool> DeleteTenantAsync(TenantConfig tenant)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IList<TenantConfig>> GetAllTenantsAsync()
        {
            Console.WriteLine("Getting all tenant configs");
            return await _multiTenantContext.TenantConfigs.Include(x => x.Employments).ToListAsync();
        }

        public async Task<bool> AddUserAsync(string email)
        {
            Console.WriteLine($"Adding user {email}");

            var user = await _multiTenantContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            var tenant = await GetTenantFromHostAsync();

            if (user == null || tenant == null)
            {
                Console.WriteLine("Cannot find user or tenant");
                return false;
            }

            if (user.Employments == null)
            {
                user.Employments = new List<Employment>();
            }

            user.Employments.Add(new Employment() {TenantId = tenant.Id, UserId = user.Id});

            try
            {
                await _multiTenantContext.SaveChangesAsync();

                try
                {
                    using (var context = CreateContext(tenant))
                    {
                        var tenantUserService = new TenantUserService(context);
                        await tenantUserService.CreateAsync(user.Id);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> RemoveUserAsync(Guid userId)
        {
            var tenant = await GetTenantFromHostAsync();

            if (tenant == null)
            {
                Console.WriteLine("Tenant doesnt exist or could not be found");
                return false;
            }

            var employment = await _multiTenantContext.Employments.FirstOrDefaultAsync(x => x.TenantId == tenant.Id);

            if (employment == null)
            {
                Console.WriteLine("Employment doesnt exist");
                return false;
            }

            _multiTenantContext.Employments.Remove(employment);

            try
            {
                await _multiTenantContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> UpdateTenantAsync(TenantConfig tenant, TenantConfig tenantConfig)
        {
            tenant.Accent = tenantConfig.Accent;
            tenant.Avatar = tenantConfig.Avatar;
            tenant.Description = tenantConfig.Description;
            tenant.Name = tenantConfig.Name;

            // _multiTenantContext.TenantConfigs.Update(tenantConfig);
            try
            {
                await _multiTenantContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public TenantDataContext CreateContext(TenantConfig tenant)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TenantDataContext>();
            optionsBuilder.UseMySql(tenant.ConnectionString());

            return new TenantDataContext(optionsBuilder.Options);
        }
    }
}