import {Component, OnInit} from '@angular/core';
import {User} from "../../../Models/User";
import {TenantService} from "../../../Services/tenant.service";
import {ProjectService} from "../../../Services/project.service";
import {RoomService} from "../../../Services/room.service";
import {NewRoom} from "../../../Models/Room";
import {UserService} from "../../../Services/user.service";

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

  constructor (
    public projectService: ProjectService,
    private roomService: RoomService,
    private userService: UserService)
  {
  }

  ngOnInit ()
  {
    this.userBank = this.userService.TenantEmployments.filter(user => this.projectService.GetCurrentProject().employments.includes(user.id));
  }

  AddUser ()
  {
    this.selectedUsers.push(this.userService.TenantEmployments.find(x => x.displayName == this.selectedUser));
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
      projectId: this.projectService.currentProjectId
    };

    this.roomService.CreateRoom(newRoom).subscribe(room => {
      console.log(room);
    });
  }
}
