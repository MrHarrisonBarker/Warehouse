import {Component, OnInit} from '@angular/core';
import {TenantService} from "../../../Services/tenant.service";
import {JobPriority} from "../../../Models/JobPriority";

@Component({
  selector: 'app-priority-config',
  templateUrl: './priority-config.component.html',
  styleUrls: ['./priority-config.component.css']
})
export class PriorityConfigComponent implements OnInit {
  colour: any;

  constructor(public tenantService: TenantService) {
  }

  ngOnInit() {
  }

  DeletePriority(priority: JobPriority) {
    this.tenantService.DeletePriorityAsync(priority).subscribe();
  }

  NewPriority(order: string, name: string) {
    this.tenantService.NewPriorityAsync(parseInt(order), name, this.colour).subscribe();
  }

  Priorities() {
    return this.tenantService.Tenant.jobPriorities.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }

      return 0;
    });
  }

  DetectNameChange(priority: JobPriority, value: string) {
    if (priority.name != value) {
      priority.name = value;
      this.tenantService.UpdateJobPriorityAsync(priority).subscribe();
    }
  }

  DetectOrderChange(priority: JobPriority, value: string) {
    if (priority.order != parseInt(value)) {
      priority.order = parseInt(value);
      this.tenantService.UpdateJobPriorityAsync(priority).subscribe();
    }
  }

  DetectColourChange(priority: JobPriority) {
    this.tenantService.UpdateJobPriorityAsync(priority).subscribe();
  }
}
