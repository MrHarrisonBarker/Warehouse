import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AddJobUser, Job, NewJob} from "../Models/Job";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface IJobService
{
  GetJobs(): Job[]
  CreateJobAsync(newJob: NewJob): Observable<Job>;

  AddUserAsync(userId: string, jobId:string): Observable<boolean>
  RemoveUserAsync(userid: string, jobId: string): Observable<boolean>

  UpdateStatusAsync(updatedJob: Job): Observable<boolean>;
  UpdatePriorityAsync(updatedJob: Job): Observable<boolean>;
  UpdateTypeAsync(updatedJob: Job): Observable<boolean>;

  UpdateJobAsync(updatedJob: Job): Observable<boolean>

  MergeJobs(job: Job[]): void
}

@Injectable({
  providedIn: 'root'
})
export class JobService implements IJobService
{
  private readonly BaseUrl: string;
  public Jobs: Job[];

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string,private _snackBar: MatSnackBar)
  {
    this.BaseUrl = baseUrl;
  }

  public CreateJobAsync (newJob: NewJob): Observable<Job>
  {
    return this.http.post<Job>(this.BaseUrl + 'api/job', newJob).pipe(map(job => {
      if (job) {
        this.Jobs.push(newJob.job);
        this._snackBar.open(`Created job "${newJob.job.title}"`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to create job "${newJob.job.title}"`,'close',{duration:1000});
      }
      return job;
    }));
  }

  public UpdateStatusAsync(updatedJob: Job) : Observable<boolean>
  {
    return this.http.put<boolean>(this.BaseUrl + 'api/job/UpdateStatus',updatedJob).pipe(map(updated => {
      if (updated) {
        this.Jobs[this.Jobs.findIndex(x => x.id == updatedJob.id)].jobStatus = updatedJob.jobStatus;
        this._snackBar.open(`Updated jobs status to "${updatedJob.jobStatus.name}"`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to updated jobs status to "${updatedJob.jobStatus.name}"`,'close',{duration:1000});
      }
      return updated;
    }));
  }

  public UpdateTypeAsync(updatedJob: Job) : Observable<boolean>
  {
    return this.http.put<boolean>(this.BaseUrl + 'api/job/UpdateType',updatedJob).pipe(map(updated => {
      if (updated) {
        this.Jobs[this.Jobs.findIndex(x => x.id == updatedJob.id)].jobType = updatedJob.jobType;
        this._snackBar.open(`Updated jobs type to "${updatedJob.jobType.name}"`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to updated jobs type to "${updatedJob.jobType.name}"`,'close',{duration:1000});
      }
      return updated;
    }));
  }

  public UpdatePriorityAsync(updatedJob: Job) : Observable<boolean>
  {
    return this.http.put<boolean>(this.BaseUrl + 'api/job/UpdatePriority',updatedJob).pipe(map(updated => {
      if (updated) {
        this.Jobs[this.Jobs.findIndex(x => x.id == updatedJob.id)].jobPriority = updatedJob.jobPriority;
        this._snackBar.open(`Updated jobs priority to "${updatedJob.jobPriority.name}"`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to updated jobs priority to "${updatedJob.jobPriority.name}"`,'close',{duration:1000});
      }
      return updated;
    }));
  }

  public MergeJobs(jobs: Job[]): void
  {
    if (this.Jobs == undefined) {
      this.Jobs = jobs;
      return;
    }
    jobs.forEach(job => {
      let index = this.Jobs.findIndex(x => x.id == job.id);
      if (index == -1) {
        this.Jobs.push(job)
      } else {
        this.Jobs[index] = job;
      }
    });
  }

  GetJobs(): Job[] {
    return this.Jobs;
  }

  public UpdateJobAsync(updatedJob: Job): Observable<boolean>
  {
    if (updatedJob.deadline == '') {
      updatedJob.deadline = new Date('');
    }
    return this.http.put<boolean>(this.BaseUrl + 'api/job',updatedJob).pipe(map(updated => {
      if (updated) {
        // updatedJob.deadline = updatedJob.deadline == '1970-01-01T00:00:00' ? '' : updatedJob.deadline;
        // this.Jobs[this.Jobs.findIndex(x => x.id == updatedJob.id)] = updatedJob;
        this._snackBar.open(`Updated job"`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to updated job`,'close',{duration:1000});
      }
      return updated;
    }));
  }

  public AddUserAsync(userId: string, jobId:string): Observable<boolean>
  {

    let addUser: AddJobUser = {
      jobId: jobId,
      userId: userId
    }

    return this.http.post<boolean>(this.BaseUrl + 'api/job/adduser', addUser).pipe(map(added => {
      if (added) {
        this.Jobs[this.Jobs.findIndex(x => x.id == jobId)].employments.push({userId:userId,jobId:jobId});
        this._snackBar.open(`Added user to job"`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to add user to job`,'close',{duration:1000});
      }
      return added;
    }));
  }

  public RemoveUserAsync(userId: string, jobId: string): Observable<boolean>
  {
    let addUser: AddJobUser = {
      jobId: jobId,
      userId: userId
    }

    return this.http.post<boolean>(this.BaseUrl + 'api/job/removeuser', addUser).pipe(map(removed => {
      if (removed) {
        let index = this.Jobs.findIndex(x => x.id == jobId);
        this.Jobs[index].employments = this.Jobs[index].employments.filter(x => x.userId != userId);
        this._snackBar.open(`Removed user from job"`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to remove user from job`,'close',{duration:1000});
      }
      return removed;
    }));
  }
}
