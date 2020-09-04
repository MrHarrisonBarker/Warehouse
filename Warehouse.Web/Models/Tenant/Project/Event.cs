using System;
using System.Collections.Generic;

namespace Warehouse.Models
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Time { get; set; }
        public string Description { get; set; }
        
        public Project Project { get; set; }
    }
}