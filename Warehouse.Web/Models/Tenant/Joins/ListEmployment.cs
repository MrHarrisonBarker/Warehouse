using System;

namespace Warehouse.Models.Joins
{
    public class ListEmployment
    {
        public Guid ListId { get; set; }
        public List List { get; set; }
        
        public Guid UserId { get; set; }
        public UserId User { get; set; }
    }
}