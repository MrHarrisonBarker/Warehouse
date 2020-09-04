using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;

namespace Warehouse.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }

        // many to many role
        public IList<Permission> Permissions { get; set; }

        // many to many TenantConfig
        [JsonIgnore] public IList<Employment> Employments { get; set; }

        [NotMapped]
        [JsonProperty("employments")]
        public IList<TenantViewModel> Tenants => Employments.Select(x => new TenantViewModel()
        {
            Id = x.TenantConfig.Id,
            Name = x.TenantConfig.Name,
            Accent = x.TenantConfig.Accent,
            Avatar = x.TenantConfig.Avatar,
            Description = x.TenantConfig.Description
        }).ToList();
    }

    public class UserViewModel
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
    }
}