import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../../Models/Job";
import {User} from "../../../Models/User";
import {TenantService} from "../../../Services/tenant.service";
import {JobService} from "../../../Services/job.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../Services/user.service";
import {ProjectService} from "../../../Services/project.service";

@Component({
  selector: 'job-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit
{

  @Input()Job: Job;

  constructor (
    public tenantService: TenantService,
    private jobService: JobService,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    public projectService: ProjectService)
  {
  }

  ngOnInit ()
  {
  }

  GetUsers (selectedJob: Job): User[]
  {
    return this.userService.TenantEmployments.filter(user => selectedJob.employments.find(e => e.userId == user.id));
  }

  UpdateType(type: string) {
    console.log("Updating job type", type);
    let updatedJob: Job = this.Job;
    updatedJob.jobType = this.tenantService.Tenant.jobTypes.find(x => x.id == type);

    this.jobService.UpdateTypeAsync(updatedJob).subscribe(updated => {
      // if (updated) {
      //   this.Job.jobType = updatedJob.jobType;
      //   console.log("updated job type",this.Job);
      //   this._snackBar.open(`Updated type`, 'close', {duration: 1000});
      // }
    });
  }

  UpdateStatus(status: string) {
    let updatedJob: Job = this.Job;
    updatedJob.jobStatus = this.tenantService.Tenant.jobStatuses.find(x => x.id == status);

    this.jobService.UpdateStatusAsync(updatedJob).subscribe(updated => {
      // if (updated) {
      //   this.Job.jobStatus = updatedJob.jobStatus;
      //   console.log("updated job status",this.Job);
      //   this._snackBar.open(`Updated status`, 'close', {duration: 1000});
      // }
    });
  }

  UpdatePriority(priority: string) {
    console.log("Updating job priority", priority);
    let updatedJob: Job = this.Job;
    updatedJob.jobPriority = this.tenantService.Tenant.jobPriorities.find(x => x.id == priority);

    this.jobService.UpdatePriorityAsync(updatedJob).subscribe(updated => {
      // if (updated) {
      //   this.Job.jobPriority = updatedJob.jobPriority;
      //   console.log("updated job priority",this.Job);
      //   this._snackBar.open(`Updated priority`, 'close', {duration: 1000});
      // }
    });
  }
}
