using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Warehouse.Contexts;
using Warehouse.Models;
using Warehouse.Services;

namespace Warehouse
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            CreateAndMigrateDatabases(host);
            host.Run();
        }

        private static async void CreateAndMigrateDatabases(IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var tenantService = scope.ServiceProvider.GetService<TenantService>();
                var tenants = await tenantService.GetAllTenantsAsync();

                foreach (var tenant in tenants)
                {
                    try
                    {
                        Console.WriteLine($"checking db for {tenant.Id} : {tenant.Name}");

                        var optionsBuilder = new DbContextOptionsBuilder<TenantDataContext>();
                        optionsBuilder.UseMySql(tenant.ConnectionString());

                        var dbContext = new TenantDataContext(optionsBuilder.Options);
                        TenantDataContextSeed.SeedAsync(dbContext, new CreateTenant()
                        {
                            Tenant = tenant
                        }).Wait();
                    }
                    catch (Exception exception)
                    {
                        Console.WriteLine(exception);
                    }
                }
            }
        }


        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}