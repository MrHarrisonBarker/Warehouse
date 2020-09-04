import {Component, OnInit} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {ProjectService} from "../Services/project.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NewProjectComponent} from "../project/new-project/new-project.component";
import {TenantService} from "../Services/tenant.service";
import {AddTenantUserComponent} from "../tenant/add-tenant-user/add-tenant-user.component";
import {forkJoin} from "rxjs";
import {UserService} from "../Services/user.service";
import {JobService} from "../Services/job.service";

@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrls: ['./tenant-dashboard.component.css']
})
export class TenantDashboardComponent implements OnInit
{
  public Loading: boolean = true;

  constructor (public authService: AuthService, public projectService: ProjectService, private router: Router, public dialog: MatDialog, public tenantService: TenantService,public userService:UserService,private jobService: JobService)
  {
  }

  ngOnInit ()
  {
    forkJoin([this.projectService.GetProjectsAsync(),this.userService.GetColleaguesAsync()]).subscribe(data => {
      if (data) {
        console.log(data);
        console.log(this.projectService.Projects);
        console.log(this.userService.TenantEmployments);
        console.log(this.jobService.Jobs);
        this.Loading = false;
      }
    });
  }

  public GoToProject (id: string)
  {
    this.router.navigateByUrl(`/project/${id}`);
  }

  public NewProject (): void
  {
    this.dialog.open(NewProjectComponent);
  }

  public GetUserAvatar (userId: string): string
  {
    return this.userService.TenantEmployments.find(x => x.id == userId).avatar;
  }

  public AddUser (): void
  {
    this.dialog.open(AddTenantUserComponent, {width:'50vw'});
  }
}
