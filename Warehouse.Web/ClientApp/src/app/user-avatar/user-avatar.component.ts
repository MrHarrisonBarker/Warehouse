import {Component, Input, OnInit} from '@angular/core';
import {User} from "../Models/User";
import {OnlineUserService} from "../Services/online-user.service";
import {JobService} from "../Services/job.service";
import {ListService} from "../Services/list.service";
import {RoomService} from "../Services/room.service";

@Component({
  selector: 'avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit
{

  @Input() User: User;
  @Input() Width: number = 60;

  @Input() jobId: string = null;
  @Input() listId: string = null;
  @Input() roomId: string = null;

  hover: boolean = false;
  public remove: string = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDJDNi40NyAyIDIgNi40NyAyIDEyczQuNDcgMTAgMTAgMTAgMTAtNC40NyAxMC0xMFMxNy41MyAyIDEyIDJ6bTUgMTMuNTlMMTUuNTkgMTcgMTIgMTMuNDEgOC40MSAxNyA3IDE1LjU5IDEwLjU5IDEyIDcgOC40MSA4LjQxIDcgMTIgMTAuNTkgMTUuNTkgNyAxNyA4LjQxIDEzLjQxIDEyIDE3IDE1LjU5eiIvPjwvc3ZnPg==";
  image: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABYklEQVR4Ae3XIWzCQBiG4YmKikq8mg8+OHwqEMjJyfNBICqQ+CCRFQi8QiAQlRMIBKISOVHx7xUTyyWXL/l3NRtv8jhCvpTrJbw8+y9N0eCAM27fTmixwitGrUTAHQZIH3hDgazVuMKcOsyQpQaWwYB3uCvQwjLbwtUGNgrHk1rCRjRgBtJV6MUBNU1+tkMB2Rrq99/ChKDPIVeCqMQDFsMRRHpUiF6OLnlPiebid1+oUQj4WYAliRt9B3OM8o0BVkh2gflGOcYALZLdYZ5RrjHACclMi0eJMdrNMUi8TeKgC3ck691j/KPOSNY5xwQsnKMOSLZ3jRFXgtAgWe0bA/+oKZJV+NSPNh4jR3XyQDsPZIjH6FHq+3QTPMQhNAUDjrCEK0roKMBGVkOn37gsGu//sBMssxbuysxPaoMCvy6Ig670WCJrE2yje0p5YI0Ko1Whxh4d+uiiu2CHOUo8+9t9AUcCWfVf/Xv1AAAAAElFTkSuQmCC";

  constructor (
    private onlineUserService: OnlineUserService,
    private jobService: JobService,
    private listService: ListService,
    private roomService: RoomService
  )
  {
  }

  ngOnInit ()
  {
  }

  IsUserOnline (): boolean
  {
    return this.onlineUserService.IsUserOnline(this.User.id);
  }

  RemoveUser()
  {
    if (this.jobId != null) {
      this.RemoveUserFromJob();
    } else if (this.listId != null) {
      this.RemoveUserFromList();
    } else if (this.roomId != null) {
      this.RemoveUserFromRoom();
    }
  }

  RemoveUserFromJob()
  {
    this.jobService.RemoveUserAsync(this.User.id, this.jobId).subscribe();
  }

  RemoveUserFromList()
  {
    this.listService.RemoveUserAsync(this.User.id, this.listId).subscribe();
  }

  RemoveUserFromRoom()
  {
    this.roomService.RemoveUserAsync(this.User.id, this.roomId).subscribe();
  }
}
