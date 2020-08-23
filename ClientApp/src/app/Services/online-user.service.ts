import {Inject, Injectable} from '@angular/core';
import {Chat, Room} from "../Models/Room";
import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from "@aspnet/signalr";
import {HttpClient} from "@angular/common/http";
import {TenantOnlineUserTracker} from "../Models/OnlineUser";

@Injectable({
  providedIn: 'root'
})
export class OnlineUserService
{
  private BaseUrl: string;
  private connection: HubConnection;
  private TenantOnlineUserTracker: TenantOnlineUserTracker;

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.BaseUrl = baseUrl;
  }

  public CreateConnection (userId: string): void
  {
    console.log("Creating online user connection");

    this.connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(this.BaseUrl + 'hub/user', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    this.connection.start().then(() =>
    {
      console.log("Sending user to hub");
      this.connection.send("AddUser", userId).catch(err =>
      {
        console.log(err);
      });
    });

    this.connection.on("ConnectionList", (tenantOnlineUserTracker: TenantOnlineUserTracker) =>
    {
      console.log("incoming online user list", tenantOnlineUserTracker);
      this.TenantOnlineUserTracker = tenantOnlineUserTracker;
    });
  }


  public IsUserOnline (userId: string): boolean
  {
    if (this.TenantOnlineUserTracker != null) {
      return this.TenantOnlineUserTracker.onlineUsers.findIndex(x => x.id == userId) != -1;
    }
  }
}
