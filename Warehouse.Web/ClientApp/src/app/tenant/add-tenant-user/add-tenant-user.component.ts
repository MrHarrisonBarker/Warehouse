import {Component, OnInit} from '@angular/core';
import {TenantService} from "../../Services/tenant.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-tenant-user',
  templateUrl: './add-tenant-user.component.html',
  styleUrls: ['./add-tenant-user.component.css']
})
export class AddTenantUserComponent implements OnInit
{

  constructor (public tenantService: TenantService,private _snackBar: MatSnackBar)
  {
  }

  ngOnInit ()
  {
  }

  AddUser (email: string)
  {
    this.tenantService.AddUserAsync(email).subscribe(result =>
    {
      console.log(result);
    });
  }
}
