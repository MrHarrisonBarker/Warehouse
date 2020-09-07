import {EventEmitter, Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Room, UserChat} from "../Models/Room";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {List} from "../Models/List";
import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from "@aspnet/signalr";
import {AuthService} from "./auth.service";
import {Chat} from "../Models/Chat";

@Injectable({
  providedIn: 'root'
})
export class ChatService
{
  private BaseUrl: string;
  public Rooms: Room[] = [];
  connection: HubConnection;
  public NewChat: EventEmitter<any> = new EventEmitter<any>();

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

  GetUserChats(id: string) : UserChat[]
  {
    let chats = this.GetRoomFromStore(id).chats;
    if (chats != null && chats.length > 0) {
      let userChats: UserChat[] = [{
        userId: chats[0].userId,
        chats: [chats[0]]
      }];

      for (let i = 1; i < chats.length; i++) {
        let diff = new Date(chats[i].timeStamp).getTime() - new Date(userChats[userChats.length - 1].chats[userChats[userChats.length - 1].chats.length - 1].timeStamp).getTime();
        if (chats[i].userId == userChats[userChats.length - 1].userId && (diff / (1000 * 60)) <= 1) {
          userChats[userChats.length - 1].chats.push(chats[i]);
        } else {
          userChats.push({
            userId: chats[i].userId,
            chats: [chats[i]]
          });
        }
      }

      return userChats;
    }
    return null;
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
      this.NewChat.emit("new");
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
