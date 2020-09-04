using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using Warehouse.Models;
using Warehouse.Services;

namespace Warehouse.Hubs
{
    public class UserHub : Hub
    {
        private readonly IOnlineUserService _onlineUserService;
        private readonly TenantService _tenantService;

        public UserHub(IOnlineUserService onlineUserService, TenantService tenantService)
        {
            _onlineUserService = onlineUserService;
            _tenantService = tenantService;
        }

        public async Task AddUser(Guid userId)
        {
            Console.WriteLine($"adding user to connection list -> {userId}");

            var tenant = await _tenantService.GetTenantFromHostAsync();
            if (tenant != null)
            {
                var tenantOnlineUserTracker = _onlineUserService.AddUser(tenant.Id, new OnlineUser()
                {
                    ConnectionId = Context.ConnectionId,
                    Id = userId
                });

                Console.WriteLine($"sending connection list to connected users of tenant {tenant.Id}");

                await Clients.Clients(tenantOnlineUserTracker.OnlineUsers.Select(x => x.ConnectionId).ToList())
                    .SendAsync("ConnectionList", tenantOnlineUserTracker);
            }
        }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"Client Connected {Context.ConnectionId}");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine($"Client Disconnceted {Context.ConnectionId}");
            
            var tenant = await _tenantService.GetTenantFromHostAsync();
            if (tenant != null)
            {
                Console.WriteLine("Sending connection list after disconnect");
                var tenantOnlineUserTracker = _onlineUserService.DisconnectUser(tenant.Id,Context.ConnectionId);
                await Clients.Clients(tenantOnlineUserTracker.OnlineUsers.Select(x => x.ConnectionId).ToList())
                    .SendAsync("ConnectionList", tenantOnlineUserTracker);
            }
        }
    }
}