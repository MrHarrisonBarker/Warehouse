import {Inject, Injectable} from '@angular/core';
import {User} from "../Models/User";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

export interface IUserService {
  GetColleaguesAsync(): Observable<User[]>;
  MergeColleagues(colleagues: User[]): void
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService
{
  private readonly BaseUrl: string;
  public TenantEmployments: User[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.BaseUrl = baseUrl;
  }

  public GetColleaguesAsync (): Observable<User[]>
  {
    return this.http.get<User[]>(this.BaseUrl + 'api/user/all').pipe(map(colleagues =>
    {
      if (colleagues) {
        this.MergeColleagues(colleagues);
        return colleagues;
      }
    }));
  }

  public MergeColleagues(colleagues: User[]) : void
  {
    if (this.TenantEmployments == undefined) {
      this.TenantEmployments = colleagues;
      return;
    }
    colleagues.forEach(colleague => {
        let index = this.TenantEmployments.findIndex(x => x.id == colleague.id);
        if (index == -1) {
          this.TenantEmployments.push(colleague)
        } else {
          this.TenantEmployments[index] = colleague;
        }
    });
  }
}
