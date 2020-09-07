import {Component, OnInit} from '@angular/core';
import {TenantService} from "../../../Services/tenant.service";
import {JobType} from "../../../Models/JobType";

@Component({
  selector: 'app-type-config',
  templateUrl: './type-config.component.html',
  styleUrls: ['./type-config.component.css']
})
export class TypeConfigComponent implements OnInit {
  colour: any;

  constructor(public tenantService: TenantService) {
  }

  ngOnInit() {
  }


  DeleteType(type: JobType) {
    this.tenantService.DeleteTypeAsync(type).subscribe();
  }

  NewType(order: string, name: string) {
    this.tenantService.NewTypeAsync(parseInt(order), name, this.colour).subscribe();
  }

  Types() {
    return this.tenantService.Tenant.jobTypes.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }

      return 0;
    });
  }

  DetectNameChange(type: JobType, value: string) {
    if (type.name != value) {
      type.name = value;
      this.tenantService.UpdateJobTypeAsync(type).subscribe();
    }
  }

  DetectOrderChange(type: JobType, value: string) {
    if (type.order != parseInt(value)) {
      type.order = parseInt(value);
      this.tenantService.UpdateJobTypeAsync(type).subscribe();
    }
  }

  DetectColourChange(type: JobType) {
      this.tenantService.UpdateJobTypeAsync(type).subscribe();
  }
}
