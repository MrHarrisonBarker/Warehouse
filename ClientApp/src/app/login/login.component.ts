import {Component, OnInit} from '@angular/core';
import {TenantService} from "../Services/tenant.service";
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../Services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SignupComponent} from "../signup/signup.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('');

  constructor (public tenantService: TenantService, private authService: AuthService, private router: Router, public dialog: MatDialog)
  {
  }

  ngOnInit ()
  {
    console.log(this.tenantService.getHostname());
    this.tenantService.GetTenant().subscribe(tenant =>
    {
      console.log(tenant);
    });
  }

  login (email: string, password: string)
  {
    if (email != '' && password != '')
    {
      console.log('logging user in', email);
      this.authService.AuthenticateUser({email: email, password: password}).subscribe(() =>
      {

      });
    } else
    {
      console.log('no email and password');
    }
  }

  create ()
  {
    const dialogRef = this.dialog.open(SignupComponent);
  }
}
