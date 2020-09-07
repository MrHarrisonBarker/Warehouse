using System;
using System.Collections.Generic;
using Warehouse.Models.Joins;

namespace Warehouse.Models
{
    public class Room
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        
        // many to many users
        public IList<RoomMembership> Memberships { get; set; }
        
        public IList<Chat> Chats { get; set; }
        
        // many to one project
        public Project Project { get; set; }
    }

    public class Chat
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public MessageType Type { get; set; }
        public DateTime TimeStamp { get; set; }
        public Guid UserId { get; set; }
        public Room Room { get; set; }
    }

    public enum MessageType
    {
        Message,
        JobMention,
        UserMention
    }

    public class NewRoom
    {
        public Room Room { get; set; }
        public Guid ProjectId { get; set; }
        public IList<User> Memberships { get; set; }
    }
}