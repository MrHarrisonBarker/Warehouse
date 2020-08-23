import {Component, Input, OnInit} from '@angular/core';
import {User} from "../Models/User";
import {OnlineUserService} from "../Services/online-user.service";

@Component({
  selector: 'avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit
{

  @Input() User: User;
  @Input() Width: number = 60;

  constructor (private onlineUserService: OnlineUserService)
  {
  }

  ngOnInit ()
  {
  }

  IsUserOnline (): boolean
  {
    return this.onlineUserService.IsUserOnline(this.User.id);
  }
}
