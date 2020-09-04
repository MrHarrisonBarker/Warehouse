import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Tenant, CreateTenant, TenantViewModel} from "../Models/Tenant";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Job, JobPriority, JobStatus, JobType, NewPriority, NewStatus, NewType} from "../Models/Job";
import {WINDOW} from "../window.providers";
import {UserService} from "./user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface ITenantService
{
  GetHostName(): string;
  GetTenantAsync(): Observable<TenantViewModel>;
  CreateTenantAsync(createTenant: CreateTenant): Observable<Tenant>;

  GetStatus(id:string): JobStatus;

  GetJobStatus(job:Job): JobStatus;
  NewStatusAsync(name: string, colour: string, finished: boolean): Observable<JobStatus>;
  GetJobType(job:Job): JobType;
  NewTypeAsync(name: string, colour: string): Observable<JobType>;
  GetJobPriority(job:Job): JobPriority;
  NewPriorityAsync(name: string, colour:string): Observable<JobPriority>;

  AddUserAsync(email: string): Observable<boolean>;
  RemoveUserAsync(email:string): Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class TenantService implements ITenantService
{
  private readonly BaseUrl: string;
  public Tenant: TenantViewModel;

  constructor (@Inject(WINDOW) private window: Window,private _snackBar: MatSnackBar, private http: HttpClient, @Inject('BASE_URL') baseUrl: string,private userService:UserService)
  {
    this.BaseUrl = baseUrl;
  }

  public GetHostName (): string
  {
    return this.window.location.hostname;
  }

  public GetTenantAsync (): Observable<TenantViewModel>
  {
    return this.http.get<Tenant>(this.BaseUrl + 'api/tenant').pipe(map(tenant => {
      this.userService.TenantEmployments = tenant.employments;
      this.Tenant = {
        accent: tenant.accent,
        avatar: tenant.avatar,
        description: tenant.description,
        id: tenant.id,
        jobPriorities: tenant.jobPriorities,
        jobStatuses: tenant.jobStatuses,
        jobTypes: tenant.jobTypes,
        name: tenant.name
      }
      return this.Tenant;
    }));
  }

  public NewStatusAsync (name: string, colour: string, finished: boolean): Observable<JobStatus>
  {
    let newStatus: NewStatus = {
      name: name,
      colour: colour,
      finished: finished
    };
    return this.http.post<JobStatus>(this.BaseUrl + 'api/jobextras/status', newStatus).pipe(map(status =>
    {
      if (status) {
        this.Tenant.jobStatuses.push(status);
        this._snackBar.open(`Created ${status.name}`, 'close', {duration: 1000});
      } else {
        this._snackBar.open(`Failed to create ${status.name}`,'close',{duration:1000});
      }
      return status
    }));
  }

  public NewPriorityAsync (name: string, colour: string): Observable<JobPriority>
  {
    let newPriority: NewPriority = {
      name: name,
      colour: colour
    };
    return this.http.post<JobPriority>(this.BaseUrl + 'api/jobextras/priority', newPriority).pipe(map(priority =>
    {
      if (priority) {
        this.Tenant.jobPriorities.push(priority);
        this._snackBar.open(`Created ${priority.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to create ${priority.name}`,'close',{duration:1000});
      }

      return priority
    }));
  }

  public NewTypeAsync (name: string, colour: string): Observable<JobType>
  {
    let newType: NewType = {
      name: name,
      colour: colour
    };
    return this.http.post<JobType>(this.BaseUrl + 'api/jobextras/type', newType).pipe(map(type =>
    {
      if (type) {
        this.Tenant.jobTypes.push(type);
        this._snackBar.open(`Created ${type.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to create ${type.name}`,'close',{duration:1000});
      }

      return type
    }));
  }

  public CreateTenantAsync (createTenant: CreateTenant): Observable<Tenant>
  {
    return this.http.post<Tenant>(this.BaseUrl + 'api/tenant', createTenant).pipe(map(tenant =>
    {
      if (tenant) {
        console.log(tenant);
        this._snackBar.open(`Created ${createTenant.tenant.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to create ${createTenant.tenant.name}`,'close',{duration:1000});
      }
      return tenant;
    }));
  }

  public AddUserAsync (email: string): Observable<boolean>
  {
    return this.http.post<boolean>(this.BaseUrl + 'api/tenant/adduser', "", {params: new HttpParams().set('email',email)}).pipe(map(added => {
      if(added) {
        this._snackBar.open(`Added ${email} to ${this.Tenant.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to add ${email} to ${this.Tenant.name}`,'close',{duration:1000});
      }
      return added;
    }));
  }

  public GetStatus (id: string): JobStatus
  {
    return this.Tenant.jobStatuses.find(x => x.id == id);
  }

  public GetJobStatus (job: Job): JobStatus
  {
    return this.Tenant.jobStatuses.find(x => x.id == job.jobStatus.id);
  }

  public GetJobType (job: Job): JobType
  {
    return this.Tenant.jobTypes.find(x => x.id == job.jobType.id);
  }

  public GetJobPriority (job: Job): JobPriority
  {
    return this.Tenant.jobPriorities.find(x => x.id == job.jobPriority.id);
  }

  public RemoveUserAsync(email: string): Observable<boolean> {
    return undefined;
  }
}
