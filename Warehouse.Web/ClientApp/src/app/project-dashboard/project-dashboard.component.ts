import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../Services/project.service";
import {ProjectViewModel} from "../Models/Project";
import {AuthService} from "../Services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {NewListComponent} from "../project/lists/new-list/new-list.component";
import {User} from "../Models/User";
import {TenantService} from "../Services/tenant.service";
import {AddProjectUserComponent} from "../project/add-project-user/add-project-user.component";
import {UserService} from "../Services/user.service";
import {ListViewModel} from "../Models/List";
import {ListService} from "../Services/list.service";
import {Job} from "../Models/Job";
import {JobService} from "../Services/job.service";

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
    private tenantService: TenantService,
    private userService: UserService,
    private listService: ListService,
    private jobService: JobService)
  {
  }

  ngOnInit ()
  {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectService.GetProjectAsync(this.projectId).subscribe(project =>
    {
      console.log(project);
    });
  }

  GetProjectFromStore (): ProjectViewModel
  {
    return this.projectService.GetProject(this.projectId);
  }

  GetListsForProject(): ListViewModel[]
  {
    return this.listService.GetLists().filter(list => this.GetProjectFromStore().lists.includes(list.id));
  }

  GetJobsForProject(): Job[]
  {
    return this.jobService.GetJobs().filter(job => this.GetProjectFromStore().jobs.includes(job.id));
  }

  NewList ()
  {
    const dialogRef = this.dialog.open(NewListComponent);
  }

  GetProjectColleagues (): User[]
  {
    return this.userService.TenantEmployments.filter(user => this.GetProjectFromStore().employments.includes(user.id));
    // return this.tenazxntService.Tenant.employments.filter(x => this.projectService.GetProjectById(this.projectId).employments.find(y => y.userId == x.id));
  }

  AddUser ()
  {
    const dialogRef = this.dialog.open(AddProjectUserComponent);
  }
}
