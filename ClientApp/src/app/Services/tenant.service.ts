import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Tenant, CreateTenant} from "../Models/Tenant";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Job, JobPriority, JobStatus, JobType, NewPriority, NewStatus, NewType} from "../Models/Job";
import {WINDOW} from "../window.providers";

@Injectable({
  providedIn: 'root'
})
export class TenantService
{
  private BaseUrl: string;
  public Tenant: Tenant;

  // @Inject(Window) private _window: Window,

  constructor (@Inject(WINDOW) private window: Window, private http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.BaseUrl = baseUrl;
  }

  public getHostname (): string
  {
    return this.window.location.hostname;
    // return '';
  }

  public GetTenant (): Observable<Tenant>
  {
    return this.http.get<Tenant>(this.BaseUrl + 'api/tenant').pipe(map(tenant => this.Tenant = tenant));
  }

  public NewStatus (name: string, colour: string): Observable<JobStatus>
  {
    let newStatus: NewStatus = {
      name: name,
      colour: colour
    };
    return this.http.post<JobStatus>(this.BaseUrl + 'api/jobextras/status', newStatus).pipe(map(status =>
    {
      this.Tenant.jobStatuses.push(status);
      return status
    }));
  }

  NewPriority (name: string, colour: string): Observable<JobPriority>
  {
    let newPriority: NewPriority = {
      name: name,
      colour: colour
    };
    return this.http.post<JobPriority>(this.BaseUrl + 'api/jobextras/priority', newPriority).pipe(map(priority =>
    {
      this.Tenant.jobPriorities.push(priority);
      return priority
    }));
  }

  NewType (name: string, colour: string): Observable<JobType>
  {
    let newType: NewType = {
      name: name,
      colour: colour
    };
    return this.http.post<JobType>(this.BaseUrl + 'api/jobextras/type', newType).pipe(map(type =>
    {
      this.Tenant.jobTypes.push(type);
      return type
    }));
  }

  CreateTenant (createTenant: CreateTenant): Observable<Tenant>
  {
    return this.http.post<Tenant>(this.BaseUrl + 'api/tenant', createTenant).pipe(map(tenant =>
    {
      console.log(tenant);
      return tenant;
    }));
  }

  AddUser (email: string): Observable<boolean>
  {
    return this.http.post<boolean>(this.BaseUrl + 'api/tenant/adduser', "", {params: new HttpParams().set('email',email)});
  }

  public GetStatus (job: Job): JobStatus
  {
    return this.Tenant.jobStatuses.find(x => x.id == job.jobStatus.id);
  }

  public GetType (job: Job): JobType
  {
    return this.Tenant.jobTypes.find(x => x.id == job.jobType.id);
  }

  public GetPriority (job: Job): JobPriority
  {
    return this.Tenant.jobPriorities.find(x => x.id == job.jobPriority.id);
  }
}
