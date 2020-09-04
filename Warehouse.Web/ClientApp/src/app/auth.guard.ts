import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "./Services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthService,private router: Router)
  {
  }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
  {
    if (this.authService.Authenticated()) {
      return of(true);
    } else {
      this.router.navigate([""]);
      return of(false);
    }
  }
}
