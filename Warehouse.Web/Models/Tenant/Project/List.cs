using System;
using System.Collections.Generic;
using Warehouse.Models.Joins;

namespace Warehouse.Models
{
    public class List
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime Created { get; set; }

        // many to one project
        public Project Project { get; set; }
        
        // many to one jobs
        public IList<Job> Jobs { get; set; }
        
        // many to many users
        public IList<ListEmployment> Employments { get; set; }
    }
    
    public class CreateList
    {
        public List List { get; set; }
        public Guid ProjectId { get; set; }
        public IList<User> Employments { get; set; }
    }
    
    public class ListViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime Created { get; set; }

        public IList<JobListViewModel> Jobs { get; set; }
        public IList<ListEmployment> Employments { get; set; }
    }
}