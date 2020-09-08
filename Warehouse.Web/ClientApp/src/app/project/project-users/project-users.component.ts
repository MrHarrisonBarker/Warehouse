import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../Services/project.service";
import {UserService} from "../../Services/user.service";
import {User} from "../../Models/User";

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.css']
})
export class ProjectUsersComponent implements OnInit {

  constructor(public projectService: ProjectService,public userService: UserService) { }

  ngOnInit() {
  }

  GetProjectsUsers(): User[]
  {
    return this.userService.TenantEmployments.filter(x => this.projectService.GetCurrentProject().employments.includes(x.id));
  }

  RemoveUser(user: User)
  {
    this.projectService.RemoveUserAsync(user.email).subscribe();
  }
}
