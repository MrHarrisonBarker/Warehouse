using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Models;
using Warehouse.Services;

namespace Warehouse.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly TenantService _tenantService;

        public UserController(IUserService userService, TenantService tenantService)
        {
            _userService = userService;
            _tenantService = tenantService;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IList<UserViewModel>>> GetAll()
        {
            var tenant = await _tenantService.GetTenantFromHostAsync();

            if (tenant != null)
            {
                return Ok(await _userService.GetAllUsersAsync(tenant));
            }
            
            return BadRequest("Tenant not found");
        }

        [HttpGet]
        public async Task<User> Get(Guid id)
        {
            return await _userService.GetUserAsync(id);
        }

        [HttpPost("authenticate")]
        public async Task<ActionResult<User>> Authenticate([FromBody] Auth auth)
        {
            var tenant = await _tenantService.GetTenantFromHostAsync();

            if (tenant == null)
            {
                return BadRequest($"Tenant not found");
            }
            
            var authenticate = await _userService.Authenticate(auth.Email, auth.Password, tenant);
            if (authenticate == null)
            {
                BadRequest();
            }

            return Ok(authenticate);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Create(User user)
        {
            return await _userService.CreateUserAsync(user);
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete(User user)
        {
            return await _userService.DeleteUserAsync(user);
        }
    }

    public class Auth
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}