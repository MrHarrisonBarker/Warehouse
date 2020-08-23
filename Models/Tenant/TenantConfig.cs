using System;
using System.Collections.Generic;

namespace Warehouse.Models
{
    public class TenantConfig
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }
        public string Accent { get; set; }
 
        public string DbServer { get; set; }
        public string DbName { get; set; }
        public string DbUser { get; set; }
        public string DbPassword { get; set; }

        public string ConnectionString()
        {
            return ($"server={DbServer};database={DbName};user={DbUser};password={DbPassword}");
        }
        
        public IList<Employment> Employments { get; set; }
    }

    public class CreateTenant
    {
        public TenantConfig Tenant { get; set; }
        public Guid UserId { get; set; }
    }
    
    public class TenantViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }
        public string Accent { get; set; }
    }
    
    public class TenantViewModelWithExtras
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }
        public string Accent { get; set; }
        public IList<JobStatus> JobStatuses { get; set; }
        public IList<JobType> JobTypes { get; set; }
        public IList<JobPriority> JobPriorities { get; set; }
    }
}