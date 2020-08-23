import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Chat, Room} from "../Models/Room";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {List} from "../Models/List";
import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from "@aspnet/signalr";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService
{
  private BaseUrl: string;
  public Rooms: Room[] = [];
  connection: HubConnection;

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService)
  {
    this.BaseUrl = baseUrl;
  }

  GetRooms (): Observable<Room[]>
  {
    return this.http.get<Room[]>(this.BaseUrl + `api/room/all`, {params: new HttpParams().set('userId',this.authService.GetUser().id)}).pipe(map(rooms =>
    {
      this.Rooms = rooms;
      return rooms;
    }));
  }

  GetRoom (id: string): Observable<Room>
  {
    return this.http.get<Room>(this.BaseUrl + 'api/room', {
      params: new HttpParams().set('id', id)
    }).pipe(map(room =>
    {
      let index = this.Rooms.findIndex(x => x.id == room.id);

      if (index == -1)
      {
        this.Rooms.push(room);
        return room;
      }

      this.Rooms[index] = room;

      console.log(this.Rooms);

      return room;
    }));
  }

  GetRoomFromStore (id: string): Room
  {
    return this.Rooms.find(x => x.id == id);
  }

  public createConnection (): Promise<void>
  {
    if (this.connection != null)
    {
      this.connection.stop();
    }

    this.connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(this.BaseUrl + 'hub/chat', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    this.connection.on("NewChatMessage", (chat: Chat) =>
    {
      console.log("new chat", chat);
      this.Rooms[this.Rooms.findIndex(x => x.id == chat.room.id)].chats.push(chat);
    });

    this.connection.on("disconnect", disconnect =>
    {
      console.log('disconnect');
    });

    return this.connection.start()
  }

  SendChat (chat: Chat): Promise<void>
  {
    return this.connection.send("SendChat", chat);
  }

  DestroyConnection ()
  {
    if (this.connection != null)
    {
      this.connection.stop();
    }
  }
}
