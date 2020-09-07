import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../Services/chat.service";
import {Room} from "../../Models/Room";
import {AuthService} from "../../Services/auth.service";
import {User} from "../../Models/User";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {NewRoomComponent} from "./new-room/new-room.component";
import {AddRoomUserComponent} from "./add-room-user/add-room-user.component";
import {UserService} from "../../Services/user.service";
import {Job} from "../../Models/Job";
import {JobService} from "../../Services/job.service";
import {ProjectService} from "../../Services/project.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Chat} from "../../Models/Chat";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {
  public message: string = '';
  public currentRoomId: string;
  mentionControl = new FormControl();
  jobMentionControl = new FormControl();
  private linkRegex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
  private imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi;

  // @ViewChild(MatAutocompleteTrigger, {static: false}) trigger: MatAutocompleteTrigger;
  public jobs: Job[];
  public selectedJob: Job;
  public ShowUserMention: boolean;
  public ShowJobMention: boolean;
  public selectedUser: User;
  public users: User[];

  constructor(
    public chatService: ChatService,
    private authService: AuthService,
    private userService: UserService,
    public dialog: MatDialog,
    private jobService: JobService,
    private projectService: ProjectService)
  {
    chatService.NewChat.subscribe(newChat => {
      if (newChat) {
        console.log("New chat");
        this.room.nativeElement.scrollTop = this.room.nativeElement.scrollHeight+100;
      }
    });
  }

  @ViewChild('room', {static: true}) room: ElementRef;

  ngOnInit() {
    this.chatService.GetRooms().subscribe(rooms => {
      if (rooms) {
        console.log(rooms);
        this.GetRoom(rooms[0].id).subscribe(room => {
          if (room) {
            this.GetProjectJobs();
            this.GetRoomUsers();
          }
        });
      }
    });
    this.room.nativeElement.scrollTop = this.room.nativeElement.scrollHeight;
    console.log(this.room);
  }

  mention: string = '<span class="mention" >@Harrison.Barker</span>';

  GetRoom(id: string) : Observable<Room>
  {
    return this.chatService.GetRoom(id).pipe(map(room => {
      this.currentRoomId = room.id;
      console.log(room);
      console.log(this.chatService.GetUserChats(this.currentRoomId));

      this.chatService.createConnection();
      return room;
    }));
  }

  SendMessage() {

    let chat: Chat = {
      message: this.message,
      userId: this.authService.GetUser().id,
      room: this.chatService.GetRoomFromStore(this.currentRoomId)
    };

    chat.message = chat.message.replace(this.imageRegex, function (url) {
      return `<img src="${url}">`;
    });

    chat.message = chat.message.replace(this.linkRegex, url => {
      if (url.match(this.imageRegex) == null) {
        console.log("not an image");
        return `<a target="_blank" href="${url}">${url}</a>`;
      }
      return url;
    });

    console.log("Sending chat", chat);

    this.chatService.SendChat(chat).then(() => {
      this.message = '';
      // this.room.nativeElement.scrollTop = this.room.nativeElement.scrollHeight;
      // console.log(this.room);
    });
  }

  GetRoomUsers() {
    this.users = this.userService.TenantEmployments.filter(x => this.chatService.GetRoomFromStore(this.currentRoomId).memberships.find(m => m.userId == x.id));
  }

  ngOnDestroy(): void {
    console.log("Destroying rooms");
    this.chatService.DestroyConnection();
  }

  NewRoom() {
    const dialogRef = this.dialog.open(NewRoomComponent);
  }

  AddUser(room: Room) {
    const dialogRef = this.dialog.open(AddRoomUserComponent, {
      data: room
    });
  }

  GetProjectJobs() {
    this.jobs = this.jobService.Jobs.filter(job => this.projectService.GetCurrentProject().jobs.includes(job.id));
  }

  mentionUser(user: User, selectionStart: number) {
    while (selectionStart > -1) {
      if (this.message[selectionStart] == "@") {
        let userMention = "@" + user.id;
        // let userMention = `<span class="mention" (click)="OpenUserMention(${user.id})">@${user.displayName}</span>`
        this.message = this.message.substr(0, selectionStart) + userMention + this.message.substr(selectionStart + userMention.length);
        this.ShowUserMention = false;
        return;
      }
      selectionStart--;
    }
  }

  mentionJob(job: Job, selectionStart: number) {
    // console.log(selectionStart);
    while (selectionStart > -1) {
      if (this.message[selectionStart] == "#") {
        let jobMention = "#" + job.id;
        this.message = this.message.substr(0, selectionStart) + jobMention + this.message.substr(selectionStart + jobMention.length);
        this.ShowJobMention = false;
        return;
      }
      selectionStart--;
    }
  }

  Complete($event: KeyboardEvent, selectionStart: number) {
    // console.log($event);
    if ($event.key == "@") {
      this.ShowUserMention = true;
    }
    if ($event.key == "#") {
      this.ShowJobMention = true;
    }

    if ($event.key == "Enter" && !this.ShowUserMention && !this.ShowJobMention) {
      this.SendMessage();
    }

    if ($event.key == "Enter" && this.ShowJobMention) {
      console.log("Completing Job");
      this.mentionJob(this.selectedJob, selectionStart);
    }

    if ($event.key == "Enter" && this.ShowUserMention) {
      console.log("Completing User");
      this.mentionUser(this.selectedUser, selectionStart);
    }
  }


  SearchJobs(selectionStart: number): Job[] {
    while (selectionStart > -1) {
      if (this.message[selectionStart] == "#") {
        if (this.message.substr(0) == "#") {
          this.selectedJob = this.jobs[0];
          return this.jobs;
        }
        let searchResults = this.jobs.filter(job => job.link.includes(this.message.substr(selectionStart + 1)));
        this.selectedJob = searchResults[0];
        return searchResults;
      }
      selectionStart--;
    }
  }

  SearchUsers(selectionStart: number): User[] {
    while (selectionStart > -1) {
      if (this.message[selectionStart] == "@") {
        if (this.message.substr(0) == "@") {
          this.selectedUser = this.users[0];
          return this.users;
        }
        let searchResults = this.users.filter(user => user.displayName.includes(this.message.substr(selectionStart + 1)));
        this.selectedUser = searchResults[0];
        return searchResults;
      }
      selectionStart--;
    }
  }

  Backspace() {
    if (!this.message.includes("@")) {
      this.ShowUserMention = false;
    }
    if (!this.message.includes("#")) {
      this.ShowJobMention = false;
    }
  }
}
