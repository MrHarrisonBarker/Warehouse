using System;
using System.Collections;
using System.Collections.Generic;
using Warehouse.Models.Joins;

namespace Warehouse.Models
{
    public class UserId
    {
        public Guid Id { get; set; }

        public IList<ProjectEmployment> ProjectEmployments { get; set; }
        public IList<ListEmployment> ListEmployments { get; set; }
        public IList<RoomMembership> RoomMemberships { get; set; }
        public IList<JobEmployment> JobEmployments { get; set; }
    }
}