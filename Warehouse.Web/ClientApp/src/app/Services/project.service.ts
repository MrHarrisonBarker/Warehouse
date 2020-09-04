import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  AddProjectUser,
  NewProject,
  Project,
  projectEmployment,
  ProjectViewModel,
  RemoveProjectUser
} from "../Models/Project";
import {map} from "rxjs/operators";
import {TenantService} from "./tenant.service";
import {AuthService} from "./auth.service";
import {JobService} from "./job.service";
import {UserService} from "./user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ListService} from "./list.service";

export interface IProjectService {
  GetProjectsAsync(): Observable<Project[]>;
  GetProjectAsync(id: string): Observable<ProjectViewModel>;

  GetProjects(): ProjectViewModel[];
  GetProject(id: string): ProjectViewModel;
  GetCurrentProject(): ProjectViewModel;

  AddUserAsync(email: string): Observable<boolean>;
  RemoveUserAsync(email: string): Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements IProjectService {
  private readonly BaseUrl: string;
  public Projects: ProjectViewModel[] = [];
  public currentProjectId: string;


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,private _snackBar: MatSnackBar, private tenantService: TenantService, private authService: AuthService, private jobService: JobService, private userService: UserService,private listService: ListService) {
    this.BaseUrl = baseUrl;
  }

  public GetProjectsAsync(): Observable<Project[]> {
    return this.http.get<Project[]>(this.BaseUrl + 'api/project/all', {params: new HttpParams().set('userId', this.authService.GetUser().id)}).pipe(map(projects => {
      projects.forEach(project => {

        let index = this.Projects.findIndex(x => x.id == project.id);

        this.jobService.MergeJobs(project.jobs);
        this.listService.MergeLists(project.lists);

        let newProject = {
          employments: project.employments.map(employment => employment.userId),
          accent: project.accent,
          avatar: project.avatar,
          created: project.created,
          description: project.description,
          events: project.events,
          id: project.id,
          jobs: project.jobs.map(job => job.id),
          lists: project.lists.map(list => list.id),
          name: project.name,
          repo: project.repo,
          rooms: project.rooms
        };

        if (index == -1) {
          this.Projects.push(newProject);
        } else {
          this.Projects[index] = newProject;
        }
      })

      return projects;
    }));
  }

  public GetProjectAsync(id: string): Observable<ProjectViewModel> {
    return this.http.get<Project>(this.BaseUrl + 'api/project', {
      params: new HttpParams().set('id', id).set('userId', this.authService.GetUser().id)
    }).pipe(map(project => {

      this.listService.MergeLists(project.lists);
      this.jobService.MergeJobs(project.jobs);

      let index = this.Projects.findIndex(x => x.id == project.id);
      let newProject = {
        employments: project.employments != null ? project.employments.map(employment => employment.userId) : [],
        accent: project.accent,
        avatar: project.avatar,
        created: project.created,
        description: project.description,
        events: project.events,
        id: project.id,
        jobs: project.jobs != null ? project.jobs.map(job => job.id) : [],
        lists: project.lists != null ? project.lists.map(list => list.id): [],
        name: project.name,
        repo: project.repo,
        rooms: project.rooms
      };

      if (index == -1) {
        this.Projects.push(newProject);
      } else {
        this.Projects[index] = newProject;
      }

      this.currentProjectId = project.id;
      return newProject;
    }));
  }

  public CreateProjectAsync(newProject: NewProject): Observable<Project> {
    return this.http.post<Project>(this.BaseUrl + 'api/project', newProject).pipe(map(project => {
      if (project) {
        this.Projects.push({
          employments: project.employments != null ? project.employments.map(employment => employment.userId) : [],
          accent: project.accent,
          avatar: project.avatar,
          created: project.created,
          description: project.description,
          events: project.events,
          id: project.id,
          jobs: project.jobs != null ? project.jobs.map(job => job.id) : [],
          lists: project.lists != null ? project.lists.map(list => list.id): [] ,
          name: project.name,
          repo: project.repo,
          rooms: project.rooms
        });
        this._snackBar.open(`Created ${newProject.project.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to create ${newProject.project.name}`,'close',{duration:1000});
      }
      return project;
    }));
  }

  public GetProjects(): ProjectViewModel[] {
    return this.Projects;
  }

  public GetProject(id: string): ProjectViewModel {
    return this.Projects.find(x => x.id == id);
  }

  public AddUserAsync(email: string): Observable<any> {
    let addUser: AddProjectUser = {
      projectId: this.currentProjectId,
      userId: this.userService.TenantEmployments.find(x => x.email == email).id
    };

    return this.http.post<boolean>(this.BaseUrl + 'api/project/adduser', addUser).pipe(map(success => {
      if (success) {
        this.GetCurrentProject().employments.push(this.userService.TenantEmployments.find(x => x.email == email).id);
        this._snackBar.open(`Added ${email} to ${this.GetCurrentProject().name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to add ${email} to ${this.GetCurrentProject().name}`,'close',{duration:1000});
      }
      return success;
    }));
  }

  public RemoveUserAsync(email: string): Observable<boolean> {
    let removeUser: RemoveProjectUser = {
      projectId: this.currentProjectId,
      userId: this.userService.TenantEmployments.find(x => x.email == email).id
    };

    return this.http.post<boolean>(this.BaseUrl + 'api/project/removeuser', removeUser).pipe(map(success => {
      if (success) {
        this.GetCurrentProject().employments = this.GetCurrentProject().employments.filter(x => x != removeUser.userId);
        this.userService.TenantEmployments = this.userService.TenantEmployments.filter(x => x.id != removeUser.userId);
        this._snackBar.open(`Removed ${email} from ${this.GetCurrentProject().name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to remove ${email} from ${this.GetCurrentProject().name}`,'close',{duration:1000});
      }
      return success;
    }));
  }

  public GetCurrentProject(): ProjectViewModel {
    return this.GetProject(this.currentProjectId);
  }
}
