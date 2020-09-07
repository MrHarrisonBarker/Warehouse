import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../../Services/project.service";

@Component({
  selector: 'app-basic-project-config',
  templateUrl: './basic-project-config.component.html',
  styleUrls: ['./basic-project-config.component.css']
})
export class BasicProjectConfigComponent implements OnInit {
  colour: any;

  constructor(public projectService: ProjectService) { }

  ngOnInit() {
    this.colour = this.projectService.GetCurrentProject().accent
  }

  DetectColourChange() {

    let project = this.projectService.GetCurrentProject();

    if (this.colour != project.accent) {
      project.accent = this.colour;
      this.projectService.UpdateProjectAsync(project).subscribe();
    }
  }

  DetectNameChange(name: string)
  {
    let project = this.projectService.GetCurrentProject();

    if (project.name != name) {
      project.name = name;

      this.projectService.UpdateProjectAsync(project).subscribe();
    }
  }

  DetectRepoChange(repo: string)
  {
    let project = this.projectService.GetCurrentProject();

    if (project.repo != repo) {
      project.repo = repo;

      this.projectService.UpdateProjectAsync(project).subscribe();
    }
  }

  DetectDescriptionChange(description: string)
  {
    let project = this.projectService.GetCurrentProject();

    if (project.description != description) {
      project.description = description;

      this.projectService.UpdateProjectAsync(project).subscribe();
    }
  }
}
