import {Component, OnInit} from '@angular/core';
import {User} from "../../Models/User";
import {TenantService} from "../../Services/tenant.service";
import {ProjectService} from "../../Services/project.service";
import {NewProject} from "../../Models/Project";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BottomNotificationComponent} from "../../bottom-notification/bottom-notification.component";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit
{
  selectedUser: string;
  selectedUsers: User[] = [];
  userBank: User[] = [];

  constructor (public tenantService: TenantService, private projectService: ProjectService, private _snackBar: MatSnackBar)
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

  newProject (name: string, description: string, accent: string, avatar: string, repo: string)
  {
    let newProject: NewProject = {
      project: {
        name: name,
        description: description,
        accent: accent,
        avatar: avatar,
        repo: repo
      },
      employments: this.selectedUsers
    };

    this.projectService.CreateProject(newProject).subscribe(project =>
    {
      if (project)
      {
        this._snackBar.open(`Created new project ${project.name}`, 'close', {duration: 1000});
      }
      console.log(project);
    });
  }
}
