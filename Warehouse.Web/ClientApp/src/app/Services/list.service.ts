import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {List, CreateList, ListViewModel} from "../Models/List";
import {AuthService} from "./auth.service";
import {ProjectService} from "./project.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JobService} from "./job.service";

export interface IListService
{
  GetListAsync(id: string): Observable<ListViewModel>;
  GetListsAsync(projectId: string): Observable<ListViewModel[]>;

  GetLists(): ListViewModel[];
  GetList(id: string): ListViewModel;

  CreateListAsync(createList: CreateList): Observable<List>;

  MergeLists(lists: List[]): void
}

@Injectable({
  providedIn: 'root'
})
export class ListService implements IListService
{
  private BaseUrl: string;
  private Lists: ListViewModel[] = [];

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string,private _snackBar:MatSnackBar, private authService: AuthService, private jobService: JobService)
  {
    this.BaseUrl = baseUrl;
  }

  public GetListAsync (id: string): Observable<ListViewModel>
  {
    return this.http.get<List>(this.BaseUrl + 'api/list', {
      params: new HttpParams().set('id', id)
    }).pipe(map(list =>
    {

      this.jobService.MergeJobs(list.jobs);

      let newList = {
        created: list.created,
        deadline: list.deadline,
        description: list.description,
        employments: list.employments,
        id: list.id,
        name: list.name,
        project: list.project,
        jobs: list.jobs.map(job => job.id)
      }

      let listIndex = this.Lists.findIndex(x => x.id == list.id);

      if (listIndex == -1) {
        this.Lists.push(newList);
        return newList;
      }

      this.Lists[listIndex] = newList;
      return newList;
    }));
  }

  public CreateListAsync (createList: CreateList): Observable<List>
  {
    return this.http.post<List>(this.BaseUrl + 'api/list', createList).pipe(map(list =>
    {
      if (list) {
        this.Lists.push({
          created: list.created,
          deadline: list.deadline,
          description: list.description,
          employments: list.employments,
          id: list.id,
          name: list.name,
          project: list.project,
          jobs: list.jobs != null ? list.jobs.map(job => job.id) : []
        });
        this._snackBar.open(`Created ${list.name}`,'close',{duration:1000});
      } else {
        this._snackBar.open(`Failed to create ${list.name}`,'close',{duration:1000});
      }
      return list;
    }));
  }

  public GetLists(): ListViewModel[]
  {
    return this.Lists;
  }

  public GetListsAsync (projectId: string): Observable<ListViewModel[]>
  {
    return this.http.get<List[]>(this.BaseUrl + 'api/list/all', {
      params: new HttpParams().set('userId', this.authService.GetUser().id).set('projectId', projectId)
    }).pipe(map(lists =>
    {
      this.MergeLists(lists);
      return this.Lists;
    }));
  }

  public MergeLists(lists: List[]): void
  {
    lists.forEach(list => {

      let newList = {
        created: list.created,
        deadline: list.deadline,
        description: list.description,
        employments: list.employments,
        id: list.id,
        name: list.name,
        project: list.project,
        jobs: list.jobs != null ? list.jobs.map(job => job.id) : []
      }

      let index = this.Lists.findIndex(x => x.id == list.id);
      if (index == -1) {
        this.Lists.push(newList);
      } else {
        this.Lists[index] = newList;
      }
    });
  }

  GetList(id:string): ListViewModel {
    return this.Lists.find(x => x.id == id);
  }
}
