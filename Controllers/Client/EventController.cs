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
    public class EventController: ControllerBase
    {
        private readonly TenantService _tenantService;

        public EventController(TenantService tenantService)
        {
            _tenantService = tenantService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IList<Event>>> GetAll()
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting Events for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var projectService = new EventService(context);
                    return Ok(await projectService.GetAllEventsAsync());
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
    }
}