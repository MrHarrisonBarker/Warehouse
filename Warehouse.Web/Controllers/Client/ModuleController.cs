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
    public class ModuleController: ControllerBase
    {
        private readonly TenantService _tenantService;

        public ModuleController(TenantService tenantService)
        {
            _tenantService = tenantService;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IList<Module>>> GetAll(Guid projectId)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting modules for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var moduleService = new ModuleService(context);
                    return Ok(await moduleService.GetAllModulesAsync(projectId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpPost]
        public async Task<ActionResult<bool>> Create([FromBody] CreateModule createModule)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"creating module for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var moduleService = new ModuleService(context);
                    return Ok(await moduleService.CreateModuleAsync(createModule));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete(Module module)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"deleting module for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var moduleService = new ModuleService(context);
                    return Ok(await moduleService.DeleteModuleASync(module));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
    }
}