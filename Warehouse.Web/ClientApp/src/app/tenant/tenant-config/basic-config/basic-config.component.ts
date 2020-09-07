import {Component, OnInit} from '@angular/core';
import {TenantService} from "../../../Services/tenant.service";

@Component({
  selector: 'app-basic-config',
  templateUrl: './basic-config.component.html',
  styleUrls: ['./basic-config.component.css']
})
export class BasicConfigComponent implements OnInit {

  colour: string;

  constructor(public tenantService: TenantService) {
  }

  ngOnInit() {
    this.colour = this.tenantService.Tenant.accent;
  }

  DetectColourChange() {
    if (this.tenantService.Tenant.accent != this.colour) {
      let tenant = this.tenantService.Tenant;
      tenant.accent = this.colour;
      this.tenantService.UpdateTenantAsync(tenant).subscribe();
    }
  }

  DetectNameChange(tenantName: string) {
    if (tenantName != this.tenantService.Tenant.name) {
      let tenant = this.tenantService.Tenant
      tenant.name = tenantName;
      this.tenantService.UpdateTenantAsync(tenant).subscribe();
    }
  }

  DetectDescriptionChange(tenantDescription: string) {
    if (tenantDescription != this.tenantService.Tenant.description) {
      let tenant = this.tenantService.Tenant
      tenant.description = tenantDescription;
      this.tenantService.UpdateTenantAsync(tenant).subscribe();
    }
  }
}
