import {Component, OnInit} from '@angular/core';
import {User} from "../../../Models/User";
import {TenantService} from "../../../Services/tenant.service";
import {ProjectService} from "../../../Services/project.service";
import {ListService} from "../../../Services/list.service";
import {CreateList} from "../../../Models/List";

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

  constructor (public tenantService: TenantService, public projectService: ProjectService, private listService: ListService)
  {
  }

  ngOnInit ()
  {
    this.userBank = this.tenantService.Tenant.employments;
  }

  newList (name: string, description: string)
  {
    let createList: CreateList = {
      list: {
        name: name,
        description: description
      },
      employments: this.selectedUsers,
      projectId: this.projectService.currentProject.id
    };

    this.listService.CreateList(createList).subscribe(list => {
      console.log(list);
    });
  }

  AddUser ()
  {
    this.selectedUsers.push(this.tenantService.Tenant.employments.find(x => x.displayName == this.selectedUser));
    this.userBank = this.userBank.filter(x => x.displayName != this.selectedUser);
    this.selectedUser = null;
  }
}
