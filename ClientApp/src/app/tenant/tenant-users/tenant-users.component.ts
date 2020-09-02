import {Component, OnInit} from '@angular/core';
import {TenantService} from "../../Services/tenant.service";

@Component({
  selector: 'app-tenant-users',
  templateUrl: './tenant-users.component.html',
  styleUrls: ['./tenant-users.component.css']
})
export class TenantUsersComponent implements OnInit
{

  constructor (public tenantService: TenantService)
  {
  }

  ngOnInit ()
  {
  }

}
