import {Component, OnInit} from '@angular/core';
import {CreateTenant, Tenant} from "../../Models/Tenant";
import {TenantService} from "../../Services/tenant.service";
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.css']
})
export class CreateTenantComponent implements OnInit
{

  constructor (private authService: AuthService, private tenantService: TenantService)
  {
  }

  ngOnInit ()
  {
  }

  CreateTenant (name: string, description: string, avatar: string, accent: string)
  {
    let newTenant: CreateTenant = {
      tenant: {
        name: name,
        description: description,
        accent: accent,
        avatar: avatar
      },
      userId: this.authService.GetUser().id
    };

    this.tenantService.CreateTenant(newTenant).subscribe(tenant =>
    {
      if (tenant)
      {
        console.log("Moving to tenant");
        window.location.href = `http://${tenant.name}.localhost:5000`;
      }
    });
  }
}
