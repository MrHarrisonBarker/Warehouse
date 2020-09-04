using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Timeline.Neo.Helpers;
using Warehouse.Models;
using Warehouse.Services;

namespace Warehouse.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TenantController : ControllerBase
    {
        private readonly TenantService _tenantService;
        private readonly AppSettings _appSettings;

        public TenantController(TenantService tenantService, IOptions<AppSettings> appSettings)
        {
            _tenantService = tenantService;
            _appSettings = appSettings.Value;
        }

        [HttpGet("all")]
        public async Task<IList<TenantConfig>> GetAll()
        {
            return await _tenantService.GetAllTenantsAsync();
        }

        [HttpGet]
        public async Task<ActionResult<TenantViewModelWithExtras>> Get()
        {
            var tenant = await _tenantService.GetTenantFromHostAsync();

            if (tenant == null)
            {
                return BadRequest();
            }

            if (tenant.Name == _appSettings.BaseHost)
            {
                return Ok();
            }

            using (var context = _tenantService.CreateContext(tenant))
            {
                var jobExtrasService = new JobExtrasService(context);
                var statues = await jobExtrasService.GetAllJobStatues();
                var types = await jobExtrasService.GetAllJobTypes();
                var priorities = await jobExtrasService.GetAllJobPriorities();

                return Ok(new TenantViewModelWithExtras()
                {
                    Id = tenant.Id,
                    Name = tenant.Name,
                    Accent = tenant.Accent,
                    Avatar = tenant.Avatar,
                    Description = tenant.Description,
                    JobPriorities = priorities,
                    JobStatuses = statues,
                    JobTypes = types
                });
            }
        }

        [HttpPost]
        public async Task<ActionResult<TenantConfig>> Create([FromBody]CreateTenant createTenant)
        {
            return await _tenantService.CreateTenantAsync(createTenant);
        }

        [HttpPost("adduser")]
        public async Task<ActionResult<bool>> AddUser(string email)
        {
            return await _tenantService.AddUserAsync(email);
        }

        [HttpPost("removeuser")]
        public async Task<ActionResult<bool>> RemoveUser(Guid id)
        {
            return await _tenantService.RemoveUserAsync(id);
        }
    }
}