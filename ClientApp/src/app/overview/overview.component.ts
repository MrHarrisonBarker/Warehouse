import {Component, OnInit} from '@angular/core';
import {UserService} from "../Services/user.service";
import {AuthService} from "../Services/auth.service";
import {TenantService} from "../Services/tenant.service";
import {MatDialog} from "@angular/material/dialog";
import {NewJobComponent} from "../project/job/new-job/new-job.component";
import {CreateTenantComponent} from "../tenant/create-tenant/create-tenant.component";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit
{

  constructor (public authService: AuthService,public dialog: MatDialog)
  {
  }

  ngOnInit ()
  {
  }

  CreateTenant ()
  {
    const dialogRef = this.dialog.open(CreateTenantComponent);
  }
}
