using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodenameGenerator;
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
                            UserId = Guid.Parse("08d84f75-8698-4cf5-82a3-094415fcd132"),
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
            var list2Id = Guid.NewGuid();
            var list3Id = Guid.NewGuid();
            var listId = Guid.NewGuid();
            var userId = createTenant.UserId;
            var roomId = Guid.NewGuid();
            var moduleId = Guid.NewGuid();

            var jobIds = new List<Guid>();
            var jobEmployments = new List<JobEmployment>();
            for (int i = 0; i < 100; i++)
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
                Role = Role.Owner,
                JobEmployments = jobEmployments,
                ListEmployments = new List<ListEmployment>()
                {
                    new ListEmployment()
                    {
                        ListId = listId,
                        UserId = userId
                    },
                    new ListEmployment()
                    {
                        ListId = list2Id,
                        UserId = userId
                    },
                    new ListEmployment()
                    {
                        ListId = list3Id,
                        UserId = userId
                    },
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
                Avatar = "data:image/jpeg;base64,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"
            };

            var lists = new List<List>()
            {
                new List()
                {
                    Created = DateTime.Now,
                    Description = "Phase-1 list",
                    Id = listId,
                    Name = "Phase-1",
                    Project = project
                },
                new List()
                {
                    Created = DateTime.Now,
                    Description = "Phase-2 list",
                    Id = list2Id,
                    Name = "Phase-2",
                    Project = project
                },
                new List()
                {
                    Created = DateTime.Now,
                    Description = "Phase-3 list",
                    Id = list3Id,
                    Name = "Phase-3",
                    Project = project
                }
            };
            
            
            var module = new Module()
            {
                Id = moduleId,
                Name = "Seeded",
                Project = project
            };

            var generator = new Generator();
            
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
                    Title = generator.Generate(),
                    Project = project,
                    List = lists[new Random().Next(0, lists.Count)],
                    Link = $"{project.Name.Substring(0,3)}-{count}",
                    AssociatedUrl = "harrisonbarker.co.uk",
                    JobStatus = statuses[new Random().Next(0, statuses.Count)],
                    JobPriority = priorities[new Random().Next(0, priorities.Count)],
                    JobType = types[new Random().Next(0, types.Count)],
                    Commit = "d1b13d624f6d812ffa39d8460716ca8087737f1c",
                    Module = module
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
            dataContext.Lists.AddRange(lists);
            dataContext.Jobs.AddRange(jobs);
            dataContext.Rooms.Add(room);
            dataContext.JobStatuses.AddRange(statuses);
            dataContext.JobTypes.AddRange(types);
            dataContext.JobPriorities.AddRange(priorities);
            dataContext.Modules.Add(module);

            await dataContext.SaveChangesAsync();
        }
    }
}