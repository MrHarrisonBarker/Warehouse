using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Warehouse.Contexts;
using Warehouse.Models;

namespace Warehouse.Services
{
    public interface IJobExtrasService
    {
        Task<IList<JobStatus>> GetAllJobStatues();
        Task<IList<JobPriority>> GetAllJobPriorities();
        Task<IList<JobType>> GetAllJobTypes();
        Task<JobStatus> CreateJobStatus(NewStatus newStatus);
        Task<bool> DeleteJobStatus(JobStatus jobStatus);
        Task<JobType> CreateJobType(NewType newType);
        Task<bool> DeleteJobType(JobType jobType);
        Task<JobPriority> CreateJobPriority(NewPriority newPriority);
        Task<bool> DeleteJobPriority(JobPriority jobPriority);
    }
    
    public class JobExtrasService : IJobExtrasService
    {
        private readonly TenantDataContext _tenantDataContext;
        
        public JobExtrasService(TenantDataContext tenantDataContext)
        {
            _tenantDataContext = tenantDataContext;
        }
        
        public async Task<IList<JobStatus>> GetAllJobStatues()
        {
            return await _tenantDataContext.JobStatuses.ToListAsync();
        }

        public async Task<IList<JobPriority>> GetAllJobPriorities()
        {
            return await _tenantDataContext.JobPriorities.ToListAsync();
        }

        public async Task<IList<JobType>> GetAllJobTypes()
        {
            return await _tenantDataContext.JobTypes.ToListAsync();
        }

        public async Task<JobStatus> CreateJobStatus(NewStatus newStatus)
        {
            var jobStatusExists = await _tenantDataContext.JobStatuses.FirstOrDefaultAsync(x => x.Name == newStatus.Name);

            if (jobStatusExists != null)
            {
                Console.WriteLine("Job status already exists");
                return null;
            }

            var jobStatus = new JobStatus()
            {
                Name = newStatus.Name,
                Colour = newStatus.Colour
            };
            await _tenantDataContext.JobStatuses.AddAsync(jobStatus);

            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return jobStatus;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<bool> DeleteJobStatus(JobStatus jobStatus)
        {
            throw new System.NotImplementedException();
        }

        public async Task<JobType> CreateJobType(NewType newType)
        {
            var jobTypeExists = await _tenantDataContext.JobTypes.FirstOrDefaultAsync(x => x.Name == newType.Name);

            if (jobTypeExists != null)
            {
                Console.WriteLine("Job already exists");
                return null;
            }

            var jobType = new JobType()
            {
                Name = newType.Name,
                Colour = newType.Colour
            };
            await _tenantDataContext.JobTypes.AddAsync(jobType);

            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return jobType;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<bool> DeleteJobType(JobType jobType)
        {
            throw new System.NotImplementedException();
        }

        public async Task<JobPriority> CreateJobPriority(NewPriority newPriority)
        {
            var jobPriorityExists = await _tenantDataContext.JobPriorities.FirstOrDefaultAsync(x => x.Name == newPriority.Name);

            if (jobPriorityExists != null)
            {
                Console.WriteLine("Job already exists");
                return null;
            }

            var jobPriority = new JobPriority()
            {
                Name = newPriority.Name,
                Colour = newPriority.Colour
            };
            await _tenantDataContext.JobPriorities.AddAsync(jobPriority);

            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return jobPriority;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<bool> DeleteJobPriority(JobPriority jobPriority)
        {
            throw new System.NotImplementedException();
        }
    }
}