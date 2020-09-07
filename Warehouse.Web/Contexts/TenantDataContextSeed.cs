using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Warehouse.Models;
using Warehouse.Models.Joins;

namespace Warehouse.Contexts
{
    public class TenantDataContextSeed
    {
        public static async Task SeedAsync(TenantDataContext dataContext, CreateTenant createTenant)
        {
            try
            {
                // Console.WriteLine("Creating database");
                // await dataContext.Database.EnsureCreatedAsync();

                Console.WriteLine("Migrating database");
                await dataContext.Database.MigrateAsync();


                if (!dataContext.Projects.Any())
                {
                    Console.WriteLine("Adding data");

                    if (createTenant == null)
                    {
                        createTenant = new CreateTenant()
                        {
                            UserId = Guid.Parse("08d8419b-2bcb-4390-8b99-50960f9a3c59"),
                            Tenant =
                            {
                                Name = "Hello"
                            }
                        };
                    }

                    await AddData(dataContext, createTenant);
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
            }
        }

        private static async Task AddData(TenantDataContext dataContext, CreateTenant createTenant)
        {
            var projectId = Guid.NewGuid();
            var listId = Guid.NewGuid();
            var userId = createTenant.UserId;
            var roomId = Guid.NewGuid();

            var jobIds = new List<Guid>();
            var jobEmployments = new List<JobEmployment>();
            for (int i = 0; i < 10; i++)
            {
                var id = Guid.NewGuid();
                jobIds.Add(id);
                jobEmployments.Add(new JobEmployment()
                {
                    JobId = id,
                    UserId = userId
                });
            }


            var user = new UserId()
            {
                Id = userId,
                JobEmployments = jobEmployments,
                ListEmployments = new List<ListEmployment>()
                {
                    new ListEmployment()
                    {
                        ListId = listId,
                        UserId = userId
                    }
                },
                ProjectEmployments = new List<ProjectEmployment>()
                {
                    new ProjectEmployment()
                    {
                        ProjectId = projectId,
                        UserId = userId
                    }
                },
                RoomMemberships = new List<RoomMembership>()
                {
                    new RoomMembership()
                    {
                        RoomId = roomId, UserId = userId
                    }
                }
            };

            var statuses = new List<JobStatus>()
            {
                new JobStatus()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#fec128",
                    Name = "Todo",
                    Finished = false,
                    Order = 0
                },
                new JobStatus()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#f77d16",
                    Name = "In progress", 
                    Finished = false,
                    Order = 1
                },
                new JobStatus()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#03bbd3",
                    Name = "Verify",
                    Finished = false,
                    Order = 2
                },
                new JobStatus()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#68B642",
                    Name = "Completed",
                    Finished = true,
                    Order = 3
                },
            };

            var types = new List<JobType>
            {
                new JobType()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#009688",
                    Name = "Bug",
                    Order = 0
                },
                new JobType()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#9e9e9e",
                    Name = "Feature",
                    Order = 1
                }
            };

            var priorities = new List<JobPriority>()
            {
                new JobPriority()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#ff5722",
                    Name = "DEFCON 1",
                    Order = 0
                },
                new JobPriority()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#ff9800",
                    Name = "DEFCON 2",
                    Order = 1
                },
                new JobPriority()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#ffc107",
                    Name = "DEFCON 3",
                    Order = 2
                },
                new JobPriority()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#8bc34a",
                    Name = "DEFCON 4",
                    Order = 3
                },
                new JobPriority()
                {
                    Id = Guid.NewGuid(),
                    Colour = "#4caf50",
                    Name = "DEFCON 5",
                    Order = 4
                }
            };

            var project = new Project()
            {
                Created = DateTime.Now,
                Description = "Development project for development",
                Id = projectId,
                Short = "Dev",
                Name = "Development",
                Repo = "https://github.com/MrHarrisonBarker/Warehouse",
                Accent = "#1ad960",
                Avatar = "https://pbs.twimg.com/profile_images/1292028907101671425/pp02tz90_400x400.jpg"
            };

            var list = new List()
            {
                Created = DateTime.Now,
                Description = "Phase-1 list",
                Id = listId,
                Name = "Phase-1",
                Project = project
            };

            var jobs = new List<Job>();
            var count = 0;
            foreach (var id in jobIds)
            {
                jobs.Add(new Job()
                {
                    Created = DateTime.Now,
                    Description =
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    Id = id,
                    Title = $"job #{count}",
                    Project = project,
                    List = list,
                    Link = $"{project.Name.Substring(0,3)}-{count}",
                    AssociatedUrl = "harrisonbarker.co.uk",
                    JobStatus = statuses[new Random().Next(0, statuses.Count)],
                    JobPriority = priorities[new Random().Next(0, priorities.Count)],
                    JobType = types[new Random().Next(0, types.Count)],
                    Commit = "d1b13d624f6d812ffa39d8460716ca8087737f1c"
                });
                count++;
            }

            var room = new Room()
            {
                Id = roomId,
                Chats = new List<Chat>(),
                Name = "General",
                Project = project
            };

            var creationEvent = new Event()
            {
                Id = Guid.NewGuid(),
                Description = "Created new project",
                Name = "Creation",
                Project = project,
                Time = DateTime.Now
            };

            dataContext.Events.Add(creationEvent);
            dataContext.UserIds.Add(user);
            dataContext.Projects.Add(project);
            dataContext.Lists.Add(list);
            dataContext.Jobs.AddRange(jobs);
            dataContext.Rooms.Add(room);
            dataContext.JobStatuses.AddRange(statuses);
            dataContext.JobTypes.AddRange(types);
            dataContext.JobPriorities.AddRange(priorities);

            await dataContext.SaveChangesAsync();
        }
    }
}