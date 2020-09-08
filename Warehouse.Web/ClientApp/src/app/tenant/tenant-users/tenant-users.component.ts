import {Component, OnInit} from '@angular/core';
import {TenantService} from "../../Services/tenant.service";
import {UserService} from "../../Services/user.service";
import {User} from "../../Models/User";

@Component({
  selector: 'app-tenant-users',
  templateUrl: './tenant-users.component.html',
  styleUrls: ['./tenant-users.component.css']
})
export class TenantUsersComponent implements OnInit
{

  constructor (
    public tenantService: TenantService,
    public userService: UserService
  )
  {
  }

  ngOnInit ()
  {
  }

  RemoveUser(user: User)
  {
    this.tenantService.RemoveUserAsync(user.email).subscribe();
  }
}
