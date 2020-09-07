import {Component, Input, OnInit} from '@angular/core';
import {User} from "../Models/User";
import {OnlineUserService} from "../Services/online-user.service";
import {ChatService} from "../Services/chat.service";
import {JobService} from "../Services/job.service";

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
  hover: boolean = false;
  public remove: string = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDJDNi40NyAyIDIgNi40NyAyIDEyczQuNDcgMTAgMTAgMTAgMTAtNC40NyAxMC0xMFMxNy41MyAyIDEyIDJ6bTUgMTMuNTlMMTUuNTkgMTcgMTIgMTMuNDEgOC40MSAxNyA3IDE1LjU5IDEwLjU5IDEyIDcgOC40MSA4LjQxIDcgMTIgMTAuNTkgMTUuNTkgNyAxNyA4LjQxIDEzLjQxIDEyIDE3IDE1LjU5eiIvPjwvc3ZnPg==";

  constructor (private onlineUserService: OnlineUserService,private jobService: JobService)
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
    this.jobService.RemoveUserAsync(this.User.id, this.jobId).subscribe();
  }
}
