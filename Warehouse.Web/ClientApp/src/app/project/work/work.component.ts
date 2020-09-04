import {Component, OnInit} from '@angular/core';
import {List, ListViewModel} from "../../Models/List";
import {ProjectService} from "../../Services/project.service";
import {ListService} from "../../Services/list.service";
import {TenantService} from "../../Services/tenant.service";
import {Job} from "../../Models/Job";
import {JobService} from "../../Services/job.service";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit
{

  public currentListId: string;
  selectedJob: Job;

  constructor (
    private listService: ListService,
    public tenantService: TenantService,
    private jobService: JobService,
    private projectService: ProjectService)
  {
  }

  ngOnInit ()
  {
    this.listService.GetListsAsync(this.projectService.currentProjectId).subscribe(lists =>
    {
      console.log(lists);
      this.currentListId = lists[0].id;
    });
  }

  GetUsersListsFromStore (): ListViewModel[]
  {
    return this.listService.GetLists();
  }

  GetList (id: string)
  {
    this.currentListId = id;
    // this.listService.GetList(id)
    //   .subscribe(list =>
    // {
    //   console.log(list);
    //   this.currentList = list;
    // });
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
    return this.jobService.GetJobs().filter(job => this.listService.GetList(this.currentListId).jobs.includes(job.id) && job.deadline.toString() == '0001-01-01T00:00:00');
  }

  GetDeadlineJobs (): Job[]
  {
    return this.jobService.GetJobs().filter(job => this.listService.GetList(this.currentListId).jobs.includes(job.id) && job.deadline.toString() != '0001-01-01T00:00:00');
  }
}
