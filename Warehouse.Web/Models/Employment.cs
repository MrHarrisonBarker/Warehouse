using System;
using Warehouse.Controllers;

namespace Warehouse.Models
{
    public class Employment
    {
        public Guid TenantId { get; set; }
        public TenantConfig TenantConfig { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}