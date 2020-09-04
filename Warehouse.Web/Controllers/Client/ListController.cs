using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Warehouse.Models;
using Warehouse.Services;

namespace Warehouse.Controllers.Client
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListController : ControllerBase
    {
        private readonly TenantService _tenantService;

        public ListController(TenantService tenantService)
        {
            _tenantService = tenantService;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IList<List>>> GetAll(Guid userId, Guid projectId)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting lists for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var listService = new ListService(context);
                    return Ok(await listService.GetAllListsAsync(userId, projectId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpGet]
        public async Task<ActionResult<IList<List>>> Get(Guid id)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting list for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var listService = new ListService(context);
                    return Ok(await listService.GetListAsync(id));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Create([FromBody] CreateList createList)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"creating list for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var listService = new ListService(context);
                    return Ok(await listService.CreateListAsync(createList));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost("AddUser")]
        public async Task<ActionResult<bool>> AddUser([FromBody] AddListUser addList)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"adding user for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var listService = new ListService(context);
                    return Ok(await listService.AddUserAsync(addList.ListId, addList.UserId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost("RemoveUser")]
        public async Task<ActionResult<bool>> RemoveUser([FromBody] AddListUser addList)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"remove user for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var listService = new ListService(context);
                    return Ok(await listService.RemoveUserAsync(addList.ListId, addList.UserId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
    }

    public class AddListUser
    {
        public Guid ListId { get; set; }
        public Guid UserId { get; set; }
    }
}