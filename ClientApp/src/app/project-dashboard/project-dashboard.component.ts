import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../Services/project.service";
import {Project} from "../Models/Project";
import {AuthService} from "../Services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {NewJobComponent} from "../project/job/new-job/new-job.component";
import {NewListComponent} from "../project/lists/new-list/new-list.component";
import {User} from "../Models/User";
import {TenantService} from "../Services/tenant.service";
import {AddProjectUserComponent} from "../project/add-project-user/add-project-user.component";

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit
{

  private projectId: string = null;

  constructor (
    private route: ActivatedRoute,
    private projectService: ProjectService,
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    private tenantService: TenantService)
  {
  }

  ngOnInit ()
  {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectService.GetProject(this.projectId).subscribe(project =>
    {
      console.log(project);
    })
  }

  GetProjectFromStore (): Project
  {
    return this.projectService.GetProjectById(this.projectId);
  }

  NewList ()
  {
    const dialogRef = this.dialog.open(NewListComponent);
  }

  GetProjectColleagues (): User[]
  {
    return this.tenantService.Tenant.employments.filter(x => this.projectService.GetProjectById(this.projectId).employments.find(y => y.userId == x.id));
  }

  AddUser ()
  {
    const dialogRef = this.dialog.open(AddProjectUserComponent);
  }
}
