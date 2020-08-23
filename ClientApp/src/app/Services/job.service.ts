import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Job, NewJob} from "../Models/Job";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobService
{
  private readonly BaseUrl: string;

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.BaseUrl = baseUrl;
  }

  public CreateJob (newJob: NewJob): Observable<Job>
  {
    return this.http.post<Job>(this.BaseUrl + 'api/job', newJob)
  }
}
