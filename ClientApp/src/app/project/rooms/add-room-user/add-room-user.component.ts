import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Room} from "../../../Models/Room";
import {ChatService} from "../../../Services/chat.service";
import {ProjectService} from "../../../Services/project.service";
import {projectEmployment} from "../../../Models/Project";
import {RoomService} from "../../../Services/room.service";
import {TenantService} from "../../../Services/tenant.service";
import {User} from "../../../Models/User";

@Component({
  selector: 'app-add-room-user',
  templateUrl: './add-room-user.component.html',
  styleUrls: ['./add-room-user.component.css']
})
export class AddRoomUserComponent implements OnInit
{

  constructor (@Inject(MAT_DIALOG_DATA) public room: Room, private roomService: RoomService,private projectService: ProjectService, private tenantService: TenantService)
  {
  }

  ngOnInit ()
  {
  }

  GetUsers (): User[]
  {
    let users: User[] = [];
    let employments = this.projectService.currentProject.employments.filter(x => this.room.memberships.find(mem => mem.userId != x.userId));
    employments.forEach(employment => {
      users.push(this.tenantService.Tenant.employments.find(x => x.id == employment.userId));
    });
    return users;
  }

  AddUser (userId: string)
  {
    this.roomService.AddUser(userId,this.room.id).subscribe(result => {
      console.log(result);
    })
  }
}
