using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Warehouse.Contexts;
using Warehouse.Models;
using Warehouse.Services;

namespace Warehouse.Controllers.Client
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly TenantService _tenantService;

        public ProjectController(TenantService tenantService)
        {
            _tenantService = tenantService;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IList<Project>>> GetAll(Guid userId)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting Projects for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var projectService = new ProjectService(context);
                    return Ok(await projectService.GetAllProjectsAsync(userId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpGet]
        public async Task<ActionResult<IList<Project>>> Get(Guid id, Guid userId)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting Project for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var projectService = new ProjectService(context);
                    return Ok(await projectService.GetProjectAsync(id, userId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost]
        public async Task<ActionResult<Project>> Create([FromBody] NewProject newProject)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"creating project for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var projectService = new ProjectService(context);
                    var project = await projectService.CreateProjectAsync(newProject);
                    if (project != null)
                    {
                        return Ok(project);
                    }

                    return BadRequest("Error");
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost("AddUser")]
        public async Task<ActionResult<bool>> AddUser([FromBody] AddProjectUser addUser)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"adding user for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var projectService = new ProjectService(context);
                    return Ok(await projectService.AddUserAsync(addUser.ProjectId, addUser.UserId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost("RemoveUser")]
        public async Task<ActionResult<bool>> RemoveUser([FromBody] RemoveProjectUser removeUser)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"remove user for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var projectService = new ProjectService(context);
                    return Ok(await projectService.RemoveUserAsync(removeUser.ProjectId, removeUser.UserId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Update(Project project)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"remove user for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var projectService = new ProjectService(context);
                    return Ok(await projectService.UpdateProjectAsync(project));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
    }

    public class AddProjectUser
    {
        public Guid ProjectId { get; set; }
        public Guid UserId { get; set; }
    }

    public class RemoveProjectUser
    {
        public Guid ProjectId { get; set; }
        public Guid UserId { get; set; }
    }
}