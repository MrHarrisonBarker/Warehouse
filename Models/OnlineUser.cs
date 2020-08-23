using System;
using System.Collections.Generic;

namespace Warehouse.Models
{
    public class OnlineUser
    {
        public Guid Id { get; set; }
        public string ConnectionId { get; set; }
    }

    public class TenantOnlineUserTracker
    {
        public Guid Id { get; set; }
        public List<OnlineUser> OnlineUsers { get; set; }
    }
}