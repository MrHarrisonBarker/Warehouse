using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Models;
using Warehouse.Services;

namespace Warehouse.Controllers.Client
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController : ControllerBase
    {
        private readonly TenantService _tenantService;

        public JobController(TenantService tenantService)
        {
            _tenantService = tenantService;
        }

        [HttpGet]
        public async Task<ActionResult<IList<Job>>> GetAll()
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting Jobs for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobService = new JobService(context);
                    return Ok(await jobService.GetAllJobsAsync());
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Create([FromBody] NewJob newJob)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"creating job for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobService = new JobService(context);
                    return Ok(await jobService.CreateJobAsync(newJob));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost("Listless")]
        public async Task<ActionResult<bool>> CreateListless([FromBody] CreateListlessJob createJob)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"creating listless job for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobService = new JobService(context);
                    // return Ok(await jobService.CreateJobAsync(createJob.Job, Guid.Empty, createJob.ProjectId,
                    //     createJob.UserId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost("AddUser")]
        public async Task<ActionResult<bool>> AddUser([FromBody] AddJobUser addUser)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"adding user for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobService = new JobService(context);
                    return Ok(await jobService.AddUserAsync(addUser.JobId, addUser.UserId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost("RemoveUser")]
        public async Task<ActionResult<bool>> RemoveUser([FromBody] AddJobUser addList)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"remove user for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobService = new JobService(context);
                    return Ok(await jobService.RemoveUserAsync(addList.JobId, addList.UserId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPut("UpdateStatus")]
        public async Task<ActionResult<Job>> UpdateStatus([FromBody] Job updatedJob)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"updating jobs status for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobService = new JobService(context);
                    return Ok(await jobService.UpdateJobStatus(updatedJob));
                }
            }
            
            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpPut("UpdateType")]
        public async Task<ActionResult<Job>> UpdateType([FromBody] Job updatedJob)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"updating jobs type for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobService = new JobService(context);
                    return Ok(await jobService.UpdateJobType(updatedJob));
                }
            }
            
            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpPut("UpdatePriority")]
        public async Task<ActionResult<Job>> UpdatePriority([FromBody] Job updatedJob)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"updating jobs priority for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobService = new JobService(context);
                    return Ok(await jobService.UpdateJobPriority(updatedJob));
                }
            }
            
            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpPut]
        public async Task<ActionResult<Job>> Update([FromBody] Job updatedJob)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"updating jobs priority for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobService = new JobService(context);
                    return Ok(await jobService.UpdateJobAsync(updatedJob));
                }
            }
            
            return BadRequest("Tenant doesn't exist");
        }
    }

    public class AddJobUser
    {
        public Guid JobId { get; set; }
        public Guid UserId { get; set; }
    }

    public class CreateListlessJob
    {
        public Job Job { get; set; }
        public Guid ProjectId { get; set; }
        public Guid UserId { get; set; }
    }
}