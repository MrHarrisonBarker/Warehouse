import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../../Models/Job";
import {User} from "../../../Models/User";
import {TenantService} from "../../../Services/tenant.service";

@Component({
  selector: 'job-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit
{

  @Input()Job: Job;

  constructor (public tenantService: TenantService)
  {
  }

  ngOnInit ()
  {
  }

  GetUsers (selectedJob: Job): User[]
  {
    return this.tenantService.Tenant.employments.filter(x => selectedJob.employments.find(e => e.userId == x.id))
  }
}
