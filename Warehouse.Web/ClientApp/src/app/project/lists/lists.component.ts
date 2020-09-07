import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../Services/project.service";
import {ActivatedRoute} from "@angular/router";
import {List, ListViewModel} from "../../Models/List";
import {ListService} from "../../Services/list.service";
import {MatDialog} from "@angular/material/dialog";
import {newJob, NewJobComponent} from "../job/new-job/new-job.component";
import {TenantService} from "../../Services/tenant.service";
import {Job, JobByStatus} from "../../Models/Job";
import {ProjectViewModel} from "../../Models/Project";
import {JobService} from "../../Services/job.service";
import {NewListComponent} from "./new-list/new-list.component";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit
{
  private projectId: string;
  public currentListId: string;
  public selectedJob: Job = null;
  public Loading: boolean = true;
  public searchResults: Job[];
  private JobBank: Job[];

  constructor (
    public projectService: ProjectService,
    private route: ActivatedRoute,
    private listService: ListService,
    public dialog: MatDialog,
    public tenantService: TenantService,
    private jobService: JobService)
  {
  }

  ngOnInit ()
  {
    this.projectId = this.route.snapshot.paramMap.get('id');
    // this.GetListAsync(this.GetProjectListsFromStore()[0].id);
    this.listService.GetListAsync(this.GetProjectListsFromStore()[0].id).subscribe(list =>
    {
      console.log(list);
      this.currentListId = list.id;
      this.Loading = false;
    });
  }

  GetProjectFromStore (): ProjectViewModel
  {
    return this.projectService.GetProject(this.projectId);
  }

  GetProjectListsFromStore (): ListViewModel[]
  {
    return this.listService.GetLists().filter(list => this.GetProjectFromStore().lists.includes(list.id));
  }

  GetListFromStore() : ListViewModel
  {
    return this.listService.GetList(this.currentListId);
  }

  GetJobsForList(): JobByStatus[] {
    this.JobBank = this.jobService.GetJobs().filter(job => this.GetListFromStore().jobs.includes(job.id));
    let jobByStatus: JobByStatus[] = [];

    this.JobBank.forEach(job => {
      let index = jobByStatus.findIndex(x => x.statusId == job.jobStatus.id);

      if (index == -1) {
        jobByStatus.push({
          statusId: job.jobStatus.id,
          jobs: [job]
        });
      } else {
        jobByStatus[index].jobs.push(job);
      }

    });

    jobByStatus = jobByStatus.sort((a,b) => {
      let aOrder = this.tenantService.GetStatus(a.statusId).order;
      let bOrder = this.tenantService.GetStatus(b.statusId).order;
      if(aOrder > bOrder) {
        return 1;
      }
      if (aOrder < bOrder) {
        return -1;
      }

      return 0;
    });

    return jobByStatus;
  }

  GetListAsync (id: string)
  {
    this.selectedJob = null;
    this.listService.GetListAsync(id).subscribe(list =>
    {
      console.log(list);
      this.currentListId = list.id;
    });
  }

  newJob ()
  {
    let data: newJob = {
      listId: this.currentListId,
      projectId: this.projectId
    };

    const dialogRef = this.dialog.open(NewJobComponent, {
      data: data
    });
  }

  SelectJob (job: Job)
  {
    console.log("Selecting job");
    if (this.selectedJob != null && job.id == this.selectedJob.id)
    {
      this.selectedJob = null;
    } else
    {
      this.selectedJob = job;
    }
  }

  NewList()
  {
    this.dialog.open(NewListComponent);
  }

  Search(JobSearch: string)
  {
    if (JobSearch != "") {
      this.searchResults = this.JobBank.filter(job => job.title.toLowerCase().includes(JobSearch.toLocaleLowerCase()) || job.link.toLowerCase().includes(JobSearch.toLocaleLowerCase()));
    } else {
      this.searchResults = null
    }
  }
}
