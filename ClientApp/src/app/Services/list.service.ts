import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {List, CreateList} from "../Models/List";
import {AuthService} from "./auth.service";
import {ProjectService} from "./project.service";

@Injectable({
  providedIn: 'root'
})
export class ListService
{
  private BaseUrl: string;
  private lists: List[] = [];

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService, private projectService: ProjectService)
  {
    this.BaseUrl = baseUrl;
  }

  GetList (id: string): Observable<List>
  {
    return this.http.get<List>(this.BaseUrl + 'api/list', {
      params: new HttpParams().set('id', id)
    }).pipe(map(list =>
    {
      this.lists.push(list);
      return list;
    }));
  }

  CreateList (createList: CreateList): Observable<List>
  {
    return this.http.post<List>(this.BaseUrl + 'api/list', createList).pipe(map(list =>
    {
      // this.projects.push(project);
      return list;
    }));
  }

  GetListsFromStore (): List[]
  {
    return this.lists;
  }

  GetLists (): Observable<List[]>
  {
    return this.http.get<List[]>(this.BaseUrl + 'api/list/all', {
      params: new HttpParams().set('userId', this.authService.GetUser().id).set('projectId', this.projectService.currentProject.id)
    }).pipe(map(lists =>
    {
      this.lists = lists;
      return lists;
    }));
  }
}
