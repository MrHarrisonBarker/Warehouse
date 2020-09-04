using System;
using System.Collections;
using System.Collections.Generic;
using Warehouse.Models.Joins;

namespace Warehouse.Models
{
    public class JobPriority
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public string Name { get; set; }
        public string Colour { get; set; }
        public IList<Job> Jobs { get; set; }
    }
    
    public class NewPriority
    {
        public string Name { get; set; }
        public string Colour { get; set; }
    }
    
    public class JobPriorityViewModel
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public string Name { get; set; }
        public string Colour { get; set; }
    }
}