import {Component, OnInit} from '@angular/core';
import {User} from "../../../Models/User";
import {TenantService} from "../../../Services/tenant.service";
import {ProjectService} from "../../../Services/project.service";
import {ListService} from "../../../Services/list.service";
import {CreateList} from "../../../Models/List";
import {UserService} from "../../../Services/user.service";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit
{

  selectedUser: string;
  selectedUsers: User[] = [];
  userBank: User[] = [];

  constructor (
    public projectService: ProjectService,
    private listService: ListService,
    private userService: UserService)
  {
  }

  ngOnInit ()
  {
    this.userBank = this.userService.TenantEmployments.filter(user => this.projectService.GetCurrentProject().employments.includes(user.id));
  }

  newList (name: string, description: string)
  {
    let createList: CreateList = {
      list: {
        name: name,
        description: description
      },
      employments: this.selectedUsers,
      projectId: this.projectService.currentProjectId
    };

    this.listService.CreateListAsync(createList).subscribe(list => {
      this.projectService.Projects[this.projectService.Projects.findIndex(x => x.id == createList.projectId)].lists.push(list.id);
      console.log(list);
    });
  }

  AddUser ()
  {
    this.selectedUsers.push(this.userService.TenantEmployments.find(x => x.displayName == this.selectedUser));
    this.userBank = this.userBank.filter(x => x.displayName != this.selectedUser);
    this.selectedUser = null;
  }
}
