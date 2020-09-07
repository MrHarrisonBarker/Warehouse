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
    public class JobExtrasController : ControllerBase
    {
        private readonly TenantService _tenantService;

        public JobExtrasController(TenantService tenantService)
        {
            _tenantService = tenantService;
        }

        [HttpGet("status")]
        public async Task<ActionResult<IList<JobStatus>>> GetAllStatues()
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting status for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.GetAllJobStatues());
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost("status")]
        public async Task<ActionResult<bool>> CreateStatus(NewStatus newStatus)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"creating status for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.CreateJobStatus(newStatus));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPut("status")]
        public async Task<ActionResult<bool>> UpdateStatus(JobStatus jobStatus)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"updating status {jobStatus.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.UpdateJobStatus(jobStatus));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpDelete("status")]
        public async Task<ActionResult<bool>> DeleteStatus(Guid id)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"deleting status {id}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.DeleteJobStatus(id));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
            
        [HttpGet("type")]
        public async Task<ActionResult<IList<JobType>>> GetAllTypes()
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting type for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.GetAllJobTypes());
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpPost("type")]
        public async Task<ActionResult<JobType>> CreateType(NewType newType)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"creating type for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.CreateJobType(newType));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpPut("type")]
        public async Task<ActionResult<bool>> UpdateType(JobType jobType)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"updating type {jobType.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.UpdateJobType(jobType));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpDelete("type")]
        public async Task<ActionResult<bool>> DeleteType(Guid id)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"deleting type {id}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.DeleteJobType(id));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpGet("priority")]
        public async Task<ActionResult<IList<JobPriority>>> GetAllPriorities()
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting priority for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.GetAllJobPriorities());
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpPost("priority")]
        public async Task<ActionResult<JobPriority>> CreatePriority(NewPriority newPriority)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"creating priority for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.CreateJobPriority(newPriority));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpPut("priority")]
        public async Task<ActionResult<bool>> UpdatePriority(JobPriority jobPriority)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"updating priority {jobPriority.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.UpdateJobPriority(jobPriority));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpDelete("priority")]
        public async Task<ActionResult<bool>> DeletePriority(Guid id)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"deleting priority {id}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var jobExtrasService = new JobExtrasService(context);
                    return Ok(await jobExtrasService.DeleteJobPriority(id));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
    }
}