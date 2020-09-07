import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AuthGuard} from "./auth.guard";
import {TenantDashboardComponent} from './tenant-dashboard/tenant-dashboard.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {ProjectDashboardComponent} from "./project-dashboard/project-dashboard.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {ListsComponent} from './project/lists/lists.component';
import {EventsComponent} from './project/events/events.component';
import {RoomsComponent} from './project/rooms/rooms.component';
import {JobComponent} from './project/job/job.component';
import {ChatComponent} from "./project/rooms/chat/chat.component";
import {NewJobComponent} from './project/job/new-job/new-job.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NewListComponent} from './project/lists/new-list/new-list.component';
import {NewEventComponent} from './project/events/new-event/new-event.component';
import {NewProjectComponent} from './project/new-project/new-project.component';
import {OverviewComponent} from "./overview/overview.component";
import {UserAvatarComponent} from './user-avatar/user-avatar.component';
import {ProjectNavComponent} from './project/project-nav/project-nav.component';
import {OnlineUserService} from "./Services/online-user.service";
import {NewRoomComponent} from './project/rooms/new-room/new-room.component';
import {ConfigComponent} from './project/config/config.component';
import {TenantConfigComponent} from './tenant/tenant-config/tenant-config.component';
import {CreateTenantComponent} from './tenant/create-tenant/create-tenant.component';
import {SignupComponent} from "./signup/signup.component";
import {AddProjectUserComponent} from './project/add-project-user/add-project-user.component';
import {MatMenuModule} from "@angular/material/menu";
import {AddRoomUserComponent} from "./project/rooms/add-room-user/add-room-user.component";
import {WorkComponent} from "./project/work/work.component";
import {PreviewComponent} from './project/job/preview/preview.component';
import {TenantNavComponent} from './tenant/tenant-nav/tenant-nav.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AddTenantUserComponent} from './tenant/add-tenant-user/add-tenant-user.component';
import {WINDOW_PROVIDERS} from "./window.providers";
import {TruncatePipe} from "./truncate.pipe";
import {TenantUsersComponent} from './tenant/tenant-users/tenant-users.component';
import {ProjectUsersComponent} from './project/project-users/project-users.component';
import {JobsComponent} from "./project/job/jobs/jobs.component";
import { ColorPickerModule } from 'ngx-color-picker';
import {ImageCropperModule} from "ngx-image-cropper";
import { BasicConfigComponent } from './tenant/tenant-config/basic-config/basic-config.component';
import { StatusConfigComponent } from './tenant/tenant-config/status-config/status-config.component';
import { TypeConfigComponent } from './tenant/tenant-config/type-config/type-config.component';
import { PriorityConfigComponent } from './tenant/tenant-config/priority-config/priority-config.component';
import { BasicProjectConfigComponent } from './project/config/basic-project-config/basic-project-config.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverviewComponent,
    TenantDashboardComponent,
    ProjectDashboardComponent,
    ListsComponent,
    EventsComponent,
    RoomsComponent,
    JobComponent,
    ChatComponent,
    NewJobComponent,
    NewListComponent,
    NewEventComponent,
    NewProjectComponent,
    UserAvatarComponent,
    ProjectNavComponent,
    NewRoomComponent,
    ConfigComponent,
    TenantConfigComponent,
    CreateTenantComponent,
    SignupComponent,
    AddProjectUserComponent,
    AddRoomUserComponent,
    WorkComponent,
    PreviewComponent,
    TenantNavComponent,
    AddTenantUserComponent,
    TruncatePipe,
    TenantUsersComponent,
    ProjectUsersComponent,
    JobsComponent,
    BasicConfigComponent,
    StatusConfigComponent,
    TypeConfigComponent,
    PriorityConfigComponent,
    BasicProjectConfigComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent, pathMatch: 'full'},
      {path: 'dashboard', component: TenantDashboardComponent, canActivate: [AuthGuard]},
      {path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},
      {path: 'project/:id', component: ProjectDashboardComponent, canActivate: [AuthGuard]},
      {path: 'project/:id/events', component: EventsComponent, canActivate: [AuthGuard]},
      {path: 'project/:id/lists', component: ListsComponent, canActivate: [AuthGuard]},
      {path: 'project/:id/chat', component: RoomsComponent, canActivate: [AuthGuard]},
      {path: 'project/:id/jobs', component: JobsComponent, canActivate: [AuthGuard]},
      {path: 'project/:id/work', component: WorkComponent, canActivate: [AuthGuard]},
      {path: 'project/:id/users', component: ProjectUsersComponent, canActivate: [AuthGuard]},
      {path: 'project/:id/config', component: ConfigComponent, canActivate: [AuthGuard]},
      {path: 'config', component: TenantConfigComponent, canActivate: [AuthGuard]},
      {path: 'users', component: TenantUsersComponent, canActivate: [AuthGuard]}
    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSnackBarModule,
    ColorPickerModule,
    ImageCropperModule
  ],
  entryComponents: [NewJobComponent, NewProjectComponent, NewListComponent, NewRoomComponent, CreateTenantComponent, SignupComponent, AddProjectUserComponent, AddRoomUserComponent, AddTenantUserComponent],
  providers: [WINDOW_PROVIDERS, OnlineUserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// {provide: Window, useValue: window},
