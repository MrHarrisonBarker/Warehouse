using System;
using System.Collections;
using System.Collections.Generic;
using Warehouse.Models.Joins;

namespace Warehouse.Models
{
    public class Job
    {
        public Guid Id { get; set; }
        public string Link { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Deadline { get; set; }
        public string AssociatedUrl { get; set; }
        public string Commit { get; set; }

        // many to one list
        public List List { get; set; }
        
        // many to one project
        public Project Project { get; set; }
        
        // many to many users
        public IList<JobEmployment> Employments { get; set; }
        
        // many to one fluff
        public JobStatus JobStatus { get; set; }
        public JobPriority JobPriority { get; set; }
        public JobType JobType { get; set; }
    }
    
    public class NewJob
    {
        public Job Job { get; set; }
        public IList<User> Employments { get; set; }
        public Guid ListId { get; set; }
        public Guid ProjectId { get; set; }
    }
    
    public class JobListViewModel
    {
        public Guid Id { get; set; }
        public string Link { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Deadline { get; set; }
        public string AssociatedUrl { get; set; }
        public string Commit { get; set; }
        
        // many to many users
        public IList<JobEmployment> Employments { get; set; }
        
        // many to one fluff
        public JobStatusViewModel JobStatus { get; set; }
        public JobPriorityViewModel JobPriority { get; set; }
        public JobTypeViewModel JobType { get; set; }
    }
}