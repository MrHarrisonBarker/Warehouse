import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../Services/project.service";

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

  NavigateToLists ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProject.id}/lists`);
  }


  NavigateToProject ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProject.id}`);
  }

  NavigateToConfig ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProject.id}/config`);
  }

  NavigateToColleagues ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProject.id}/colleagues`);
  }

  NavigateToWork ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProject.id}/work`);
  }

  NavigateToChat ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProject.id}/chat`);
  }

  NavigateToJobs ()
  {
    this.router.navigateByUrl(`/project/${this.projectService.currentProject.id}/jobs`);
  }

  toggleExtended ()
  {
    this.extended = !this.extended;
  }
}
