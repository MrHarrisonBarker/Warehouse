using System;

namespace Warehouse.Models.Joins
{
    public class RoomMembership
    {
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
        
        public Guid UserId { get; set; }
        public UserId User { get; set; }
    }
}