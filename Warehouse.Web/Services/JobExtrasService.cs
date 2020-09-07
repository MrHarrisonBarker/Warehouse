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
        Task<bool> UpdateJobStatus(JobStatus jobStatus);
        Task<bool> DeleteJobStatus(Guid statusId);
        
        Task<JobType> CreateJobType(NewType newType);
        Task<bool> UpdateJobType(JobType jobType);
        Task<bool> DeleteJobType(Guid typeId);
        
        Task<JobPriority> CreateJobPriority(NewPriority newPriority);
        Task<bool> UpdateJobPriority(JobPriority jobPriority);
        Task<bool> DeleteJobPriority(Guid priorityId);
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
                Finished = newStatus.Finished,
                Order = newStatus.Order,
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

        public async Task<bool> UpdateJobStatus(JobStatus jobStatus)
        {
            _tenantDataContext.JobStatuses.Update(jobStatus);
            
            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> DeleteJobStatus(Guid statusId)
        {
            var jobStatus = await _tenantDataContext.JobStatuses.FirstOrDefaultAsync(x => x.Id == statusId);

            if (jobStatus == null)
            {
                Console.WriteLine("Job status doesnt exist");
                return false;
            }

            _tenantDataContext.JobStatuses.Remove(jobStatus);
            
            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
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

        public async Task<bool> UpdateJobType(JobType jobType)
        {
            _tenantDataContext.JobTypes.Update(jobType);
            
            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> DeleteJobType(Guid typeId)
        {
            var jobType = await _tenantDataContext.JobTypes.FirstOrDefaultAsync(x => x.Id == typeId);

            if (jobType == null)
            {
                Console.WriteLine("Job type doesnt exist");
                return false;
            }

            _tenantDataContext.JobTypes.Remove(jobType);
            
            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
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

        public async Task<bool> UpdateJobPriority(JobPriority jobPriority)
        {
            _tenantDataContext.JobPriorities.Update(jobPriority);
            
            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> DeleteJobPriority(Guid priorityId)
        {
            var jobPriority = await _tenantDataContext.JobPriorities.FirstOrDefaultAsync(x => x.Id == priorityId);

            if (jobPriority == null)
            {
                Console.WriteLine("Job priority doesnt exist");
                return false;
            }

            _tenantDataContext.JobPriorities.Remove(jobPriority);
            
            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}