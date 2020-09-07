import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class PreviewComponent implements OnInit, OnChanges
{

  @Input() Job: Job;
  public editingTitle: boolean = false;
  editingDescription: boolean = false;
  now: Date = new Date();

  constructor(
    public tenantService: TenantService,
    private jobService: JobService,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    public projectService: ProjectService) {
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    // console.log(changes);
    this.Job.deadline = this.Job.deadline == '0001-01-01T00:00:00' ? '' : this.Job.deadline;
  }

  ngOnInit()
  {
    this.Job.deadline = this.Job.deadline == '0001-01-01T00:00:00' ? '' : this.Job.deadline;
  }

  GetUsers(selectedJob: Job): User[] {
    return this.userService.TenantEmployments.filter(user => selectedJob.employments.find(e => e.userId == user.id));
  }

  UpdateType(type: string) {
    console.log("Updating job type", type);
    let updatedJob: Job = this.Job;
    updatedJob.jobType = this.tenantService.Tenant.jobTypes.find(x => x.id == type);

    this.jobService.UpdateTypeAsync(updatedJob).subscribe(updated => {
    });
  }

  UpdateStatus(status: string) {
    let updatedJob: Job = this.Job;
    updatedJob.jobStatus = this.tenantService.Tenant.jobStatuses.find(x => x.id == status);

    this.jobService.UpdateStatusAsync(updatedJob).subscribe(updated => {
    });
  }

  UpdatePriority(priority: string) {
    console.log("Updating job priority", priority);
    let updatedJob: Job = this.Job;
    updatedJob.jobPriority = this.tenantService.Tenant.jobPriorities.find(x => x.id == priority);

    this.jobService.UpdatePriorityAsync(updatedJob).subscribe(updated => {
    });
  }

  UpdateModule(value: string) {

  }

  UpdateTitle(title: string) {
    this.editingTitle = false;
    if (this.Job.title != title) {
      let updatedJob: Job = this.Job;
      updatedJob.title = title;
      this.jobService.UpdateJobAsync(updatedJob).subscribe();
    }
  }

  UpdateDescription(description: string) {
    this.editingDescription = false;
    if (this.Job.description != description) {
      let updatedJob: Job = this.Job;
      updatedJob.description = description;
      this.jobService.UpdateJobAsync(updatedJob).subscribe();
    }
  }


  UpdateDeadline()
  {
    console.log(this.Job.deadline);
    let updatedJob: Job = this.Job;
    this.jobService.UpdateJobAsync(updatedJob).subscribe();
  }
}
