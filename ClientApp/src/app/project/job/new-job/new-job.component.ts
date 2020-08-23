import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../../Services/auth.service";
import {TenantService} from "../../../Services/tenant.service";
import {User} from "../../../Models/User";
import {Job, NewJob} from "../../../Models/Job";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Project} from "../../../Models/Project";
import {List} from "../../../Models/List";
import {JobService} from "../../../Services/job.service";

export interface newJob
{
  project: Project;
  list: List;
}

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit
{

  deadlinePicker: Date;
  deadlineTime: Date;
  InitialStatus: any;
  now: Date = new Date();
  selectedUser: any;
  selectedUsers: User[] = [];
  userBank: User[] = [];
  DeadlineDate: Date;

  constructor (public tenantService: TenantService,@Inject(MAT_DIALOG_DATA) public data: newJob, private jobService: JobService)
  {
  }

  ngOnInit ()
  {
    this.userBank = this.tenantService.Tenant.employments;
  }


  AddUser ()
  {
    this.selectedUsers.push(this.tenantService.Tenant.employments.find(x => x.displayName == this.selectedUser));
    this.userBank = this.userBank.filter(x => x.displayName != this.selectedUser);
    this.selectedUser = null;
  }

  newJob (title: string, description: string, associatedUrl: string, commit: string, type: string, status: string, priority: string)
  {
    let newJob: NewJob = {
      job: {
        title: title,
        description: description,
        deadline: this.DeadlineDate,
        jobStatus: this.tenantService.Tenant.jobStatuses.find(x => x.name == status),
        jobPriority: this.tenantService.Tenant.jobPriorities.find(x => x.name == priority),
        jobType: this.tenantService.Tenant.jobTypes.find(x => x.name == type),
      },
      projectId: this.data.project.id,
      listId: this.data.list.id,
      employments: this.selectedUsers
    };

    console.log("new job", newJob);

    this.jobService.CreateJob(newJob).subscribe(job => {
      console.log(job);
    })
  }
}
