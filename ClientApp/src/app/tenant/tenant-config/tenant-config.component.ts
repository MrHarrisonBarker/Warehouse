import {Component, OnInit} from '@angular/core';
import {TenantService} from "../../Services/tenant.service";

@Component({
  selector: 'app-tenant-config',
  templateUrl: './tenant-config.component.html',
  styleUrls: ['./tenant-config.component.css']
})
export class TenantConfigComponent implements OnInit
{

  constructor (public tenantService: TenantService)
  {
  }

  ngOnInit ()
  {
  }

  NewStatus (name: string, colour: string)
  {

    this.tenantService.NewStatus(name, colour).subscribe(status =>
    {
      console.log(status);
    });
  }

  NewType (name: string, colour: string)
  {

    this.tenantService.NewType(name, colour).subscribe(type =>
    {
      console.log(type);
    });
  }

  NewPriority (name: string, colour: string)
  {

    this.tenantService.NewPriority(name, colour).subscribe(priority =>
    {
      console.log(priority);
    });
  }

  AddUser (email: string)
  {
    this.tenantService.AddUser(email).subscribe(success =>
    {
      console.log(success);
    });
  }
}
