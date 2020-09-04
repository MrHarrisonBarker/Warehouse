import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../Services/project.service";

@Component({
  selector: 'app-add-project-user',
  templateUrl: './add-project-user.component.html',
  styleUrls: ['./add-project-user.component.css']
})
export class AddProjectUserComponent implements OnInit
{

  constructor (public projectService: ProjectService)
  {
  }

  ngOnInit ()
  {
  }

  AddUser (email: string)
  {
    this.projectService.AddUserAsync(email).subscribe(result => {
      console.log(result);
    })
  }
}
