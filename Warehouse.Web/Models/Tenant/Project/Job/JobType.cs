using System;
using System.Collections.Generic;
using Warehouse.Models.Joins;

namespace Warehouse.Models
{
    public class JobType
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public string Name { get; set; }
        public string Colour { get; set; }
        public IList<Job> Jobs { get; set; }
    }
    
    public class NewType
    {
        public string Name { get; set; }
        public string Colour { get; set; }
    }
    
    public class JobTypeViewModel
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public string Name { get; set; }
        public string Colour { get; set; }
    }
}