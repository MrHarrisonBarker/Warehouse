using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Bson;
using Warehouse.Models;

namespace Warehouse.Services
{
    public interface IOnlineUserService
    {
        TenantOnlineUserTracker GetAllTenantsUsers(Guid tenantId);
        TenantOnlineUserTracker AddUser(Guid tenantId, OnlineUser onlineUser);
        TenantOnlineUserTracker DisconnectUser(Guid tenantId, string connectionId);
    }

    public class OnlineUserService : IOnlineUserService
    {
        private List<TenantOnlineUserTracker> _onlineUserTrackers { get; set; } = new List<TenantOnlineUserTracker>();

        public OnlineUserService()
        {
        }

        public TenantOnlineUserTracker GetAllTenantsUsers(Guid tenantId)
        {
            return _onlineUserTrackers.FirstOrDefault(x => x.Id == tenantId);
        }

        public TenantOnlineUserTracker AddUser(Guid tenantId, OnlineUser onlineUser)
        {
            var tenantIndex = _onlineUserTrackers.FindIndex(x => x.Id == tenantId);

            if (tenantIndex == -1)
            {
                _onlineUserTrackers.Add(new TenantOnlineUserTracker()
                {
                    Id = tenantId,
                    OnlineUsers = new List<OnlineUser>() {onlineUser}
                });
                return _onlineUserTrackers.FirstOrDefault(x => x.Id == tenantId);
            }

            _onlineUserTrackers[tenantIndex].OnlineUsers.Add(onlineUser);

            return _onlineUserTrackers[tenantIndex];
        }

        public TenantOnlineUserTracker DisconnectUser(Guid tenantId, string connectionId)
        {
            var tenant = _onlineUserTrackers.FirstOrDefault(x => x.Id == tenantId);

            if (tenant != null)
            {
                var user = tenant.OnlineUsers.Find(x => x.ConnectionId == connectionId);
                tenant.OnlineUsers.Remove(user);
                Console.WriteLine("Removed connection");
                return tenant;
            }

            Console.WriteLine("Not tenant found");
            return null;
        }
    }
}