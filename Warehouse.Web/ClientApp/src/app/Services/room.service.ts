import {Inject, Injectable} from '@angular/core';
import {AddRoomUser, NewRoom, Room} from "../Models/Room";
import {Project} from "../Models/Project";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService
{
  private readonly BaseUrl: string;

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.BaseUrl = baseUrl;
  }

  CreateRoom (newRoom: NewRoom): Observable<Room>
  {
    return this.http.post<Room>(this.BaseUrl + 'api/room', newRoom).pipe(map(room =>
    {
      // this.projects.push(project);
      return room;
    }));
  }

  AddUser (userId: string, roomId: string): Observable<any>
  {
    let addRoomUser: AddRoomUser = {
      roomId: roomId,
      userId: userId
    };

    return this.http.post<any>(this.BaseUrl + 'api/room/adduser', addRoomUser);
  }
}
