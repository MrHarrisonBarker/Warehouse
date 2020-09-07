import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Job} from "../../../Models/Job";
import {User} from "../../../Models/User";
import {UserService} from "../../../Services/user.service";
import {ProjectService} from "../../../Services/project.service";
import {AuthService} from "../../../Services/auth.service";
import {JobService} from "../../../Services/job.service";

@Component({
  selector: 'app-add-job-worker',
  templateUrl: './add-job-worker.component.html',
  styleUrls: ['./add-job-worker.component.css']
})
export class AddJobWorkerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Job,
    private userService: UserService,
    private projectService: ProjectService,
    private authService: AuthService,
    private jobService: JobService
  ) { }

  ngOnInit()
  {
  }


  GetUsers() : User[]
  {
    return this.userService.TenantEmployments.filter(user => this.projectService.GetCurrentProject().employments.includes(user.id) && this.authService.GetUser().id != user.id && this.data.employments.filter(x => x.userId == user.id).length == 0)
  }

  AddUser(userId: any)
  {
    this.jobService.AddUserAsync(userId,this.data.id).subscribe();
  }
}
