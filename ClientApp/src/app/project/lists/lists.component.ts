import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../Services/project.service";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../Models/Project";
import {List} from "../../Models/List";
import {ListService} from "../../Services/list.service";
import {MatDialog} from "@angular/material/dialog";
import {newJob, NewJobComponent} from "../job/new-job/new-job.component";
import {TenantService} from "../../Services/tenant.service";
import {Job, JobPriority, JobStatus, JobType} from "../../Models/Job";
import {User} from "../../Models/User";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit
{
  private projectId: string;
  public currentList: List;
  selectedJob: Job = null;

  constructor (public projectService: ProjectService, private route: ActivatedRoute, private listService: ListService, public dialog: MatDialog, public tenantService: TenantService)
  {
  }

  ngOnInit ()
  {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.GetList(this.GetProjectListsFromStore()[0].id);
  }

  GetProjectListsFromStore (): List[]
  {
    return this.projectService.GetProjectById(this.projectId).lists;
  }

  GetList (id: string)
  {
    this.listService.GetList(id).subscribe(list =>
    {
      console.log(list);
      this.currentList = list;
    });
  }

  newJob ()
  {
    let data: newJob = {
      list: this.currentList,
      project: this.projectService.GetProjectById(this.projectId)
    };

    const dialogRef = this.dialog.open(NewJobComponent, {
      data: data
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
}
