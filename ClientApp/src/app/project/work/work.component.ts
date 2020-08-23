import {Component, OnInit} from '@angular/core';
import {List} from "../../Models/List";
import {ProjectService} from "../../Services/project.service";
import {ListService} from "../../Services/list.service";
import {TenantService} from "../../Services/tenant.service";
import {Job} from "../../Models/Job";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit
{

  public currentList: List;
  selectedJob: Job;

  constructor (private listService: ListService, public tenantService: TenantService)
  {
  }

  ngOnInit ()
  {
    this.listService.GetLists().subscribe(lists =>
    {
      console.log(lists);
      this.currentList = lists[0];
    });
  }

  GetUsersListsFromStore (): List[]
  {
    return this.listService.GetListsFromStore();
  }

  GetList (id: string)
  {
    this.listService.GetList(id).subscribe(list =>
    {
      console.log(list);
      this.currentList = list;
    });
  }

  SelectJob (job: Job)
  {
    if (this.selectedJob != null && job.id == this.selectedJob.id)
    {
      this.selectedJob = null;
    } else
    {
      this.selectedJob = job;
    }
  }

  GetJobs (): Job[]
  {
    return this.currentList.jobs.filter(job => job.deadline.toString() == '0001-01-01T00:00:00');
  }

  GetDeadlineJobs (): Job[]
  {
    return this.currentList.jobs.filter(job => job.deadline.toString() != '0001-01-01T00:00:00');
  }
}
