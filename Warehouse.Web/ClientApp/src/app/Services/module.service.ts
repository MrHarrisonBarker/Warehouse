import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Module, ModuleViewModel} from "../Models/Module";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export interface IModuleService {
  GetModulesAsync(projectId: string): Observable<ModuleViewModel[]>
}

@Injectable({
  providedIn: 'root'
})
export class ModuleService implements IModuleService {
  private readonly BaseUrl: string;
  public Modules: ModuleViewModel[];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.BaseUrl = baseUrl;
  }

  public GetModulesAsync(projectId: string): Observable<ModuleViewModel[]> {
    return this.http.get<ModuleViewModel[]>(this.BaseUrl + 'api/module/all', {params: new HttpParams().set('projectId', projectId)}).pipe(map(modules => {
      this.Modules = modules;
      return modules;
    }));
  }
}
