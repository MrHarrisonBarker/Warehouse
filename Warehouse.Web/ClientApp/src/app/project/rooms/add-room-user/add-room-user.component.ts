import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Room} from "../../../Models/Room";
import {ProjectService} from "../../../Services/project.service";
import {RoomService} from "../../../Services/room.service";
import {User} from "../../../Models/User";
import {UserService} from "../../../Services/user.service";

@Component({
  selector: 'app-add-room-user',
  templateUrl: './add-room-user.component.html',
  styleUrls: ['./add-room-user.component.css']
})
export class AddRoomUserComponent implements OnInit
{

  constructor (
    @Inject(MAT_DIALOG_DATA) public room: Room,
    private roomService: RoomService,
    private projectService: ProjectService,
    private userService: UserService
  )
  {
  }

  ngOnInit ()
  {
  }

  GetUsers (): User[]
  {
    // let users: User[] = [];
    // employments.forEach(employment => {
    //   users.push(this.tenantService.Tenant.employments.find(x => x.id == employment.userId));
    // });
    return this.userService.TenantEmployments.filter(user => this.room.memberships.find(mem => mem.userId != user.id));
  }

  AddUser (userId: string)
  {
    this.roomService.AddUser(userId,this.room.id).subscribe(result => {
      console.log(result);
    })
  }
}
