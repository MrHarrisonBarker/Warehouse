import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {JobComponent} from './project/job/job.component';
import {NewJobComponent} from './project/job/new-job/new-job.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NewProjectComponent} from './project/new-project/new-project.component';
import {OverviewComponent} from "./overview/overview.component";
import {OnlineUserService} from "./Services/online-user.service";
import {TenantConfigComponent} from './tenant/tenant-config/tenant-config.component';
import {CreateTenantComponent} from './tenant/create-tenant/create-tenant.component';
import {SignupComponent} from "./signup/signup.component";
import {MatMenuModule} from "@angular/material/menu";
import {TenantNavComponent} from './tenant/tenant-nav/tenant-nav.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AddTenantUserComponent} from './tenant/add-tenant-user/add-tenant-user.component';
import {WINDOW_PROVIDERS} from "./window.providers";
import {TenantUsersComponent} from './tenant/tenant-users/tenant-users.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {ImageCropperModule} from "ngx-image-cropper";
import {BasicConfigComponent} from './tenant/tenant-config/basic-config/basic-config.component';
import {StatusConfigComponent} from './tenant/tenant-config/status-config/status-config.component';
import {TypeConfigComponent} from './tenant/tenant-config/type-config/type-config.component';
import {PriorityConfigComponent} from './tenant/tenant-config/priority-config/priority-config.component';
import {SharedModule} from "./shared.module";
import {CommonModule} from "@angular/common";
import {AuthInterceptor} from "./auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverviewComponent,
    TenantDashboardComponent,
    NewProjectComponent,
    TenantConfigComponent,
    CreateTenantComponent,
    SignupComponent,
    TenantNavComponent,
    AddTenantUserComponent,
    TenantUsersComponent,
    BasicConfigComponent,
    StatusConfigComponent,
    TypeConfigComponent,
    PriorityConfigComponent,
    NewJobComponent,
    JobComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,

    BrowserAnimationsModule,


    SharedModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent, pathMatch: 'full'},
      {
        path: 'project',
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
        canActivate: [AuthGuard]
      },
      {path: 'dashboard', component: TenantDashboardComponent, canActivate: [AuthGuard]},
      {path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},
      {path: 'config', component: TenantConfigComponent, canActivate: [AuthGuard]},
      {path: 'users', component: TenantUsersComponent, canActivate: [AuthGuard]}
    ])
  ],
  entryComponents: [NewJobComponent, NewProjectComponent, CreateTenantComponent, SignupComponent, AddTenantUserComponent, JobComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    WINDOW_PROVIDERS,
    OnlineUserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// {provide: Window, useValue: window},
