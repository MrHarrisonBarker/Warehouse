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
    public class RoomController : ControllerBase
    {
        private readonly TenantService _tenantService;

        public RoomController(TenantService tenantService)
        {
            _tenantService = tenantService;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IList<Room>>> GetAll(Guid userId)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting Rooms for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var projectService = new RoomService(context);
                    return Ok(await projectService.GetAllRoomsAsync(userId));
                }
            }
    
            return BadRequest("Tenant doesn't exist");
        }
        
        [HttpGet]
        public async Task<ActionResult<Room>> Get(Guid id)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"getting Rooms for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var projectService = new RoomService(context);
                    return Ok(await projectService.GetRoomAsync(id));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Create([FromBody] NewRoom newRoom)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"creating room for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var roomService = new RoomService(context);
                    return Ok(await roomService.CreateRoomAsync(newRoom));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost("AddUser")]
        public async Task<ActionResult<bool>> AddUser([FromBody] AddRoomUser addUser)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"adding user for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var roomService = new RoomService(context);
                    return Ok(await roomService.AddUserAsync(addUser.RoomId, addUser.UserId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }

        [HttpPost("RemoveUser")]
        public async Task<ActionResult<bool>> RemoveUser([FromBody] AddRoomUser addList)
        {
            var tenant = (await _tenantService.GetTenantFromHostAsync());

            if (tenant != null)
            {
                Console.WriteLine($"remove user for {tenant.Id} : {tenant.Name}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var roomService = new RoomService(context);
                    return Ok(await roomService.RemoveUserAsync(addList.RoomId, addList.UserId));
                }
            }

            return BadRequest("Tenant doesn't exist");
        }
    }

    public class AddRoomUser
    {
        public Guid RoomId { get; set; }
        public Guid UserId { get; set; }
    }
}