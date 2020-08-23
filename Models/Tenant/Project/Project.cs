using System;
using System.Collections;
using System.Collections.Generic;
using Warehouse.Models.Joins;

namespace Warehouse.Models
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public string Accent { get; set; }
        public string Avatar { get; set; }
        
        // many to one rooms
        public IList<Room> Rooms { get; set; }
        
        public string Repo { get; set; }
        
        //many to one events
        public IList<Event> Events { get; set; }
        
        // many to one lists
        public IList<List> Lists { get; set; }
        
        //many to one jobs
        public IList<Job> Jobs { get; set; }
        
        // // many to many users
        public IList<ProjectEmployment> Employments { get; set; }
    }

    public class NewProject
    {
        public Project Project { get; set; }
        public IList<User> Employments { get; set; }
    }
    
    public class ProjectViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public string Accent { get; set; }
        public string Avatar { get; set; }
        
        // many to one rooms
        public IList<Room> Rooms { get; set; }
        
        public string Repo { get; set; }
        
        //many to one events
        public IList<Event> Events { get; set; }
        
        // many to one lists
        public IList<List> Lists { get; set; }
        
        //many to one jobs
        public IList<JobListViewModel> Jobs { get; set; }
        
        // // many to many users
        public IList<ProjectEmployment> Employments { get; set; }
    }
}