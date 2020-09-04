using System;

namespace Warehouse.Models.Joins
{
    public class ProjectEmployment
    {
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }
        
        public Guid UserId { get; set; }
        public UserId User { get; set; }
    }
}