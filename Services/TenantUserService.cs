using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Warehouse.Contexts;
using Warehouse.Models;
using Warehouse.Models.Joins;

namespace Warehouse.Services
{
    public interface ITenantUserService
    {
        Task<IList<UserId>> GetAllTenantUsersAsync();
        Task<bool> CreateAsync(Guid id);
    }

    public class TenantUserService : ITenantUserService
    {
        private readonly TenantDataContext _tenantDataContext;

        public TenantUserService(TenantDataContext tenantDataContext)
        {
            _tenantDataContext = tenantDataContext;
        }

        public async Task<IList<UserId>> GetAllTenantUsersAsync()
        {
            return await _tenantDataContext.UserIds
                .Include(x => x.JobEmployments)
                .Include(x => x.ListEmployments)
                .Include(x => x.ProjectEmployments)
                .Include(x => x.RoomMemberships).ToListAsync();
        }

        public async Task<bool> CreateAsync(Guid id)
        {
            var userId = new UserId()
            {
                Id = id,
                JobEmployments = new List<JobEmployment>(),
                ListEmployments = new List<ListEmployment>(),
                ProjectEmployments = new List<ProjectEmployment>(),
                RoomMemberships = new List<RoomMembership>()
            };

            await _tenantDataContext.UserIds.AddAsync(userId);

            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}