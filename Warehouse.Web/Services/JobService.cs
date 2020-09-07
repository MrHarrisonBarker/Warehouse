using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Warehouse.Contexts;
using Warehouse.Models;
using Warehouse.Models.Joins;

namespace Warehouse.Services
{
    public interface IJobService
    {
        Task<IList<Job>> GetAllJobsAsync();
        Task<Job> GetJobAsync(Guid id);
        Task<bool> CreateJobAsync(NewJob newJob);
        Task<bool> DeleteJobAsync(Job job);
        Task<bool> AddUserAsync(Guid jobId, Guid userId);
        Task<bool> RemoveUserAsync(Guid jobId, Guid userId);
        Task<Job> UpdateJobAsync(Job updatedJob);

        Task<Job> UpdateJobStatus(Job updatedJob);
        Task<Job> UpdateJobType(Job updatedJob);
        Task<Job> UpdateJobPriority(Job updatedJob);
    }
    
    public class JobService : IJobService
    {
        private readonly TenantDataContext _tenantDataContext;

        public JobService(TenantDataContext tenantDataContext)
        {
            _tenantDataContext = tenantDataContext;
        }

        public async Task<IList<Job>> GetAllJobsAsync()
        {
            return await _tenantDataContext.Jobs.ToListAsync();
        }

        public async Task<Job> GetJobAsync(Guid id)
        {
            return await _tenantDataContext.Jobs.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> CreateJobAsync(NewJob newJob)
        {
            var list = await _tenantDataContext.Lists.FirstOrDefaultAsync(x => x.Id == newJob.ListId);
            var project = await _tenantDataContext.Projects.Include(x => x.Jobs).FirstOrDefaultAsync(x => x.Id == newJob.ProjectId);
            // var user = await _tenantDataContext.UserIds.FirstOrDefaultAsync(x => x.Id == newJob.UserId);

            var status =
                await _tenantDataContext.JobStatuses.FirstOrDefaultAsync(x => x.Name == newJob.Job.JobStatus.Name);
            var priority =
                await _tenantDataContext.JobPriorities.FirstOrDefaultAsync(x => x.Name == newJob.Job.JobPriority.Name);
            var type = await _tenantDataContext.JobTypes.FirstOrDefaultAsync(x => x.Name == newJob.Job.JobType.Name);

            if (newJob.ListId != Guid.Empty)
            {
                await _tenantDataContext.Lists.FirstOrDefaultAsync(x => x.Id == newJob.ListId);

                if (list == new List())
                {
                    Console.WriteLine("Couldn't find list");
                    return false;
                }
            }

            if (project == null)
            {
                Console.WriteLine("Couldn't find project");
                return false;
            }

            newJob.Job.List = list;
            newJob.Job.Created = DateTime.Now;
            newJob.Job.JobStatus = status;
            newJob.Job.JobPriority = priority;
            newJob.Job.JobType = type;

            newJob.Job.Link = $"{project.Short}-{project.Jobs.Count}";

            await _tenantDataContext.Jobs.AddAsync(newJob.Job);

            status.Jobs.Add(newJob.Job);
            priority.Jobs.Add(newJob.Job);
            type.Jobs.Add(newJob.Job);

            newJob.Job.Employments = new List<JobEmployment>();
            foreach (var newJobEmployment in newJob.Employments)
            {
                newJob.Job.Employments.Add(new JobEmployment {JobId = newJob.Job.Id, UserId = newJobEmployment.Id});
            }

            if (list != new List() && list.Jobs == null)
            {
                list.Jobs = new List<Job>();
            }

            list.Jobs.Add(newJob.Job);

            if (project.Jobs == null)
            {
                project.Jobs = new List<Job>();
            }

            project.Jobs.Add(newJob.Job);

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

        public Task<bool> DeleteJobAsync(Job job)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> AddUserAsync(Guid jobId, Guid userId)
        {
            var user = await _tenantDataContext.UserIds.FirstOrDefaultAsync(x => x.Id == userId);
            var job = await _tenantDataContext.Jobs.FirstOrDefaultAsync(x => x.Id == jobId);

            if (user == null || job == null)
            {
                Console.WriteLine("Couldn't find user or room");
                return false;
            }

            if (user.JobEmployments == null)
            {
                user.JobEmployments = new List<JobEmployment>();
            }

            user.JobEmployments.Add(new JobEmployment() {JobId = job.Id, UserId = user.Id});

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

        public async Task<bool> RemoveUserAsync(Guid jobId, Guid userId)
        {
            var employment = await _tenantDataContext.JobEmployment.FirstOrDefaultAsync(x =>
                x.UserId == userId && x.JobId == jobId);

            if (employment == null)
            {
                Console.WriteLine("Couldn't find employment");
                return false;
            }

            _tenantDataContext.JobEmployment.Remove(employment);

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

        public async Task<Job> UpdateJobAsync(Job updatedJob)
        {
            var job = await _tenantDataContext.Jobs.FirstOrDefaultAsync(x => x.Id == updatedJob.Id);

            if (job == null)
            {
                return null;
            }

            _tenantDataContext.Update(updatedJob);

            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return updatedJob;
            }
            catch (Exception e)
            {
                Console.WriteLine("Error updating job");
                return null;
            }
        }

        public async Task<Job> UpdateJobStatus(Job updatedJob)
        {
            var job = await _tenantDataContext.Jobs.FirstOrDefaultAsync(x => x.Id == updatedJob.Id);

            if (job == null)
            {
                Console.WriteLine("Job doesn't exist");
                return null;
            }

            if (updatedJob.JobStatus.Finished && job.Finished == DateTime.Parse("0001-01-01 00:00:00"))
            {
                Console.WriteLine("Job is now finished");
                job.JobStatus = updatedJob.JobStatus;
                job.Finished = DateTime.Now;
            }
            
            job.JobStatus = updatedJob.JobStatus;
            
            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return job;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        
        public async Task<Job> UpdateJobType(Job updatedJob)
        {
            var job = await _tenantDataContext.Jobs.FirstOrDefaultAsync(x => x.Id == updatedJob.Id);

            if (job == null)
            {
                Console.WriteLine("Job doesn't exist");
                return null;
            }

            job.JobType = updatedJob.JobType;
            
            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return job;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        
        public async Task<Job> UpdateJobPriority(Job updatedJob)
        {
            var job = await _tenantDataContext.Jobs.FirstOrDefaultAsync(x => x.Id == updatedJob.Id);

            if (job == null)
            {
                Console.WriteLine("Job doesn't exist");
                return null;
            }

            job.JobPriority = updatedJob.JobPriority;
            
            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return job;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}