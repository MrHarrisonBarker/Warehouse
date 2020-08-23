using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Timeline.Neo.Helpers;
using Warehouse.Contexts;
using Warehouse.Models;

namespace Warehouse.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string email, string password, TenantConfig tenant);
        Task<User> GetUserAsync(Guid id);
        Task<IList<UserViewModel>> GetAllUsersAsync(TenantConfig tenant);
        Task<bool> CreateUserAsync(User user);
        Task<bool> DeleteUserAsync(User user);
    }

    public class UserService : IUserService
    {
        private readonly MultiTenantContext _multiTenantContext;

        private readonly AppSettings _appSettings;
        // private readonly TenantService _tenantService;

        public UserService(MultiTenantContext multiTenantContext, IOptions<AppSettings> appSettings)
        {
            _multiTenantContext = multiTenantContext;
            _appSettings = appSettings.Value;
            // _tenantService = tenantService;
        }

        public async Task<User> Authenticate(string email, string password, TenantConfig tenant)
        {
            PasswordHasher<User> hasher = new PasswordHasher<User>(
                new OptionsWrapper<PasswordHasherOptions>(
                    new PasswordHasherOptions()
                    {
                        CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2
                    })
            );

            Console.WriteLine($"Authenticating {email}");

            var user = await _multiTenantContext.Users.Include(x => x.Employments).ThenInclude(x => x.TenantConfig)
                .FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                Console.WriteLine("Cant find user");
                return null;
            }

            if (tenant.Name != _appSettings.BaseHost)
            {
                if (await _multiTenantContext.Employments.FirstOrDefaultAsync(x =>
                    x.TenantId == tenant.Id && x.UserId == user.Id) == null)
                {
                    Console.WriteLine("User isn't employed by the tenant");
                    return null;
                }
            }


            if (hasher.VerifyHashedPassword(user, user.Password, password) == PasswordVerificationResult.Failed)
            {
                Console.WriteLine("Password incorrect");
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            user.Password = null;

            return user;
        }

        public async Task<User> GetUserAsync(Guid id)
        {
            return await _multiTenantContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IList<UserViewModel>> GetAllUsersAsync(TenantConfig tenant)
        {
            return await _multiTenantContext.Employments.Where(x => x.TenantId == tenant.Id).Select(x =>
                new UserViewModel()
                {
                    Avatar = x.User.Avatar,
                    Id = x.User.Id,
                    Email = x.User.Email,
                    DisplayName = x.User.DisplayName
                }).ToListAsync();
        }

        public async Task<bool> CreateUserAsync(User user)
        {
            var userExists = await _multiTenantContext.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
            if (userExists != null)
            {
                Console.WriteLine("User already exists");
                return false;
            }

            PasswordHasher<User> hasher = new PasswordHasher<User>(
                new OptionsWrapper<PasswordHasherOptions>(
                    new PasswordHasherOptions()
                    {
                        CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2
                    })
            );

            user.Password = hasher.HashPassword(user, user.Password);

            _multiTenantContext.Users.Add(user);

            try
            {
                await _multiTenantContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public Task<bool> DeleteUserAsync(User user)
        {
            throw new NotImplementedException();
        }
    }
}