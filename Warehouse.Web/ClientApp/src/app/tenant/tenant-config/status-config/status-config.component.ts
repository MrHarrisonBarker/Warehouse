import { Component, OnInit } from '@angular/core';
import {TenantService} from "../../../Services/tenant.service";
import {JobStatus} from "../../../Models/JobStatus";

@Component({
  selector: 'app-status-config',
  templateUrl: './status-config.component.html',
  styleUrls: ['./status-config.component.css']
})
export class StatusConfigComponent implements OnInit {
  colour: any;

  constructor(public tenantService: TenantService) { }

  ngOnInit() {
  }

  NewStatus (order: string, name: string, finished: boolean)
  {
    this.tenantService.NewStatusAsync(parseInt(order), name, this.colour, finished).subscribe(status =>
    {
      console.log(status);
    });
  }

  DeleteStatus (status: JobStatus)
  {
    this.tenantService.DeleteStatusAsync(status).subscribe();
  }

  Statuses() {
    return this.tenantService.Tenant.jobStatuses.sort((a,b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }

      return 0;
    });
  }

  DetectOrderChange(status: JobStatus, value: string)
  {
    if (status.order != parseInt(value)) {
      status.order = parseInt(value);
      this.tenantService.UpdateJobStatusAsync(status).subscribe();
    }
  }

  DetectNameChange(status: JobStatus, value: string)
  {
    if (status.name != value) {
      status.name = value;
      this.tenantService.UpdateJobStatusAsync(status).subscribe();
    }
  }

  DetectFinishedChange(status: JobStatus, value: boolean)
  {
    if (status.finished != value) {
      status.finished = value;
      this.tenantService.UpdateJobStatusAsync(status).subscribe();
    }
  }

  DetectColourChange(status: JobStatus) {
      this.tenantService.UpdateJobStatusAsync(status).subscribe();
  }
}
