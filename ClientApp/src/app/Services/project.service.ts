import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddProjectUser, NewProject, Project, projectEmployment} from "../Models/Project";
import {map} from "rxjs/operators";
import {TenantService} from "./tenant.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService
{
  private readonly BaseUrl: string;
  private projects: Project[];
  public currentProject: Project;

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private tenantService: TenantService, private authService: AuthService)
  {
    this.BaseUrl = baseUrl;
  }

  GetProjects (): Observable<Project[]>
  {
    return this.http.get<Project[]>(this.BaseUrl + 'api/project/all', {params: new HttpParams().set('userId', this.authService.GetUser().id)}).pipe(map(projects => this.projects = projects));
  }

  GetProject (id: string): Observable<Project>
  {
    return this.http.get<Project>(this.BaseUrl + 'api/project', {
      params: new HttpParams().set('id', id).set('userId', this.authService.GetUser().id)
    }).pipe(map(project =>
    {
      this.projects[this.projects.findIndex(x => x.id == project.id)] = project;
      this.currentProject = project;
      return project;
    }));
  }

  CreateProject (newProject: NewProject): Observable<Project>
  {
    return this.http.post<Project>(this.BaseUrl + 'api/project', newProject).pipe(map(project =>
    {
      this.projects.push(project);
      return project;
    }));
  }

  GetStoredProjects (): Project[]
  {
    return this.projects;
  }

  GetProjectById (id: string): Project
  {
    return this.projects.find(x => x.id == id);
  }

  AddUser (email: string): Observable<any>
  {
    let addUser: AddProjectUser = {
      projectId: this.currentProject.id,
      userId: this.tenantService.Tenant.employments.find(x => x.email == email).id
    };

    return this.http.post<any>(this.BaseUrl + 'api/project/adduser', addUser).pipe(map(success =>
    {
      if (success)
      {

        let employment: projectEmployment = {
          projectId: this.currentProject.id,
          userId: this.tenantService.Tenant.employments.find(x => x.email == email).id
        };

        this.currentProject.employments.push(employment);
      }
    }));
  }
}
