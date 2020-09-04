using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Warehouse.Contexts;
using Warehouse.Models;

namespace Warehouse.Services
{
    public interface IEventService
    {
        Task<IList<Event>> GetAllEventsAsync();
        Task<Event> GetEventAsync(Guid id);
        Task<bool> CreateEventAsync(Event project);
        Task<bool> DeleteEventAsync(Event project);
    }

    public class EventService : IEventService
    {
        private readonly TenantDataContext _tenantDataContext;

        public EventService(TenantDataContext tenantDataContext)
        {
            _tenantDataContext = tenantDataContext;
        }

        public async Task<IList<Event>> GetAllEventsAsync()
        {
            return await _tenantDataContext.Events.ToListAsync();
        }

        public async Task<Event> GetEventAsync(Guid id)
        {
            return await _tenantDataContext.Events.FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<bool> CreateEventAsync(Event project)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteEventAsync(Event project)
        {
            throw new NotImplementedException();
        }
    }
}