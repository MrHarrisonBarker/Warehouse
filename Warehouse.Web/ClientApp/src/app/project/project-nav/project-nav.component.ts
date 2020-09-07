import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../Services/project.service";
import {Project, ProjectViewModel} from "../../Models/Project";

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.css']
})
export class ProjectNavComponent implements OnInit
{
    extended: boolean = false;

  constructor (public authService: AuthService, public router: Router,private projectService: ProjectService)
  {
  }

  ngOnInit ()
  {
  }

  GetProject() : ProjectViewModel
  {
    return this.projectService.GetCurrentProject();
  }

  NavigateToLists ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProjectId}/lists`);
  }


  NavigateToProject ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProjectId}`);
  }

  NavigateToConfig ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProjectId}/config`);
  }

  NavigateToColleagues ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProjectId}/colleagues`);
  }

  NavigateToWork ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProjectId}/work`);
  }

  NavigateToChat ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProjectId}/chat`);
  }

  NavigateToJobs ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProjectId}/jobs`);
  }

  toggleExtended ()
  {
    this.extended = !this.extended;
  }

  NavigateToModules()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProjectId}/modules`);
  }
}
