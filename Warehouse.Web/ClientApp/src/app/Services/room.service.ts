import {Inject, Injectable} from '@angular/core';
import {AddRoomUser, NewRoom, Room} from "../Models/Room";
import {Project} from "../Models/Project";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class RoomService
{
  private readonly BaseUrl: string;

  constructor (
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private _snackBar:MatSnackBar
  )
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

  AddUserAsync (userId: string, roomId: string): Observable<any>
  {
    let addRoomUser: AddRoomUser = {
      roomId: roomId,
      userId: userId
    };

    return this.http.post<boolean>(this.BaseUrl + 'api/room/adduser', addRoomUser).pipe(map(added => {
      if (added) {
        this._snackBar.open(`Added user to room"`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to add user to room`,'close',{duration:1000});
      }
      return added;
    }));
  }

  RemoveUserAsync(userId: string, roomId: string): Observable<boolean> {
    let addRoomUser: AddRoomUser = {
      roomId: roomId,
      userId: userId
    }

    return this.http.post<boolean>(this.BaseUrl + 'api/room/removeuser', addRoomUser).pipe(map(removed => {
      if (removed) {
        this._snackBar.open(`Removed user from room"`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to remove user from room`,'close',{duration:1000});
      }
      return removed;
    }));
  }
}
