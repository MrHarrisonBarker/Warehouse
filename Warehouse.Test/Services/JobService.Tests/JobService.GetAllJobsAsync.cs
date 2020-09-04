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
    public class JobServiceGetAllJobsAsync
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
        public async Task GetAllJobsAsync_ReturnsListOfJobs()
        {
            using (var context = new TenantDataContext(_dbOptions))
            {
                var jobService = new Warehouse.Services.JobService(context);
                Assert.AreEqual(10, (await jobService.GetAllJobsAsync()).Count);
            }
        }

        [Test]
        public async Task GetAllJobsAsync_ReturnsListOfValidJobs()
        {
            using (var context = new TenantDataContext(_dbOptions))
            {
                var jobService = new Warehouse.Services.JobService(context);
                var jobs = await jobService.GetAllJobsAsync();

                foreach (var job in jobs)
                {
                    Assert.IsNotNull(job);
                }
            }
        }
    }
}