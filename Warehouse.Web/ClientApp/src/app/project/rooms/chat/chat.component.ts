import {Component, Input, OnInit} from '@angular/core';
import {UserChat} from "../../../Models/Room";
import {User} from "../../../Models/User";
import {AuthService} from "../../../Services/auth.service";
import {UserService} from "../../../Services/user.service";
import {JobService} from "../../../Services/job.service";
import {NewJobComponent} from "../../job/new-job/new-job.component";
import {JobComponent} from "../../job/job.component";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Chat} from "../../../Models/Chat";

enum MessageType
{
  Message,
  JobMention,
  UserMention
}

interface Message
{
  type: MessageType;
  message: string;
}

enum MentionType
{
  Job,
  User
}

interface MentionIndex
{
  type: MentionType,
  index: number
}

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() userChat: UserChat;
  mentioned: boolean;
  hover: boolean = false;
  userMentionRegex = /@[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;
  jobMentionRegex = /#[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jobService: JobService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    // this.DeconstructMessage()
  }

  DeconstructMessage(chat: Chat): Message[] {
    // let matches = chat.message.match(this.jobMentionRegex)
    // if (matches == null) {
    //   return chat.message;
    // }
    // let message = "";
    // let prev = 0;
    // matches.forEach(match => {
    //   let index = chat.message.indexOf(match);
    //   message += chat.message.substring(prev, index) + "JOB MENTION";
    //   prev = index + 32;
    // });
    // console.log(matchIndexes);

    let match;
    let indexes: MentionIndex[] = [];
    while ((match = this.jobMentionRegex.exec(chat.message)) != null) {
      indexes.push({
        index: match.index,
        type: MentionType.Job
      });
    }
    while ((match = this.userMentionRegex.exec(chat.message)) != null) {
      indexes.push({
        index: match.index,
        type: MentionType.User
      });
    }

    indexes.sort((a,b) => {
      if (a.index > b.index) {
        return 1;
      }
      if (a.index < b.index) {
        return -1;
      }
      return 0;
    });

    if (indexes.length >  0 ) {
      // console.log(indexes);
      let messageArray:Message[] = [];
      let prev = 0;
      indexes.forEach(index => {
        messageArray.push({
          type: MessageType.Message,
          message: chat.message.substring(prev,index.index)
        });

        if (index.type == MentionType.Job) {
          messageArray.push({
            type: MessageType.JobMention,
            message: chat.message.substr(index.index+1,36)
          });
        } else if (index.type == MentionType.User)
        {
          messageArray.push({
            type: MessageType.UserMention,
            message: chat.message.substr(index.index+1,36)
          });
        }

        prev += index.index + 37;
      });
      // console.log(messageArray);
      return messageArray;
    }
    return [{type: MessageType.Message,message:chat.message}];
  }

  GetUser(): User {
    return this.userService.TenantEmployments.find(x => x.id == this.userChat.userId);
  }

  // ScanMessage(chat: Chat): SafeHtml {
  //   let match = chat.message.match(this.userMentionRegex);
  //   if (match != null && match.findIndex(x => x.substring(1) == this.authService.GetUser().id) != -1) {
  //     this.mentioned = true;
  //   }
  //
  //   let message = chat.message.replace(this.userMentionRegex, userId => {
  //     return `<span class="mention">@${this.userService.TenantEmployments.find(x => x.id == userId.substring(1)).displayName}</span>`
  //   });
  //
  //   message = message.replace(this.jobMentionRegex, jobId => {
  //     return `<span (click)="JobMentionClicked(${jobId})" class="jobMention">#${this.jobService.Jobs.find(x => x.id == jobId.substring(1)).link}</span>`
  //   });
  //
  //
  //
  // }

  public JobMentionClicked(jobId: string) {
    console.log(jobId);
    this.dialog.open(JobComponent)
  }


  GetJobLink(id: string): string
  {
    return this.jobService.Jobs.find(x => x.id == id).link;
  }

  UserMentionClicked(message: string)
  {

  }

  GetUserLink(message: string) : string
  {
    return this.userService.TenantEmployments.find(x => x.id == message).displayName
  }
}
