import {Component, OnInit} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {ProjectService} from "../Services/project.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NewProjectComponent} from "../project/new-project/new-project.component";
import {TenantService} from "../Services/tenant.service";
import {AddTenantUserComponent} from "../tenant/add-tenant-user/add-tenant-user.component";

@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrls: ['./tenant-dashboard.component.css']
})
export class TenantDashboardComponent implements OnInit
{

  constructor (public authService: AuthService, public projectService: ProjectService, private router: Router, public dialog: MatDialog, public tenantService: TenantService)
  {
  }

  ngOnInit ()
  {
    this.projectService.GetProjects().subscribe(projects =>
    {
      console.log(projects);
    });

    this.authService.GetColleagues().subscribe(colleagues =>
    {
      console.log(colleagues);
    });
  }

  GoToProject (id: string)
  {
    this.router.navigateByUrl(`/project/${id}`);
  }

  NewProject ()
  {
    const dialogRef = this.dialog.open(NewProjectComponent);
  }

  GetUserAvatar (userId: string): string
  {
    return this.tenantService.Tenant.employments.find(x => x.id == userId).avatar;
  }

  AddUser ()
  {
    const dialogRef = this.dialog.open(AddTenantUserComponent, {width:'50vw'});
  }
}
