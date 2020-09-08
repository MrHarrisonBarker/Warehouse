import {Inject, Injectable} from '@angular/core';
import {Authenticate} from "../Models/Tenant";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {User} from "../Models/User";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TenantService} from "./tenant.service";
import {Router} from "@angular/router";
import {OnlineUserService} from "./online-user.service";
import {UserService} from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public accessToken: string = null;
  private readonly BaseUrl: string;
  private user: User;

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private tenantService: TenantService, private router: Router, private onlineUserService: OnlineUserService, private UserService: UserService)
  {
    this.BaseUrl = baseUrl;
  }

  public AuthenticateUser (auth: Authenticate): Observable<User>
  {
    return this.http.post<User>(this.BaseUrl + 'api/user/authenticate', auth).pipe(map(user =>
    {
      console.log(user);
      this.accessToken = user.token;
      this.user = user;
      this.user.token = null;

      if (this.user)
      {
        console.log('authed user');

        if (this.tenantService.Tenant == null)
        {
          this.router.navigate(['overview']);
        } else
        {

          this.onlineUserService.CreateConnection(this.user.id);

          this.router.navigate(['dashboard'])
        }
      } else
      {
        console.log('Error');
      }

      return user;
    }));
  }

  public Authenticated (): boolean
  {
    return this.accessToken != null;
  }

  public GetUser (): User
  {
    return this.user
  }

  CreateUser (user: User): Observable<any>
  {
    return this.http.post<any>(this.BaseUrl + 'api/user', user).pipe(map(user =>
    {
      return user;
    }));
  }
}
