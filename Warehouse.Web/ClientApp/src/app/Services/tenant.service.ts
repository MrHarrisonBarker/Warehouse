import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Tenant, CreateTenant, TenantViewModel} from "../Models/Tenant";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Job} from "../Models/Job";
import {WINDOW} from "../window.providers";
import {UserService} from "./user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JobStatus, NewStatus} from "../Models/JobStatus";
import {JobPriority, NewPriority} from "../Models/JobPriority";
import {JobType, NewType} from "../Models/JobType";

export interface ITenantService
{
  GetHostName(): string;
  GetTenantAsync(): Observable<TenantViewModel>;
  CreateTenantAsync(createTenant: CreateTenant): Observable<Tenant>;
  UpdateTenantAsync(tenant: Tenant): Observable<boolean>;

  GetStatus(id:string): JobStatus;

  GetJobStatus(job:Job): JobStatus;
  NewStatusAsync(order:number,name: string, colour: string, finished: boolean): Observable<JobStatus>;
  UpdateJobStatusAsync(status: JobStatus);
  DeleteStatusAsync(status:JobStatus): Observable<boolean>;

  GetJobType(job:Job): JobType;
  NewTypeAsync(order: number,name: string, colour: string): Observable<JobType>;
  GetJobPriority(job:Job): JobPriority;
  NewPriorityAsync(order: number, name: string, colour: string): Observable<JobPriority>;

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

  favIcon: HTMLLinkElement = document.querySelector('#appIcon');

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

      this.favIcon.href = tenant.avatar;

      return this.Tenant;
    }));
  }

  public NewStatusAsync (order: number,name: string, colour: string, finished: boolean): Observable<JobStatus>
  {
    let newStatus: NewStatus = {
      name: name,
      order: order,
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

  public NewPriorityAsync (order:number,name: string, colour: string): Observable<JobPriority>
  {
    let newPriority: NewPriority = {
      name: name,
      order: order,
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

  public NewTypeAsync (order: number, name: string, colour: string): Observable<JobType>
  {
    let newType: NewType = {
      name: name,
      order: order,
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

  public UpdateJobStatusAsync(status: JobStatus): Observable<boolean>
  {
    return this.http.put<boolean>(this.BaseUrl + 'api/jobextras/status', status).pipe(map(updated => {
      if (updated) {
        this.Tenant.jobStatuses[this.Tenant.jobStatuses.findIndex(x => x.id == status.id)] = status;
        this._snackBar.open(`Updated ${status.name} for ${this.Tenant.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to Updated ${status.name} for ${this.Tenant.name}`,'close',{duration:1000});
      }
      return updated;
    }));
  }

  public DeleteStatusAsync(status: JobStatus): Observable<boolean>
  {
    return this.http.delete<boolean>(this.BaseUrl + 'api/jobextras/status', {params: new HttpParams().set('id',status.id)}).pipe(map(deleted => {
      if (deleted) {
        this.Tenant.jobStatuses = this.Tenant.jobStatuses.filter(x => x.id != status.id);
        this._snackBar.open(`Deleted ${status.name} from ${this.Tenant.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to delete ${status.name} from ${this.Tenant.name}`,'close',{duration:1000});
      }
      return deleted;
    }));
  }

  public UpdateJobTypeAsync(type: JobType): Observable<boolean>
  {
    return this.http.put<boolean>(this.BaseUrl + 'api/jobextras/type', type).pipe(map(updated => {
      if (updated) {
        this.Tenant.jobTypes[this.Tenant.jobTypes.findIndex(x => x.id == type.id)] = type;
        this._snackBar.open(`Updated ${type.name} for ${this.Tenant.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to Updated ${type.name} for ${this.Tenant.name}`,'close',{duration:1000});
      }
      return updated;
    }));
  }

  public DeleteTypeAsync(type: JobType): Observable<boolean>
  {
    return this.http.delete<boolean>(this.BaseUrl + 'api/jobextras/type', {params: new HttpParams().set('id',type.id)}).pipe(map(deleted => {
      if (deleted) {
        this.Tenant.jobTypes = this.Tenant.jobTypes.filter(x => x.id != type.id);
        this._snackBar.open(`Deleted ${type.name} from ${this.Tenant.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to delete ${type.name} from ${this.Tenant.name}`,'close',{duration:1000});
      }
      return deleted;
    }));
  }

  public UpdateJobPriorityAsync(priority: JobPriority): Observable<boolean>
  {
    return this.http.put<boolean>(this.BaseUrl + 'api/jobextras/priority', priority).pipe(map(updated => {
      if (updated) {
        this.Tenant.jobPriorities[this.Tenant.jobPriorities.findIndex(x => x.id == priority.id)] = priority;
        this._snackBar.open(`Updated ${priority.name} for ${this.Tenant.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to Updated ${priority.name} for ${this.Tenant.name}`,'close',{duration:1000});
      }
      return updated;
    }));
  }

  public DeletePriorityAsync(priority: JobPriority): Observable<boolean>
  {
    return this.http.delete<boolean>(this.BaseUrl + 'api/jobextras/priority', {params: new HttpParams().set('id',priority.id )}).pipe(map(deleted => {
      if (deleted) {
        this.Tenant.jobPriorities = this.Tenant.jobPriorities.filter(x => x.id != priority.id);
        this._snackBar.open(`Deleted ${priority.name} from ${this.Tenant.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to delete ${priority.name} from ${this.Tenant.name}`,'close',{duration:1000});
      }
      return deleted;
    }));
  }

  public UpdateTenantAsync(tenant: Tenant): Observable<boolean>
  {
    return this.http.put<boolean>(this.BaseUrl + 'api/tenant', this.Tenant).pipe(map(updated => {
      if (updated) {
        this.Tenant = tenant;
        this._snackBar.open(`Updated ${tenant.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to Updated ${tenant.name}`,'close',{duration:1000});
      }
      return updated;
    }));
  }
}
