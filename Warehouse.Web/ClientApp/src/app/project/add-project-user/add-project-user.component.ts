import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../Services/project.service";
import {UserService} from "../../Services/user.service";
import {AuthService} from "../../Services/auth.service";
import {User} from "../../Models/User";

@Component({
  selector: 'app-add-project-user',
  templateUrl: './add-project-user.component.html',
  styleUrls: ['./add-project-user.component.css']
})
export class AddProjectUserComponent implements OnInit
{

  constructor (public projectService: ProjectService,private userService: UserService, private authService: AuthService)
  {
  }

  ngOnInit ()
  {
  }

  GetUsers(): User[]
  {
    return this.userService.TenantEmployments.filter(x => x.id != this.authService.GetUser().id && !this.projectService.GetCurrentProject().employments.includes(x.id));
  }

  AddUser (id: string)
  {
    this.projectService.AddUserAsync(id).subscribe();
  }
}
