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
    public class TenantUserController: ControllerBase
    {
        private readonly TenantService _tenantService;

        public TenantUserController(TenantService tenantService)
        {
            _tenantService = tenantService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IList<UserId>>> GetAll()
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting TenantUsers for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var projectService = new TenantUserService(context);
                    return Ok(await projectService.GetAllTenantUsersAsync());
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
    }
}