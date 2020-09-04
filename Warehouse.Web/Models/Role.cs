using System;
using System.Collections;
using System.Collections.Generic;

namespace Warehouse.Models
{
    public class Role
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        
        public IList<Permission> Permissions { get; set; }
    }
}