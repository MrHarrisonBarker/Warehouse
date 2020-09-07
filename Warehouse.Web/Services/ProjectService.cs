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
    public interface IProjectService
    {
        Task<IList<Project>> GetAllProjectsAsync(Guid userId);
        Task<ProjectViewModel> GetProjectAsync(Guid id, Guid userId);
        Task<Project> CreateProjectAsync(NewProject newProject);
        Task<bool> DeleteProjectAsync(Project project);
        Task<bool> AddUserAsync(Guid projectId, Guid userId);
        Task<bool> RemoveUserAsync(Guid projectId, Guid userId);
        Task<bool> UpdateProjectAsync(Project project);
    }

    public class ProjectService : IProjectService
    {
        private readonly TenantDataContext _tenantDataContext;

        public ProjectService(TenantDataContext tenantDataContext)
        {
            _tenantDataContext = tenantDataContext;
        }

        public async Task<IList<Project>> GetAllProjectsAsync(Guid userId)
        {
            return await _tenantDataContext.Projects
                .Include(x => x.Employments)
                .Include(x => x.Jobs)
                .Include(x => x.Lists)
                .Include(x => x.Rooms)
                .Include(x => x.Events)
                .Where(x => x.Employments.FirstOrDefault(employment => employment.UserId == userId) != null)
                .ToListAsync();
        }

        public Task<ProjectViewModel> GetProjectAsync(Guid id, Guid userId)
        {
            return _tenantDataContext.Projects.Select(x => new ProjectViewModel()
            {
                Id = x.Id,
                Short = x.Short,
                Accent = x.Accent,
                Avatar = x.Avatar,
                Created = x.Created,
                Description = x.Description,
                Name = x.Name,
                Repo = x.Repo,
                Employments = x.Employments,
                Events = x.Events,
                Lists = x.Lists.Where(list =>
                    list.Employments.FirstOrDefault(employment => employment.UserId == userId) != null).ToList(),
                Rooms = x.Rooms.Where(room =>
                    room.Memberships.FirstOrDefault(membership => membership.UserId == userId) != null).ToList(),
                Jobs = x.Jobs
                    .Where(job => job.Employments.FirstOrDefault(employment => employment.UserId == userId) != null)
                    .Select(job => new JobListViewModel()
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

        public async Task<Project> CreateProjectAsync(NewProject newProject)
        {
            newProject.Project.Created = DateTime.Now;

            await _tenantDataContext.Projects.AddAsync(newProject.Project);

            newProject.Project.Employments = new List<ProjectEmployment>();

            foreach (var newProjectEmployment in newProject.Employments)
            {
                newProject.Project.Employments.Add(new ProjectEmployment
                {
                    ProjectId = newProject.Project.Id, UserId = newProjectEmployment.Id
                });
            }

            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return newProject.Project;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Exception when creating project {e}");
                return null;
            }
        }

        public Task<bool> DeleteProjectAsync(Project project)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> AddUserAsync(Guid projectId, Guid userId)
        {
            var user = await _tenantDataContext.UserIds.FirstOrDefaultAsync(x => x.Id == userId);
            var project = await _tenantDataContext.Projects.FirstOrDefaultAsync(x => x.Id == projectId);

            if (user == null || project == null)
            {
                Console.WriteLine("Couldn't find user or project");
                return false;
            }

            if (user.ProjectEmployments == null)
            {
                user.ProjectEmployments = new List<ProjectEmployment>();
            }

            user.ProjectEmployments.Add(new ProjectEmployment() {ProjectId = project.Id, UserId = user.Id});

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

        public async Task<bool> RemoveUserAsync(Guid projectId, Guid userId)
        {
            var employment = await _tenantDataContext.ProjectEmployment.FirstOrDefaultAsync(x =>
                x.UserId == userId && x.ProjectId == projectId);

            if (employment == null)
            {
                Console.WriteLine("Couldn't find employment");
                return false;
            }

            _tenantDataContext.ProjectEmployment.Remove(employment);

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

        public async Task<bool> UpdateProjectAsync(Project project)
        {
            // var pr = await _tenantDataContext.Projects.FirstOrDefaultAsync(x => x.Id == project.Id);
            // if (pr == null)
            // {
            //     Console.WriteLine("Project doesnt exist");
            //     return false;
            // }
            //
            // pr = null;
            
            _tenantDataContext.Projects.Update(project);
            
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