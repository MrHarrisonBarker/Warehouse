import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../../Services/auth.service";
import {TenantService} from "../../../Services/tenant.service";
import {User} from "../../../Models/User";
import {Job, NewJob} from "../../../Models/Job";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Project} from "../../../Models/Project";
import {List} from "../../../Models/List";
import {JobService} from "../../../Services/job.service";
import {UserService} from "../../../Services/user.service";
import {ProjectService} from "../../../Services/project.service";

export interface newJob
{
  projectId: string;
  listId: string;
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
  hover: boolean;

  constructor (
    public tenantService: TenantService,
    @Inject(MAT_DIALOG_DATA) public data: newJob,
    private jobService: JobService,
    private userService: UserService,
    private projectService: ProjectService)
  {
  }

  ngOnInit ()
  {
    this.userBank = this.userService.TenantEmployments.filter(user => this.projectService.GetProject(this.data.projectId).employments.includes(user.id));
  }

  AddUser ()
  {
    this.selectedUsers.push(this.userService.TenantEmployments.find(x => x.displayName == this.selectedUser));
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
        commit: commit,
        jobStatus: this.tenantService.Tenant.jobStatuses.find(x => x.name == status),
        jobPriority: this.tenantService.Tenant.jobPriorities.find(x => x.name == priority),
        jobType: this.tenantService.Tenant.jobTypes.find(x => x.name == type),
      },
      projectId: this.data.projectId,
      listId: this.data.listId,
      employments: this.selectedUsers
    };

    console.log("new job", newJob);

    this.jobService.CreateJobAsync(newJob).subscribe(job => {
      console.log(job);
    })
  }

  RemoveUser(user: User)
  {
    this.userBank.push(user);
    this.selectedUsers = this.selectedUsers.filter(x => x.id != user.id);
  }
}
