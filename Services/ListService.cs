using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Warehouse.Contexts;
using Warehouse.Models;
using Warehouse.Models.Joins;

namespace Warehouse.Services
{
    public interface IListService
    {
        Task<IList<ListViewModel>> GetAllListsAsync(Guid userId,Guid projectId);
        Task<ListViewModel> GetListAsync(Guid id);
        Task<bool> CreateListAsync(CreateList createList);
        Task<bool> DeleteListAsync(List list);
        Task<bool> AddUserAsync(Guid listId, Guid userId);
        Task<bool> RemoveUserAsync(Guid listId, Guid userId);
    }

    public class ListService : IListService
    {
        private readonly TenantDataContext _tenantDataContext;

        public ListService(TenantDataContext tenantDataContext)
        {
            _tenantDataContext = tenantDataContext;
        }

        public async Task<IList<ListViewModel>> GetAllListsAsync(Guid userId,Guid projectId)
        {
            return await _tenantDataContext.Lists
                .Include(x => x.Jobs)
                .Where(x => x.Project.Id == projectId)
                .Select(x => new ListViewModel()
                {
                    Id = x.Id,
                    Created = x.Created,
                    Deadline = x.Deadline,
                    Description = x.Description,
                    Name = x.Name,
                    Employments = x.Employments,
                    Jobs = x.Jobs.Select(job => new JobListViewModel()
                    {
                        Id = job.Id,
                        Link = job.Link,
                        Commit = job.Commit,
                        Created = job.Created,
                        Deadline = job.Deadline,
                        Description = job.Description,
                        AssociatedUrl = job.AssociatedUrl,
                        Title = job.Title,
                        Employments = job.Employments,
                        JobPriority = new JobPriorityViewModel()
                        {
                            Id = job.JobPriority.Id,
                            Name = job.JobPriority.Name,
                            Colour = job.JobPriority.Colour
                        },
                        JobType = new JobTypeViewModel()
                        {
                            Id = job.JobType.Id,
                            Name = job.JobType.Name,
                            Colour = job.JobType.Colour
                        },
                        JobStatus = new JobStatusViewModel()
                        {
                            Id = job.JobStatus.Id,
                            Name = job.JobStatus.Name,
                            Colour = job.JobStatus.Colour
                        }
                    }).ToList()
                })
                .Where(x => x.Employments.FirstOrDefault(employment => employment.UserId == userId) != null)
                .ToListAsync();
        }

        public async Task<ListViewModel> GetListAsync(Guid id)
        {
            return await _tenantDataContext.Lists.Select(x => new ListViewModel()
            {
                Id = x.Id,
                Created = x.Created,
                Deadline = x.Deadline,
                Description = x.Description,
                Name = x.Name,
                Employments = x.Employments,
                Jobs = x.Jobs.Select(job => new JobListViewModel()
                {
                    Id = job.Id,
                    Link = job.Link,
                    Commit = job.Commit,
                    Created = job.Created,
                    Deadline = job.Deadline,
                    Description = job.Description,
                    AssociatedUrl = job.AssociatedUrl,
                    Title = job.Title,
                    Employments = job.Employments,
                    JobPriority = new JobPriorityViewModel()
                    {
                        Id = job.JobPriority.Id,
                        Name = job.JobPriority.Name,
                        Colour = job.JobPriority.Colour
                    },
                    JobType = new JobTypeViewModel()
                    {
                        Id = job.JobType.Id,
                        Name = job.JobType.Name,
                        Colour = job.JobType.Colour
                    },
                    JobStatus = new JobStatusViewModel()
                    {
                        Id = job.JobStatus.Id,
                        Name = job.JobStatus.Name,
                        Colour = job.JobStatus.Colour
                    }
                }).ToList()
            }).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> CreateListAsync(CreateList createList)
        {
            var project = await _tenantDataContext.Projects.FirstOrDefaultAsync(x => x.Id == createList.ProjectId);

            if (project == null)
            {
                return false;
            }

            createList.List.Project = project;
            createList.List.Created = DateTime.Now;

            await _tenantDataContext.Lists.AddAsync(createList.List);

            createList.List.Employments = new List<ListEmployment>();
            foreach (var listEmployment in createList.Employments)
            {
                createList.List.Employments.Add(new ListEmployment()
                {
                    ListId = createList.List.Id,
                    UserId = listEmployment.Id
                });
            }

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

        public Task<bool> DeleteListAsync(List list)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> AddUserAsync(Guid listId, Guid userId)
        {
            var user = await _tenantDataContext.UserIds.FirstOrDefaultAsync(x => x.Id == userId);
            var list = await _tenantDataContext.Lists.FirstOrDefaultAsync(x => x.Id == listId);

            if (user == null || list == null)
            {
                Console.WriteLine("Couldn't find user or list");
                return false;
            }

            if (user.ListEmployments == null)
            {
                user.ListEmployments = new List<ListEmployment>();
            }

            user.ListEmployments.Add(new ListEmployment() {ListId = list.Id, UserId = user.Id});

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

        public async Task<bool> RemoveUserAsync(Guid listId, Guid userId)
        {
            var employment = await _tenantDataContext.ListEmployment.FirstOrDefaultAsync(x =>
                x.UserId == userId && x.ListId == listId);

            if (employment == null)
            {
                Console.WriteLine("Couldn't find employment");
                return false;
            }

            _tenantDataContext.ListEmployment.Remove(employment);

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