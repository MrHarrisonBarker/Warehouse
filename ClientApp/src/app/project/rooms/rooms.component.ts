import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../Services/chat.service";
import {Chat, Room} from "../../Models/Room";
import {AuthService} from "../../Services/auth.service";
import {TenantService} from "../../Services/tenant.service";
import {User} from "../../Models/User";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {NewJobComponent} from "../job/new-job/new-job.component";
import {NewRoomComponent} from "./new-room/new-room.component";
import {AddRoomUserComponent} from "./add-room-user/add-room-user.component";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy
{
  public message: any = '';
  public currentRoomId: string;
  mentionControl = new FormControl();

  // @ViewChild(MatAutocompleteTrigger, {static: false}) trigger: MatAutocompleteTrigger;

  constructor (public chatService: ChatService, private authService: AuthService, private tenantService: TenantService, public dialog: MatDialog)
  {
  }

  ngOnInit ()
  {
    this.chatService.GetRooms().subscribe(rooms =>
    {
      console.log(rooms);
      this.GetRoom(rooms[0].id);
    })
  }

  // @ViewChild( 'typehead', {read:MatAutocompleteTrigger})  autoTrigger: MatAutocompleteTrigger;
  //
  // ngAfterViewInit()
  // {
  //   this.autoTrigger.panelClosingActions.subscribe( x =>{
  //     if (this.autoTrigger.activeOption)
  //     {
  //       console.log(this.autoTrigger.activeOption.value)
  //       this.myControl.setValue(this.autoTrigger.activeOption.value)
  //     }
  //   } )
  // }

  GetRoom (id: string)
  {
    this.chatService.GetRoom(id).subscribe(room =>
    {
      this.currentRoomId = room.id;
      console.log(room);

      this.chatService.createConnection();
    })
  }

  SendMessage ()
  {
    let chat: Chat = {
      message: this.message,
      userId: this.authService.GetUser().id,
      room: this.chatService.GetRoomFromStore(this.currentRoomId)
    };

    console.log("Sending chat", chat);

    this.chatService.SendChat(chat).then(() =>
    {
      this.message = '';
    });
  }

  GetRoomUsers (): User[]
  {
    return this.tenantService.Tenant.employments.filter(x => this.chatService.GetRoomFromStore(this.currentRoomId).memberships.find(m => m.userId == x.id));
  }

  ngOnDestroy (): void
  {
    console.log("Destroying rooms");
    this.chatService.DestroyConnection();
  }

  NewRoom ()
  {
    const dialogRef = this.dialog.open(NewRoomComponent);
  }

  AddUser (room: Room)
  {
    const dialogRef = this.dialog.open(AddRoomUserComponent, {
      data: room
    });
  }
}
