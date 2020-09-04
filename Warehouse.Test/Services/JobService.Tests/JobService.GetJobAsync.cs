using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Warehouse.Contexts;
using Warehouse.Models;
using Warehouse.Test.Seeds;

namespace Warehouse.Test.Services.JobService.Tests
{
    [TestFixture]
    public class JobServiceGetJobAsync
    {
        private DbContextOptions<TenantDataContext> _dbOptions;

        [SetUp]
        public async Task Setup()
        {
            _dbOptions = new DbContextOptionsBuilder<TenantDataContext>()
                .UseInMemoryDatabase(databaseName: "tenantdb").Options;

            using (var context = new TenantDataContext(_dbOptions))
            {
                Console.WriteLine("Starting data seed");
                await TenantDataContextTestSeed.SeedAsync(context, new CreateTenant()
                {
                    Tenant = new TenantConfig()
                    {
                        Name = "Test"
                    },
                    UserId = Guid.NewGuid()
                });
            }
        }

        [Test]
        public async Task GetJobAsync_ReturnsCorrectJob()
        {
            using (var context = new TenantDataContext(_dbOptions))
            {
                var jobService = new Warehouse.Services.JobService(context);
                var id = new Guid("0C8EBA6A-9765-43FB-A80D-A8C06D46AA2F");
                var job = await jobService.GetJobAsync(id);
                Assert.AreEqual(id, job.Id);
            }
        }
    }
}