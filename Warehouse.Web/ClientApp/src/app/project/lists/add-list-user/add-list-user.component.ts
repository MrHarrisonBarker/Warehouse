import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {List, ListViewModel} from "../../../Models/List";
import {ListService} from "../../../Services/list.service";
import {UserService} from "../../../Services/user.service";
import {User} from "../../../Models/User";
import {ProjectService} from "../../../Services/project.service";

@Component({
  selector: 'app-add-list-user',
  templateUrl: './add-list-user.component.html',
  styleUrls: ['./add-list-user.component.css']
})
export class AddListUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ListViewModel,
    private listService: ListService,
    private userService: UserService,
    private projectService: ProjectService
  )
  {
  }

  ngOnInit()
  {
  }


  AddUser(userId: any)
  {
    this.listService.AddUserAsync(userId,this.data.id).subscribe();
  }

  GetUsers() : User[]
  {
    return this.userService.TenantEmployments.filter(user => !this.data.employments.includes(user.id) && this.projectService.GetCurrentProject().employments.includes(user.id));
  }
}
