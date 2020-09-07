import {Component, OnInit} from '@angular/core';
import {User} from "../../Models/User";
import {TenantService} from "../../Services/tenant.service";
import {ProjectService} from "../../Services/project.service";
import {NewProject} from "../../Models/Project";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../Services/user.service";

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
  color: any;
  short: string;

  constructor (
    private projectService: ProjectService,
    private _snackBar: MatSnackBar,
    private userService: UserService)
  {
  }

  ngOnInit ()
  {
    this.userBank = this.userService.TenantEmployments;
  }

  AddUser ()
  {
    this.selectedUsers.push(this.userService.TenantEmployments.find(x => x.displayName == this.selectedUser));
    this.userBank = this.userBank.filter(x => x.displayName != this.selectedUser);
    this.selectedUser = null;
  }

  newProject (short:string,name: string, description: string, avatar: string, repo: string)
  {
    let newProject: NewProject = {
      project: {
        short: short,
        name: name,
        description: description,
        accent: this.color,
        avatar: avatar,
        repo: repo
      },
      employments: this.selectedUsers
    };

    this.projectService.CreateProjectAsync(newProject).subscribe(project =>
    {
      console.log(project);
    });
  }

  setShort(name: string)
  {
    if (this.short == null) {
      this.short = name.substr(0,3).toUpperCase();
    }
  }
}
