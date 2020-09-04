import {Component, OnInit} from '@angular/core';
import {TenantService} from "../../Services/tenant.service";
import {JobPriority, JobStatus, JobType} from "../../Models/Job";

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

  NewStatus (name: string, colour: string, finished: boolean)
  {

    this.tenantService.NewStatusAsync(name, colour, finished).subscribe(status =>
    {
      console.log(status);
    });
  }

  NewType (name: string, colour: string)
  {

    this.tenantService.NewTypeAsync(name, colour).subscribe(type =>
    {
      console.log(type);
    });
  }

  NewPriority (name: string, colour: string)
  {

    this.tenantService.NewPriorityAsync(name, colour).subscribe(priority =>
    {
      console.log(priority);
    });
  }

  AddUser (email: string)
  {
    this.tenantService.AddUserAsync(email).subscribe(success =>
    {
      console.log(success);
    });
  }

  DeleteType (type: JobType)
  {

  }

  DeletePriority (priority: JobPriority)
  {

  }

  DeleteStatus (status: JobStatus)
  {

  }
}
