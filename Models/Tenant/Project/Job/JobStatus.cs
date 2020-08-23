using System;
using System.Collections.Generic;
using Warehouse.Models.Joins;

namespace Warehouse.Models
{
    public class JobStatus
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Colour { get; set; }
        public IList<Job> Jobs { get; set; }
    }

    public class NewStatus
    {
        public string Name { get; set; }
        public string Colour { get; set; }
    }

    public class JobStatusViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Colour { get; set; }
    }
}