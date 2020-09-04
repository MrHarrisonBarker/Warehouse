using System;

namespace Warehouse.Models.Joins
{
    public class JobEmployment
    {
        public Guid JobId { get; set; }
        public Job Job { get; set; }
        
        public Guid UserId { get; set; }
        public UserId User { get; set; }
    }
}