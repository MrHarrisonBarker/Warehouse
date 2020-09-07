using System;
using System.Collections.Generic;

namespace Warehouse.Models
{
    public class Module
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        
        public IList<Job> Jobs { get; set; }
        public Project Project { get; set; }
    }
    
    public class ModuleViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        
        public int JobCount { get; set; }
    }

    public class CreateModule
    {
        public Module Module { get; set; }
        public Guid ProjectId { get; set; }
    }
}