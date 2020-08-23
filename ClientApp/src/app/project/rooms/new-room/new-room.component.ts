import {Component, OnInit} from '@angular/core';
import {User} from "../../../Models/User";
import {TenantService} from "../../../Services/tenant.service";
import {ProjectService} from "../../../Services/project.service";
import {RoomService} from "../../../Services/room.service";
import {NewRoom} from "../../../Models/Room";

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit
{

  selectedUser: string;
  selectedUsers: User[] = [];
  userBank: User[] = [];

  constructor (public tenantService: TenantService, public projectService: ProjectService, private roomService: RoomService)
  {
  }

  ngOnInit ()
  {
    this.userBank = this.tenantService.Tenant.employments.filter(x => this.projectService.currentProject.employments.find(e => e.userId == x.id));
  }

  AddUser ()
  {
    this.selectedUsers.push(this.tenantService.Tenant.employments.find(x => x.displayName == this.selectedUser));
    this.userBank = this.userBank.filter(x => x.displayName != this.selectedUser);
    this.selectedUser = null;
  }

  NewRoom (name: string)
  {
    let newRoom: NewRoom = {
      room: {
        name: name
      },
      memberships: this.selectedUsers,
      projectId: this.projectService.currentProject.id
    };

    this.roomService.CreateRoom(newRoom).subscribe(room => {
      console.log(room);
    });
  }
}
