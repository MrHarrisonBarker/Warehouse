import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ProjectDashboardComponent} from "../project-dashboard/project-dashboard.component";
import {EventsComponent} from "./events/events.component";
import {AuthGuard} from "../auth.guard";
import {ListsComponent} from "./lists/lists.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {JobsComponent} from "./job/jobs/jobs.component";
import {WorkComponent} from "./work/work.component";
import {ProjectUsersComponent} from "./project-users/project-users.component";
import {ConfigComponent} from "./config/config.component";
import {ModulesComponent} from "./modules/modules.component";
import {ChatComponent} from "./rooms/chat/chat.component";
import {NewJobComponent} from "./job/new-job/new-job.component";
import {NewListComponent} from "./lists/new-list/new-list.component";
import {NewEventComponent} from "./events/new-event/new-event.component";
import {ProjectNavComponent} from "./project-nav/project-nav.component";
import {NewRoomComponent} from "./rooms/new-room/new-room.component";
import {AddProjectUserComponent} from "./add-project-user/add-project-user.component";
import {AddRoomUserComponent} from "./rooms/add-room-user/add-room-user.component";
import {BasicProjectConfigComponent} from "./config/basic-project-config/basic-project-config.component";
import {SharedModule} from "../shared.module";
import { AddJobWorkerComponent } from './job/add-job-worker/add-job-worker.component';
import { AddListUserComponent } from './lists/add-list-user/add-list-user.component';



@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ListsComponent,
    EventsComponent,
    RoomsComponent,
    ChatComponent,
    NewListComponent,
    NewEventComponent,
    ProjectNavComponent,
    NewRoomComponent,
    ConfigComponent,
    AddProjectUserComponent,
    AddRoomUserComponent,
    WorkComponent,
    ProjectUsersComponent,
    JobsComponent,
    BasicProjectConfigComponent,
    ModulesComponent,
    AddJobWorkerComponent,
    AddListUserComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: ':id', component: ProjectDashboardComponent, pathMatch: 'full'},
      {path: ':id/events', component: EventsComponent, canActivate: [AuthGuard]},
      {path: ':id/lists', component: ListsComponent, canActivate: [AuthGuard]},
      {path: ':id/chat', component: RoomsComponent, canActivate: [AuthGuard]},
      {path: ':id/jobs', component: JobsComponent, canActivate: [AuthGuard]},
      {path: ':id/work', component: WorkComponent, canActivate: [AuthGuard]},
      {path: ':id/users', component: ProjectUsersComponent, canActivate: [AuthGuard]},
      {path: ':id/config', component: ConfigComponent, canActivate: [AuthGuard]},
      {path: ':id/modules', component: ModulesComponent, canActivate: [AuthGuard]},
    ])
  ],
  entryComponents: [AddListUserComponent,NewListComponent,NewRoomComponent,AddProjectUserComponent,AddRoomUserComponent,AddJobWorkerComponent]
})
export class ProjectModule { }
