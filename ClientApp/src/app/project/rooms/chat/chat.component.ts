import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../Models/Room";
import {TenantService} from "../../../Services/tenant.service";
import {User} from "../../../Models/User";
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit
{

  @Input() Chat: Chat;
  mentioned: boolean = false;

  constructor (private tenantService: TenantService, private authService: AuthService)
  {
  }

  ngOnInit ()
  {
  }

  GetUserAvatar (): string
  {
    return this.tenantService.Tenant.employments.find(x => x.id == this.Chat.userId).avatar;
  }

  GetUser (): User
  {
    return this.tenantService.Tenant.employments.find(x => x.id == this.Chat.userId);
  }

  ScanMessage (): string
  {
    let linkRegex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
    let mentionRegex = /@[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;

    this.Chat.message = this.Chat.message.replace(linkRegex, function (url)
    {
      return '<a target="_blank" href="' + url + '">' + url + '</a>';
    });

    let match = this.Chat.message.match(mentionRegex);
    if (match != null && match.findIndex(x => x.substring(1) == this.authService.GetUser().id) != -1)
    {
      this.mentioned = true;
    }

    return this.Chat.message.replace(mentionRegex, userId =>
    {
      return `<span class="mention">@${this.tenantService.Tenant.employments.find(x => x.id == userId.substring(1)).displayName}</span>`
    });
  }
}
